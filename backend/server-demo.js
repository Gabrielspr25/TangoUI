import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 9000;

// Datos mock para demostración
const mockData = {
  vendedores: [
    { id: 1, nombre: "Carlos", apellido: "Rodriguez", email: "carlos@empresa.com", telefono: "+1234567890", equipo_nombre: "Equipo Alpha" },
    { id: 2, nombre: "Ana", apellido: "Martinez", email: "ana@empresa.com", telefono: "+1234567891", equipo_nombre: "Equipo Alpha" },
    { id: 3, nombre: "Luis", apellido: "Garcia", email: "luis@empresa.com", telefono: "+1234567892", equipo_nombre: "Equipo Beta" }
  ],
  ventas: [
    { id: 1, vendedor_nombre: "Carlos Rodriguez", cliente_nombre: "Empresa XYZ", producto_servicio: "Consultoría IT", monto: 15000.00, fecha_venta: "2025-11-08" },
    { id: 2, vendedor_nombre: "Ana Martinez", cliente_nombre: "Comercial ABC", producto_servicio: "Software CRM", monto: 8500.00, fecha_venta: "2025-11-07" },
    { id: 3, vendedor_nombre: "Luis Garcia", cliente_nombre: "Retail 123", producto_servicio: "Sistema POS", monto: 12000.00, fecha_venta: "2025-11-06" }
  ],
  equipos: [
    { id: 1, nombre: "Equipo Alpha", descripcion: "Equipo de ventas senior", meta_mensual: 50000.00, lider_nombre: "Carlos Rodriguez" },
    { id: 2, nombre: "Equipo Beta", descripcion: "Equipo de ventas junior", meta_mensual: 30000.00, lider_nombre: null }
  ],
  metas: [
    { id: 1, responsable: "Carlos Rodriguez", tipo: "individual", meta_monto: 20000.00, periodo: "mensual", año: 2025, mes: 11 },
    { id: 2, responsable: "Ana Martinez", tipo: "individual", meta_monto: 15000.00, periodo: "mensual", año: 2025, mes: 11 }
  ]
};

// Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// === RUTAS PRINCIPALES ===
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Sistema Claro Backend - FUNCIONANDO PERFECTO!',
    version: '1.0.0',
    status: 'ACTIVO',
    agentes: ['AgenteGestion', 'AgenteVentas', 'AgenteCaja', 'AgenteContratos'],
    endpoints: ['/api/vendedores', '/api/ventas', '/api/equipos', '/api/metas', '/api/agentes']
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Tango UI Backend',
    uptime: process.uptime()
  });
});

// === APIs CON DATOS MOCK ===
app.get('/api/vendedores', (req, res) => {
  res.json({ success: true, data: mockData.vendedores, total: mockData.vendedores.length });
});

app.get('/api/ventas', (req, res) => {
  res.json({ success: true, data: mockData.ventas, total: mockData.ventas.length });
});

app.get('/api/equipos', (req, res) => {
  res.json({ success: true, data: mockData.equipos, total: mockData.equipos.length });
});

app.get('/api/metas', (req, res) => {
  res.json({ success: true, data: mockData.metas, total: mockData.metas.length });
});

// === AGENTES JAVASCRIPT INTERNOS ===
app.get('/api/agentes', (req, res) => {
  const actividad = [
    { agente_nombre: "AgenteGestion", accion: "obtener_resumen_diario", resultado: "ejecutado", timestamp: new Date() },
    { agente_nombre: "AgenteVentas", accion: "analizar_rendimiento", resultado: "completado", timestamp: new Date() },
    { agente_nombre: "AgenteCaja", accion: "calcular_comisiones", resultado: "procesado", timestamp: new Date() },
    { agente_nombre: "AgenteContratos", accion: "revisar_vencimientos", resultado: "actualizado", timestamp: new Date() }
  ];
  res.json({ success: true, data: actividad, total: actividad.length });
});

app.post('/api/agentes/ejecutar', (req, res) => {
  const { agente, accion, parametros } = req.body;
  
  // Simular ejecución de agente
  const resultados = {
    AgenteGestion: { ventas_hoy: 3, total_vendido: 35500.00, mensaje: "Resumen diario generado" },
    AgenteVentas: { rendimiento: "Alto", recomendacion: "Mantener estrategia actual" },
    AgenteCaja: { comisiones_calculadas: 1775.00, vendedores_procesados: 3 },
    AgenteContratos: { contratos_revisados: 5, proximos_vencimientos: 2 }
  };

  res.json({
    success: true,
    message: `Agente ${agente} ejecutado exitosamente`,
    data: resultados[agente] || { mensaje: `Acción ${accion} completada` }
  });
});

// POST endpoints para crear datos
app.post('/api/vendedores', (req, res) => {
  const nuevoVendedor = { id: Date.now(), ...req.body };
  mockData.vendedores.push(nuevoVendedor);
  res.status(201).json({ success: true, message: "Vendedor creado", data: nuevoVendedor });
});

app.post('/api/ventas', (req, res) => {
  const nuevaVenta = { id: Date.now(), ...req.body };
  mockData.ventas.push(nuevaVenta);
  res.status(201).json({ success: true, message: "Venta registrada", data: nuevaVenta });
});

// === INICIAR SERVIDOR ===
app.listen(PORT, () => {
  console.log('🎉 ================================');
  console.log('🚀 SISTEMA CLARO - BACKEND ACTIVO');
  console.log('🎯 Puerto: http://localhost:' + PORT);
  console.log('📊 Estado: FUNCIONANDO PERFECTO');
  console.log('🤖 Agentes: AgenteGestion, AgenteVentas, AgenteCaja, AgenteContratos');
  console.log('⚡ Tiempo de inicio: ' + process.uptime().toFixed(2) + 's');
  console.log('🎉 ================================');
});

export default app;