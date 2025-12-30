import express from 'express';
import { query } from '../config/database.js';

const router = express.Router();

// POST /api/equipos/importar - Importación masiva desde CSV
router.post('/importar', async (req, res) => {
  try {
    const { equipos } = req.body;

    if (!equipos || !Array.isArray(equipos) || equipos.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No se proporcionaron equipos para importar'
      });
    }

    const resultados = {
      exitosos: 0,
      fallidos: 0,
      errores: []
    };

    // Procesar cada equipo
    for (const equipo of equipos) {
      try {
        const { nombreModelo, codigo, costo, externo } = equipo;

        // Validar datos requeridos
        if (!nombreModelo || !codigo) {
          resultados.fallidos++;
          resultados.errores.push({
            equipo: nombreModelo || codigo,
            error: 'Nombre o código faltante'
          });
          continue;
        }

        // Separar marca y modelo del nombreModelo
        const palabras = nombreModelo.split(' ');
        const marca = palabras[0] || 'GENERICO';
        const modelo = nombreModelo;

        // Insertar en la base de datos
        await query(`
          INSERT INTO equipos (
            marca, 
            modelo, 
            tipo, 
            imei, 
            costo, 
            externo, 
            estado,
            numero_serie,
            observaciones
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          ON CONFLICT (imei) DO UPDATE SET
            marca = EXCLUDED.marca,
            modelo = EXCLUDED.modelo,
            costo = EXCLUDED.costo,
            externo = EXCLUDED.externo,
            updated_at = CURRENT_TIMESTAMP
        `, [
          marca,
          modelo,
          'Accesorio', // Tipo por defecto
          codigo, // Usar código como IMEI temporal
          costo || 0,
          externo || false,
          'activo',
          codigo,
          `Importado desde CSV - ${new Date().toISOString()}`
        ]);

        resultados.exitosos++;

      } catch (error) {
        resultados.fallidos++;
        resultados.errores.push({
          equipo: equipo.nombreModelo || equipo.codigo,
          error: error.message
        });
      }
    }

    res.json({
      success: true,
      message: `Importación completada: ${resultados.exitosos} exitosos, ${resultados.fallidos} fallidos`,
      data: resultados
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en la importación masiva',
      error: error.message
    });
  }
});

// GET /api/equipos - Listar todos los equipos
router.get('/', async (req, res) => {
  try {
    const { limite = 100, pagina = 1, buscar = '' } = req.query;
    const offset = (pagina - 1) * limite;

    let queryText = `
      SELECT * FROM equipos 
      WHERE 1=1
    `;

    const params = [];

    if (buscar) {
      queryText += ` AND (marca ILIKE $1 OR modelo ILIKE $1 OR numero_serie ILIKE $1)`;
      params.push(`%${buscar}%`);
    }

    queryText += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limite, offset);

    const result = await query(queryText, params);

    // Contar total
    const countResult = await query('SELECT COUNT(*) FROM equipos');
    const total = parseInt(countResult.rows[0].count);

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        total,
        pagina: parseInt(pagina),
        limite: parseInt(limite),
        totalPaginas: Math.ceil(total / limite)
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo equipos',
      error: error.message
    });
  }
});

// POST /api/equipos - Crear nuevo equipo
router.post('/', async (req, res) => {
  try {
    const {
      marca,
      modelo,
      tipo,
      imei,
      costo,
      externo,
      vendedor_id,
      numero_serie,
      observaciones
    } = req.body;

    // Validaciones
    if (!marca || !modelo || !imei) {
      return res.status(400).json({
        success: false,
        message: 'Marca, modelo e IMEI son requeridos'
      });
    }

    const result = await query(`
      INSERT INTO equipos (
        marca, modelo, tipo, imei, costo, externo, 
        vendedor_id, numero_serie, observaciones
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `, [
      marca,
      modelo,
      tipo || 'Smartphone',
      imei,
      costo || 0,
      externo || false,
      vendedor_id || null,
      numero_serie || null,
      observaciones || null
    ]);

    res.status(201).json({
      success: true,
      message: 'Equipo creado exitosamente',
      data: result.rows[0]
    });

  } catch (error) {
    if (error.code === '23505') { // Unique violation
      res.status(409).json({
        success: false,
        message: 'Ya existe un equipo con ese IMEI'
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Error creando equipo',
        error: error.message
      });
    }
  }
});

// PUT /api/equipos/:id - Actualizar equipo
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      marca,
      modelo,
      tipo,
      costo,
      externo,
      vendedor_id,
      estado,
      observaciones
    } = req.body;

    const result = await query(`
      UPDATE equipos SET
        marca = COALESCE($1, marca),
        modelo = COALESCE($2, modelo),
        tipo = COALESCE($3, tipo),
        costo = COALESCE($4, costo),
        externo = COALESCE($5, externo),
        vendedor_id = $6,
        estado = COALESCE($7, estado),
        observaciones = COALESCE($8, observaciones),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $9
      RETURNING *
    `, [marca, modelo, tipo, costo, externo, vendedor_id, estado, observaciones, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Equipo no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Equipo actualizado exitosamente',
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error actualizando equipo',
      error: error.message
    });
  }
});

// DELETE /api/equipos/:id - Eliminar equipo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM equipos WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Equipo no encontrado'
      });
    }

    res.json({
      success: true,
      message: 'Equipo eliminado exitosamente',
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error eliminando equipo',
      error: error.message
    });
  }
});

// GET /api/equipos/estadisticas - Estadísticas de equipos
router.get('/estadisticas', async (req, res) => {
  try {
    const stats = await query(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE externo = true) as externos,
        COUNT(*) FILTER (WHERE externo = false) as internos,
        COUNT(*) FILTER (WHERE estado = 'activo') as activos,
        SUM(costo) as valor_total,
        AVG(costo) as costo_promedio
      FROM equipos
    `);

    const porMarca = await query(`
      SELECT marca, COUNT(*) as cantidad
      FROM equipos
      GROUP BY marca
      ORDER BY cantidad DESC
      LIMIT 10
    `);

    res.json({
      success: true,
      data: {
        general: stats.rows[0],
        porMarca: porMarca.rows
      }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error obteniendo estadísticas',
      error: error.message
    });
  }
});

export default router;