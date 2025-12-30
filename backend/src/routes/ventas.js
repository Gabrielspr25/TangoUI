import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// GET /api/ventas - Obtener todas las ventas
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT v.*, ve.nombre || ' ' || ve.apellido as vendedor_nombre
      FROM ventas v
      JOIN vendedores ve ON v.vendedor_id = ve.id
      ORDER BY v.fecha_venta DESC
    `);
    
    res.json({
      success: true,
      data: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo ventas',
      error: error.message
    });
  }
});

// POST /api/ventas - Crear nueva venta
router.post('/', async (req, res) => {
  try {
    const { vendedor_id, cliente_nombre, producto_servicio, monto, fecha_venta, observaciones } = req.body;

    const result = await query(`
      INSERT INTO ventas (vendedor_id, cliente_nombre, producto_servicio, monto, fecha_venta, observaciones)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *
    `, [vendedor_id, cliente_nombre, producto_servicio, monto, fecha_venta || new Date(), observaciones]);

    res.status(201).json({
      success: true,
      message: 'Venta registrada exitosamente',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error registrando venta',
      error: error.message
    });
  }
});

export default router;