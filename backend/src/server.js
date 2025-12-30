import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Importar configuración de base de datos
import { testConnection } from './config/database.js';
// import { createTables, insertSampleData } from './config/init-db.js'; // Deprecado por AgenteBaseDatos
import { insertSampleData } from './config/init-db.js';
import { agenteBaseDatos } from './agentes/AgenteBaseDatos.js';

// Importar rutas
import vendedoresRoutes from './routes/vendedores.js';
import ventasRoutes from './routes/ventas.js';
import metasRoutes from './routes/metas.js';
import equiposRoutes from './routes/equipos.js';
import gestionEquiposRoutes from './routes/gestion-equipos.js';
import agentesRoutes from './routes/agentes.js';
import uploadRoutes from './routes/upload.js';

// Configurar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares de seguridad
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // límite de 100 requests por IP por ventana
  message: {
    error: 'Demasiadas solicitudes, intenta más tarde'
  }
});
app.use(limiter);

// Middleware para parsing JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Rutas principales
app.use('/api/vendedores', vendedoresRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/metas', metasRoutes);
app.use('/api/equipos', equiposRoutes);
app.use('/api/gestion/equipos', gestionEquiposRoutes);
app.use('/api/agentes', agentesRoutes);
app.use('/api/upload', uploadRoutes);

// Ruta de health check
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'Tango UI Backend',
    version: '1.0.0'
  });
});

// Ruta raíz
app.get('/', (req, res) => {
  res.json({
    message: 'Sistema Claro API - Backend funcionando correctamente',
    version: '1.0.0',
    endpoints: [
      '/api/vendedores',
      '/api/ventas',
      '/api/metas',
      '/api/equipos',
      '/api/gestion/equipos',
      '/api/agentes',
      '/api/upload',
      '/health'
    ]
  });
});

// Manejo de rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl,
    method: req.method
  });
});

// Manejo global de errores
app.use((error, req, res, next) => {
  console.error('Error global:', error);
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Algo salió mal'
  });
});

// Inicializar servidor
const initializeServer = async () => {
  try {
    // Probar conexión a base de datos
    const dbConnected = await testConnection();
    if (!dbConnected) {
      console.error('❌ No se pudo conectar a la base de datos');
      process.exit(1);
    }

    // Inicializar Agente de Base de Datos (Auto-Healing Schema)
    await agenteBaseDatos.inicializar();

    // Insertar datos de ejemplo (solo en desarrollo) - DESHABILITADO
    // if (process.env.NODE_ENV === 'development') {
    //   await insertSampleData();
    // }

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
      console.log(`📍 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
      console.log(`🗄️  Base de datos: ${process.env.DB_HOST || 'localhost'}`);
      console.log(`🌐 Ambiente: ${process.env.NODE_ENV || 'development'}`);
    });

  } catch (error) {
    console.error('❌ Error inicializando servidor:', error);
    process.exit(1);
  }
};

// Ejecutar inicialización
initializeServer();

export default app;