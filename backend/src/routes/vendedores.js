import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// GET /api/vendedores - Obtener todos los vendedores
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT v.*, e.nombre as equipo_nombre 
      FROM vendedores v 
      LEFT JOIN equipos e ON v.equipo_id = e.id 
      WHERE v.activo = true
      ORDER BY v.apellido, v.nombre
    `);
    
    res.json({
      success: true,
      data: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo vendedores',
      error: error.message
    });
  }
});

// GET /api/vendedores/:id - Obtener vendedor por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query(`
      SELECT v.*, e.nombre as equipo_nombre 
      FROM vendedores v 
      LEFT JOIN equipos e ON v.equipo_id = e.id 
      WHERE v.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Vendedor no encontrado'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo vendedor',
      error: error.message
    });
  }
});

// POST /api/vendedores - Crear nuevo vendedor
router.post('/', async (req, res) => {
  try {
    const { nombre, apellido, email, telefono, equipo_id } = req.body;

    const result = await query(`
      INSERT INTO vendedores (nombre, apellido, email, telefono, equipo_id)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `, [nombre, apellido, email, telefono, equipo_id || null]);

    res.status(201).json({
      success: true,
      message: 'Vendedor creado exitosamente',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creando vendedor',
      error: error.message
    });
  }
});

// PUT /api/vendedores/:id - Actualizar vendedor
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellido, email, telefono, equipo_id } = req.body;

    const result = await query(`
      UPDATE vendedores 
      SET nombre = $1, apellido = $2, email = $3, telefono = $4, equipo_id = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6 AND activo = true
      RETURNING *
    `, [nombre, apellido, email, telefono, equipo_id, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Vendedor no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Vendedor actualizado exitosamente',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error actualizando vendedor',
      error: error.message
    });
  }
});

// DELETE /api/vendedores/:id - Desactivar vendedor
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query(`
      UPDATE vendedores 
      SET activo = false, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Vendedor no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Vendedor desactivado exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error desactivando vendedor',
      error: error.message
    });
  }
});

export default router;