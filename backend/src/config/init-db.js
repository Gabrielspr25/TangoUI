import { query } from '../config/database.js';

// Script para crear todas las tablas del Sistema Claro
export const createTables = async () => {
  try {
    console.log('🏗️  Creando tablas del Sistema Claro...');

    // Tabla de Vendedores
    await query(`
      CREATE TABLE IF NOT EXISTS vendedores (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        apellido VARCHAR(100) NOT NULL,
        email VARCHAR(150) UNIQUE NOT NULL,
        telefono VARCHAR(20),
        equipo_id INTEGER,
        fecha_ingreso DATE DEFAULT CURRENT_DATE,
        activo BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla de Equipos
    await query(`
      CREATE TABLE IF NOT EXISTS equipos (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        descripcion TEXT,
        lider_id INTEGER,
        meta_mensual DECIMAL(12,2) DEFAULT 0,
        activo BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabla de Ventas
    await query(`
      CREATE TABLE IF NOT EXISTS ventas (
        id SERIAL PRIMARY KEY,
        vendedor_id INTEGER NOT NULL,
        cliente_nombre VARCHAR(150) NOT NULL,
        producto_servicio VARCHAR(200) NOT NULL,
        monto DECIMAL(12,2) NOT NULL,
        fecha_venta DATE DEFAULT CURRENT_DATE,
        estado VARCHAR(50) DEFAULT 'completada',
        observaciones TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (vendedor_id) REFERENCES vendedores(id)
      )
    `);

    // Tabla de Metas
    await query(`
      CREATE TABLE IF NOT EXISTS metas (
        id SERIAL PRIMARY KEY,
        vendedor_id INTEGER,
        equipo_id INTEGER,
        tipo VARCHAR(50) NOT NULL, -- 'individual' o 'equipo'
        meta_monto DECIMAL(12,2) NOT NULL,
        periodo VARCHAR(20) NOT NULL, -- 'mensual', 'trimestral', 'anual'
        año INTEGER NOT NULL,
        mes INTEGER, -- opcional, para metas mensuales
        activa BOOLEAN DEFAULT true,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (vendedor_id) REFERENCES vendedores(id),
        FOREIGN KEY (equipo_id) REFERENCES equipos(id)
      )
    `);

    // Tabla de Contratos
    await query(`
      CREATE TABLE IF NOT EXISTS contratos (
        id SERIAL PRIMARY KEY,
        vendedor_id INTEGER NOT NULL,
        cliente_nombre VARCHAR(150) NOT NULL,
        tipo_contrato VARCHAR(100) NOT NULL,
        valor_total DECIMAL(12,2) NOT NULL,
        fecha_inicio DATE NOT NULL,
        fecha_fin DATE,
        estado VARCHAR(50) DEFAULT 'activo',
        documento_url VARCHAR(500),
        observaciones TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (vendedor_id) REFERENCES vendedores(id)
      )
    `);

    // Tabla de Actividades de Agentes (para tracking)
    await query(`
      CREATE TABLE IF NOT EXISTS actividad_agentes (
        id SERIAL PRIMARY KEY,
        agente_nombre VARCHAR(100) NOT NULL,
        accion VARCHAR(200) NOT NULL,
        detalles JSONB,
        resultado VARCHAR(50),
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Agregar foreign keys que faltaban (solo si no existen)
    try {
      await query(`
        ALTER TABLE vendedores 
        ADD CONSTRAINT fk_vendedor_equipo 
        FOREIGN KEY (equipo_id) REFERENCES equipos(id)
        ON DELETE SET NULL
      `);
    } catch (error) {
      if (error.code !== '42710') { // No es "constraint already exists"
        console.error('Error agregando constraint fk_vendedor_equipo:', error.message);
      }
    }

    try {
      await query(`
        ALTER TABLE equipos 
        ADD CONSTRAINT fk_equipo_lider 
        FOREIGN KEY (lider_id) REFERENCES vendedores(id)
        ON DELETE SET NULL
      `);
    } catch (error) {
      if (error.code !== '42710') { // No es "constraint already exists"
        console.error('Error agregando constraint fk_equipo_lider:', error.message);
      }
    }

    // Crear índices para optimización
    await query('CREATE INDEX IF NOT EXISTS idx_vendedores_activo ON vendedores(activo)');
    await query('CREATE INDEX IF NOT EXISTS idx_ventas_vendedor ON ventas(vendedor_id)');
    await query('CREATE INDEX IF NOT EXISTS idx_ventas_fecha ON ventas(fecha_venta)');
    await query('CREATE INDEX IF NOT EXISTS idx_metas_activa ON metas(activa)');
    await query('CREATE INDEX IF NOT EXISTS idx_contratos_estado ON contratos(estado)');

    console.log('✅ Todas las tablas creadas exitosamente');
    return true;

  } catch (error) {
    console.error('❌ Error creando tablas:', error);
    throw error;
  }
};

// Datos de ejemplo para testing
export const insertSampleData = async () => {
  try {
    console.log('📊 Insertando datos de ejemplo...');

    // Insertar equipos de ejemplo
    await query(`
      INSERT INTO equipos (nombre, descripcion, meta_mensual) VALUES
      ('Equipo Alpha', 'Equipo de ventas senior', 50000.00),
      ('Equipo Beta', 'Equipo de ventas junior', 30000.00)
      ON CONFLICT DO NOTHING
    `);

    // Insertar vendedores de ejemplo
    await query(`
      INSERT INTO vendedores (nombre, apellido, email, telefono, equipo_id) VALUES
      ('Carlos', 'Rodriguez', 'carlos@empresa.com', '+1234567890', 1),
      ('Ana', 'Martinez', 'ana@empresa.com', '+1234567891', 1),
      ('Luis', 'Garcia', 'luis@empresa.com', '+1234567892', 2)
      ON CONFLICT (email) DO NOTHING
    `);

    // Insertar ventas de ejemplo
    await query(`
      INSERT INTO ventas (vendedor_id, cliente_nombre, producto_servicio, monto) VALUES
      (1, 'Empresa XYZ', 'Consultoría IT', 15000.00),
      (2, 'Comercial ABC', 'Software CRM', 8500.00),
      (3, 'Retail 123', 'Sistema POS', 12000.00)
      ON CONFLICT DO NOTHING
    `);

    // Insertar metas de ejemplo
    await query(`
      INSERT INTO metas (vendedor_id, tipo, meta_monto, periodo, año, mes) VALUES
      (1, 'individual', 20000.00, 'mensual', 2025, 11),
      (2, 'individual', 15000.00, 'mensual', 2025, 11),
      (3, 'individual', 18000.00, 'mensual', 2025, 11)
      ON CONFLICT DO NOTHING
    `);

    console.log('✅ Datos de ejemplo insertados');

  } catch (error) {
    console.error('❌ Error insertando datos:', error);
    // No lanzamos el error para que no falle la inicialización
  }
};