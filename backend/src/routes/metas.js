import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// GET /api/metas - Obtener todas las metas
router.get('/', async (req, res) => {
  try {
    const result = await query(`
      SELECT m.*, 
        CASE 
          WHEN m.tipo = 'individual' THEN v.nombre || ' ' || v.apellido
          ELSE e.nombre
        END as responsable
      FROM metas m
      LEFT JOIN vendedores v ON m.vendedor_id = v.id
      LEFT JOIN equipos e ON m.equipo_id = e.id
      WHERE m.activa = true
      ORDER BY m.año DESC, m.mes DESC
    `);
    
    res.json({
      success: true,
      data: result.rows,
      total: result.rows.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo metas',
      error: error.message
    });
  }
});

// POST /api/metas - Crear nueva meta
router.post('/', async (req, res) => {
  try {
    const { vendedor_id, equipo_id, tipo, meta_monto, periodo, año, mes } = req.body;

    const result = await query(`
      INSERT INTO metas (vendedor_id, equipo_id, tipo, meta_monto, periodo, año, mes)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [vendedor_id, equipo_id, tipo, meta_monto, periodo, año, mes]);

    res.status(201).json({
      success: true,
      message: 'Meta creada exitosamente',
      data: result.rows[0]
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creando meta',
      error: error.message
    });
  }
});

export default router;