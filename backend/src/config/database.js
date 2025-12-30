import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// Configuración de conexión a PostgreSQL
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'UI',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  // Para Digital Ocean en el futuro
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // máximo de conexiones en el pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

// Crear pool de conexiones
const pool = new Pool(dbConfig);

// Manejar errores de conexión
pool.on('error', (err, client) => {
  console.error('Error inesperado en el cliente de PostgreSQL', err);
  process.exit(-1);
});

// Función para probar la conexión
export const testConnection = async () => {
  try {
    const client = await pool.connect();
    console.log('✅ Conexión a PostgreSQL exitosa');
    console.log(`📍 Base de datos: ${process.env.DB_NAME}`);
    console.log(`🌐 Host: ${process.env.DB_HOST}:${process.env.DB_PORT}`);
    
    // Verificar que la base de datos existe
    const result = await client.query('SELECT current_database(), version()');
    console.log(`🗄️  DB actual: ${result.rows[0].current_database}`);
    
    client.release();
    return true;
  } catch (error) {
    console.error('❌ Error de conexión a PostgreSQL:', error.message);
    return false;
  }
};

// Función para ejecutar queries
export const query = async (text, params) => {
  const client = await pool.connect();
  try {
    const start = Date.now();
    const result = await client.query(text, params);
    const duration = Date.now() - start;
    console.log(`📊 Query ejecutado: ${duration}ms`);
    return result;
  } catch (error) {
    console.error('❌ Error en query:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Función para transacciones
export const transaction = async (queries) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const results = [];
    
    for (const { text, params } of queries) {
      const result = await client.query(text, params);
      results.push(result);
    }
    
    await client.query('COMMIT');
    console.log('✅ Transacción completada exitosamente');
    return results;
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error en transacción, rollback ejecutado:', error);
    throw error;
  } finally {
    client.release();
  }
};

// Cerrar pool al salir de la aplicación
process.on('SIGINT', async () => {
  console.log('🔌 Cerrando pool de conexiones PostgreSQL...');
  await pool.end();
  process.exit(0);
});

export default pool;