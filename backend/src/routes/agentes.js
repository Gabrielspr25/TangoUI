import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// GET /api/agentes - Obtener actividad de agentes
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT * FROM actividad_agentes 
      ORDER BY timestamp DESC 
      LIMIT 50
    `);
    
    res.json({
      success: true,
      data: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo actividad de agentes',
      error: error.message
    });
  }
});

// POST /api/agentes/ejecutar - Ejecutar acción de agente
router.post('/ejecutar', async (req, res) => {
  try {
    const { agente, accion, parametros } = req.body;

    // Registrar la actividad del agente
    await query(`
      INSERT INTO actividad_agentes (agente_nombre, accion, detalles, resultado)
      VALUES ($1, $2, $3, $4)
    `, [agente, accion, JSON.stringify(parametros), 'ejecutado']);

    // Aquí se ejecutaría la lógica del agente específico
    let resultado = await ejecutarAgente(agente, accion, parametros);

    res.json({
      success: true,
      message: `Agente ${agente} ejecutado exitosamente`,
      data: resultado
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error ejecutando agente',
      error: error.message
    });
  }
});

// Función para ejecutar agentes específicos
const ejecutarAgente = async (agente, accion, parametros) => {
  switch (agente) {
    case 'AgenteGestion':
      return await ejecutarAgenteGestion(accion, parametros);
    case 'AgenteVentas':
      return await ejecutarAgenteVentas(accion, parametros);
    case 'AgenteCaja':
      return await ejecutarAgenteCaja(accion, parametros);
    case 'AgenteContratos':
      return await ejecutarAgenteContratos(accion, parametros);
    default:
      throw new Error(`Agente ${agente} no reconocido`);
  }
};

// Agente de Gestión
const ejecutarAgenteGestion = async (accion, parametros) => {
  switch (accion) {
    case 'obtener_resumen_diario':
      const ventas = await query('SELECT COUNT(*), SUM(monto) FROM ventas WHERE DATE(fecha_venta) = CURRENT_DATE');
      return {
        ventas_hoy: ventas.rows[0].count,
        total_vendido: ventas.rows[0].sum || 0
      };
    default:
      return { mensaje: `Acción ${accion} ejecutada por AgenteGestion` };
  }
};

// Agente de Ventas
const ejecutarAgenteVentas = async (accion, parametros) => {
  switch (accion) {
    case 'analizar_rendimiento':
      // Lógica para analizar rendimiento de vendedores
      return { mensaje: 'Análisis de rendimiento completado', data: parametros };
    default:
      return { mensaje: `Acción ${accion} ejecutada por AgenteVentas` };
  }
};

// Agente de Caja
const ejecutarAgenteCaja = async (accion, parametros) => {
  switch (accion) {
    case 'calcular_comisiones':
      // Lógica para calcular comisiones
      return { mensaje: 'Comisiones calculadas', data: parametros };
    default:
      return { mensaje: `Acción ${accion} ejecutada por AgenteCaja` };
  }
};

// Agente de Contratos
const ejecutarAgenteContratos = async (accion, parametros) => {
  switch (accion) {
    case 'revisar_vencimientos':
      // Lógica para revisar contratos próximos a vencer
      return { mensaje: 'Revisión de vencimientos completada', data: parametros };
    default:
      return { mensaje: `Acción ${accion} ejecutada por AgenteContratos` };
  }
};

export default router;