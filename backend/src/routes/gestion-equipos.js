import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// GET /api/gestion/equipos - Obtener todos los dispositivos
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT d.*, v.nombre || ' ' || v.apellido as vendedor_nombre
      FROM dispositivos d
      LEFT JOIN vendedores v ON d.vendedor_id = v.id
      ORDER BY d.created_at DESC
    `);
    
    res.json({
      success: true,
      data: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    console.error('Error obteniendo dispositivos:', error);
    res.status(500).json({
      success: false,
      message: 'Error obteniendo dispositivos',
      error: error.message
    });
  }
});

// POST /api/gestion/equipos - Crear nuevo dispositivo
router.post('/', async (req, res) => {
  try {
    const { 
      marca, modelo, tipo, imei, costo, externo, 
      vendedor_id, estado, numero_serie, fecha_adquisicion, observaciones 
    } = req.body;

    // Validaciones básicas
    if (!marca || !modelo || !imei) {
      return res.status(400).json({
        success: false,
        message: 'Marca, modelo e IMEI son campos requeridos'
      });
    }

    if (imei.length !== 15) {
      return res.status(400).json({
        success: false,
        message: 'El IMEI debe tener exactamente 15 dígitos'
      });
    }

    const result = await query(`
      INSERT INTO dispositivos (
        marca, modelo, tipo, imei, costo, externo, 
        vendedor_id, estado, numero_serie, fecha_adquisicion, observaciones
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `, [
      marca, modelo, tipo, imei, costo, externo || false,
      vendedor_id || null, estado || 'activo', numero_serie, 
      fecha_adquisicion, observaciones
    ]);

    res.status(201).json({
      success: true,
      message: 'Dispositivo creado exitosamente',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creando dispositivo:', error);
    
    // Error de IMEI duplicado
    if (error.code === '23505' && error.constraint === 'dispositivos_imei_key') {
      return res.status(400).json({
        success: false,
        message: 'Ya existe un dispositivo con ese IMEI'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creando dispositivo',
      error: error.message
    });
  }
});

// PUT /api/gestion/equipos/:id - Actualizar dispositivo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      marca, modelo, tipo, imei, costo, externo, 
      vendedor_id, estado, numero_serie, fecha_adquisicion, observaciones 
    } = req.body;

    const result = await query(`
      UPDATE dispositivos SET
        marca = $2, modelo = $3, tipo = $4, imei = $5, costo = $6, externo = $7,
        vendedor_id = $8, estado = $9, numero_serie = $10, 
        fecha_adquisicion = $11, observaciones = $12, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `, [
      id, marca, modelo, tipo, imei, costo, externo || false,
      vendedor_id || null, estado || 'activo', numero_serie, 
      fecha_adquisicion, observaciones
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Dispositivo no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Dispositivo actualizado exitosamente',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error actualizando dispositivo:', error);
    res.status(500).json({
      success: false,
      message: 'Error actualizando dispositivo',
      error: error.message
    });
  }
});

// DELETE /api/gestion/equipos/:id - Eliminar dispositivo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(`
      DELETE FROM dispositivos WHERE id = $1 RETURNING *
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Dispositivo no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Dispositivo eliminado exitosamente',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error eliminando dispositivo:', error);
    res.status(500).json({
      success: false,
      message: 'Error eliminando dispositivo',
      error: error.message
    });
  }
});

// GET /api/gestion/equipos/estadisticas - Obtener estadísticas de dispositivos
router.get('/estadisticas', async (req, res) => {
  try {
    const [totalResult, marcasResult, estadosResult] = await Promise.all([
      query('SELECT COUNT(*) as total FROM dispositivos'),
      query(`
        SELECT marca, COUNT(*) as cantidad 
        FROM dispositivos 
        GROUP BY marca 
        ORDER BY cantidad DESC
      `),
      query(`
        SELECT estado, COUNT(*) as cantidad 
        FROM dispositivos 
        GROUP BY estado
      `)
    ]);

    res.json({
      success: true,
      data: {
        total: parseInt(totalResult.rows[0].total),
        por_marca: marcasResult.rows,
        por_estado: estadosResult.rows
      }
    });
  } catch (error) {
    console.error('Error obteniendo estadísticas:', error);
    res.status(500).json({
      success: false,
      message: 'Error obteniendo estadísticas',
      error: error.message
    });
  }
});

export default router;