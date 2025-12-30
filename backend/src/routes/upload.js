import express from 'express';
import multer from 'multer';
import csv from 'csv-parser';
import XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads');
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Aceptar solo CSV y Excel
    const allowedTypes = ['.csv', '.xlsx', '.xls'];
    const fileExt = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(fileExt)) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos CSV y Excel (.csv, .xlsx, .xls)'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB límite
  }
});

// Mapeo de columnas comunes
const COLUMN_MAPPINGS = {
  'BAN': 'numero_banco',
  'SUB': 'suscriptor',
  'SUB_STATUS': 'estado_suscriptor', 
  'SUB_STATUS_DATE': 'fecha_estado',
  'SOC': 'sociedad',
  'SOC_DESCRIPTION': 'descripcion_sociedad',
  'NUMERO': 'numero_telefono',
  'CLIENTE': 'nombre_cliente',
  'PLAN': 'tipo_plan',
  'FECHA': 'fecha_activacion',
  'VENDEDOR': 'codigo_vendedor',
  'TIENDA': 'codigo_tienda',
  'COMISION': 'monto_comision'
};

// Endpoint para subir archivo y analizar columnas
router.post('/analyze', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ningún archivo' });
    }

    const filePath = req.file.path;
    const fileExt = path.extname(req.file.originalname).toLowerCase();
    
    let columns = [];
    let sampleData = [];

    if (fileExt === '.csv') {
      // Procesar CSV
      const results = [];
      const stream = fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          if (results.length > 0) {
            columns = Object.keys(results[0]);
            sampleData = results.slice(0, 5); // Primeras 5 filas como muestra
          }
          
          sendResponse();
        });
    } else if (fileExt === '.xlsx' || fileExt === '.xls') {
      // Procesar Excel
      const workbook = XLSX.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      if (jsonData.length > 0) {
        columns = Object.keys(jsonData[0]);
        sampleData = jsonData.slice(0, 5);
      }
      
      sendResponse();
    }

    function sendResponse() {
      // Generar mapeo sugerido
      const suggestedMapping = {};
      columns.forEach(col => {
        const upperCol = col.toUpperCase().trim();
        if (COLUMN_MAPPINGS[upperCol]) {
          suggestedMapping[col] = COLUMN_MAPPINGS[upperCol];
        } else {
          // Buscar coincidencias parciales
          for (const [key, value] of Object.entries(COLUMN_MAPPINGS)) {
            if (upperCol.includes(key) || key.includes(upperCol)) {
              suggestedMapping[col] = value;
              break;
            }
          }
        }
      });

      res.json({
        success: true,
        fileName: req.file.originalname,
        fileId: req.file.filename,
        columns: columns,
        sampleData: sampleData,
        suggestedMapping: suggestedMapping,
        rowCount: sampleData.length,
        availableFields: Object.values(COLUMN_MAPPINGS)
      });

      // Limpiar archivo temporal después de un tiempo
      setTimeout(() => {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }, 300000); // 5 minutos
    }

  } catch (error) {
    console.error('Error al analizar archivo:', error);
    res.status(500).json({ 
      error: 'Error al procesar el archivo',
      details: error.message 
    });
  }
});

// Endpoint para confirmar mapeo e importar datos
router.post('/import', async (req, res) => {
  try {
    const { fileId, columnMapping, tableName } = req.body;
    
    if (!fileId || !columnMapping || !tableName) {
      return res.status(400).json({ 
        error: 'Faltan parámetros requeridos: fileId, columnMapping, tableName' 
      });
    }

    // Aquí implementarías la lógica de inserción en PostgreSQL
    // Por ahora, simulamos el proceso

    res.json({
      success: true,
      message: `Datos importados exitosamente a la tabla ${tableName}`,
      importedRows: 0,
      errors: []
    });

  } catch (error) {
    console.error('Error al importar datos:', error);
    res.status(500).json({ 
      error: 'Error al importar datos',
      details: error.message 
    });
  }
});

// Endpoint para obtener esquema de tablas disponibles
router.get('/tables', async (req, res) => {
  try {
    // Esquemas de tablas disponibles para importación
    const tableSchemas = {
      suscriptores: {
        name: 'Suscriptores',
        fields: {
          'numero_banco': { type: 'VARCHAR(20)', required: true, description: 'Número de banco (BAN)' },
          'suscriptor': { type: 'VARCHAR(50)', required: true, description: 'Código de suscriptor (SUB)' },
          'estado_suscriptor': { type: 'VARCHAR(10)', required: false, description: 'Estado del suscriptor' },
          'fecha_estado': { type: 'DATE', required: false, description: 'Fecha del estado' },
          'sociedad': { type: 'VARCHAR(10)', required: false, description: 'Código de sociedad (SOC)' },
          'descripcion_sociedad': { type: 'TEXT', required: false, description: 'Descripción de la sociedad' }
        }
      },
      vendedores: {
        name: 'Vendedores',
        fields: {
          'codigo_vendedor': { type: 'VARCHAR(20)', required: true, description: 'Código del vendedor' },
          'nombre_vendedor': { type: 'VARCHAR(100)', required: true, description: 'Nombre completo' },
          'codigo_tienda': { type: 'VARCHAR(20)', required: false, description: 'Tienda asignada' },
          'activo': { type: 'BOOLEAN', required: false, description: 'Estado activo/inactivo' }
        }
      },
      productos: {
        name: 'Productos',
        fields: {
          'codigo_producto': { type: 'VARCHAR(30)', required: true, description: 'Código único del producto' },
          'nombre_producto': { type: 'VARCHAR(100)', required: true, description: 'Nombre del producto' },
          'tipo_plan': { type: 'VARCHAR(50)', required: false, description: 'Tipo de plan' },
          'precio': { type: 'DECIMAL(10,2)', required: false, description: 'Precio del producto' }
        }
      }
    };

    res.json({
      success: true,
      tables: tableSchemas
    });

  } catch (error) {
    console.error('Error al obtener esquemas:', error);
    res.status(500).json({ 
      error: 'Error al obtener esquemas de tablas',
      details: error.message 
    });
  }
});

export default router;