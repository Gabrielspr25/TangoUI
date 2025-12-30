import xlsx from 'xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de la base de datos
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'UI',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Función para importar equipos desde Excel
async function importarEquiposDesdeExcel() {
  const client = await pool.connect();
  
  try {
    console.log('🚀 Iniciando importación de equipos desde Excel...');
    
    // Ejecutar migración primero
    const migracionSQL = `
      -- Crear tabla dispositivos para equipos móviles (diferente de equipos de trabajo)
      CREATE TABLE IF NOT EXISTS dispositivos (
          id SERIAL PRIMARY KEY,
          marca VARCHAR(100) NOT NULL,
          modelo VARCHAR(200) NOT NULL,
          tipo VARCHAR(100) NOT NULL DEFAULT 'Smartphone',
          imei VARCHAR(15) UNIQUE NOT NULL,
          costo DECIMAL(10,2),
          externo BOOLEAN DEFAULT FALSE,
          vendedor_id INTEGER,
          estado VARCHAR(50) DEFAULT 'activo',
          numero_serie VARCHAR(100),
          fecha_adquisicion DATE,
          fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          observaciones TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Crear índices para mejorar el rendimiento
      CREATE INDEX IF NOT EXISTS idx_dispositivos_imei ON dispositivos(imei);
      CREATE INDEX IF NOT EXISTS idx_dispositivos_vendedor ON dispositivos(vendedor_id);
      CREATE INDEX IF NOT EXISTS idx_dispositivos_estado ON dispositivos(estado);
      CREATE INDEX IF NOT EXISTS idx_dispositivos_marca ON dispositivos(marca);
    `;
    
    await client.query(migracionSQL);
    console.log('✅ Tabla dispositivos creada/verificada');

    // Ruta del archivo Excel
    const archivoExcel = path.resolve(__dirname, '../../BD/Equipos.xls');
    console.log(`📁 Leyendo archivo: ${archivoExcel}`);

    // Leer el archivo Excel
    const workbook = xlsx.readFile(archivoExcel);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convertir a JSON
    const data = xlsx.utils.sheet_to_json(worksheet);
    console.log(`📊 Encontradas ${data.length} filas en el Excel`);

    if (data.length === 0) {
      console.log('⚠️ No hay datos para importar');
      return;
    }

    // Mostrar las columnas encontradas
    console.log('📋 Columnas encontradas:', Object.keys(data[0]));

    // Mapear y validar datos
    const equiposValidos = [];
    
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      
      try {
        // El Excel actual tiene: Nombre, Codigo, Costo, Externo
        // Vamos a adaptarlo para crear dispositivos válidos
        
        const nombre = row['Nombre'] || '';
        const codigo = row['Codigo'] || '';
        const costo = parseFloat(row['Costo'] || 0) || null;
        const externo = Boolean(row['Externo'] || false);
        
        // Extraer marca y modelo del nombre (si es posible)
        let marca = 'Genérico';
        let modelo = nombre || `Equipo ${i + 1}`;
        
        // Intentar extraer marca conocida del nombre
        const marcasConocidas = ['iPhone', 'Samsung', 'Xiaomi', 'Huawei', 'Google', 'OnePlus', 'Motorola', 'LG', 'Sony', 'Nokia'];
        for (const marcaNombre of marcasConocidas) {
          if (nombre.toLowerCase().includes(marcaNombre.toLowerCase())) {
            marca = marcaNombre;
            modelo = nombre;
            break;
          }
        }
        
        // Si el nombre contiene "Galaxy", es Samsung
        if (nombre.toLowerCase().includes('galaxy')) {
          marca = 'Samsung';
        }
        
        // Si tiene "iPhone" o contiene números como "13", "14", "15"
        if (nombre.toLowerCase().includes('iphone') || /iphone\s*\d+/.test(nombre.toLowerCase())) {
          marca = 'Apple';
        }

        // Generar IMEI único basado en el código o índice
        // Usaremos el código si existe, si no el índice
        const baseImei = codigo ? codigo.toString().padStart(15, '0').substring(0, 15) : 
                        (100000000000000 + i).toString();
        
        const equipo = {
          marca: marca,
          modelo: modelo,
          tipo: nombre.toLowerCase().includes('tablet') ? 'Tablet' : 
                nombre.toLowerCase().includes('laptop') ? 'Laptop' :
                nombre.toLowerCase().includes('router') ? 'Router' : 'Smartphone',
          imei: baseImei,
          costo: costo,
          externo: externo,
          vendedor_id: null, // Sin asignar inicialmente
          estado: 'activo',
          numero_serie: codigo || null,
          fecha_adquisicion: null,
          observaciones: `Importado desde Excel - Código original: ${codigo}`
        };

        // Validaciones básicas
        if (!equipo.imei || equipo.imei.length !== 15) {
          console.log(`⚠️ Fila ${i + 1}: IMEI generado inválido (${equipo.imei})`);
          continue;
        }

        if (!equipo.marca || !equipo.modelo) {
          console.log(`⚠️ Fila ${i + 1}: Marca o modelo faltante`);
          continue;
        }

        equiposValidos.push(equipo);
        
      } catch (error) {
        console.log(`❌ Error procesando fila ${i + 1}:`, error.message);
      }
    }

    console.log(`✅ Equipos válidos para importar: ${equiposValidos.length}`);

    // Importar a la base de datos
    let insertados = 0;
    let errores = 0;

    for (const equipo of equiposValidos) {
      try {
        const query = `
          INSERT INTO dispositivos (marca, modelo, tipo, imei, costo, externo, vendedor_id, estado, numero_serie, fecha_adquisicion, observaciones)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT (imei) DO UPDATE SET
            marca = EXCLUDED.marca,
            modelo = EXCLUDED.modelo,
            tipo = EXCLUDED.tipo,
            costo = EXCLUDED.costo,
            externo = EXCLUDED.externo,
            vendedor_id = EXCLUDED.vendedor_id,
            estado = EXCLUDED.estado,
            numero_serie = EXCLUDED.numero_serie,
            fecha_adquisicion = EXCLUDED.fecha_adquisicion,
            observaciones = EXCLUDED.observaciones,
            updated_at = CURRENT_TIMESTAMP
        `;
        
        const values = [
          equipo.marca,
          equipo.modelo, 
          equipo.tipo,
          equipo.imei,
          equipo.costo,
          equipo.externo,
          equipo.vendedor_id,
          equipo.estado,
          equipo.numero_serie,
          equipo.fecha_adquisicion,
          equipo.observaciones
        ];

        await client.query(query, values);
        insertados++;
        
      } catch (error) {
        errores++;
        console.log(`❌ Error insertando equipo ${equipo.imei}:`, error.message);
      }
    }

    console.log('🎉 Importación completada:');
    console.log(`   ✅ Equipos insertados/actualizados: ${insertados}`);
    console.log(`   ❌ Errores: ${errores}`);

    // Mostrar resumen de la tabla
    const resultado = await client.query('SELECT COUNT(*) as total, marca, estado FROM dispositivos GROUP BY marca, estado ORDER BY marca');
    console.log('\n📊 Resumen de dispositivos en la base de datos:');
    resultado.rows.forEach(row => {
      console.log(`   ${row.marca} (${row.estado}): ${row.total} dispositivos`);
    });

  } catch (error) {
    console.error('❌ Error durante la importación:', error);
  } finally {
    client.release();
    process.exit();
  }
}

// Ejecutar la importación
importarEquiposDesdeExcel();