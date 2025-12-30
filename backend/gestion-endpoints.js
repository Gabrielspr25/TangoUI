// Backend Endpoints para Sistema Claro - Submódulos de Gestión
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuración de multer para subida de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, 'uploads', 'vendedores');
    // Crear directorio si no existe
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    // Generar nombre único para el archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, `vendedor-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB máximo
  },
  fileFilter: (req, file, cb) => {
    // Solo permitir imágenes
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'), false);
    }
  }
});

// Configuración básica
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Servir archivos estáticos

// === DATOS MOCK PARA DESARROLLO ===
const datosGestion = {
  comisiones: [
    { id: 1, vendedor: "Vendedor A", monto_venta: 15000, porcentaje: 5, comision: 750, fecha: "2025-11-09" },
    { id: 2, vendedor: "Vendedor B", monto_venta: 22000, porcentaje: 7, comision: 1540, fecha: "2025-11-08" }
  ],
  vendedores: [
    { 
      id: 1, 
      nombre: "Carlos", 
      apellido: "Rodriguez", 
      email: "carlos@empresa.com", 
      telefono: "+1234567890", 
      equipo: "Alpha", 
      equipo_id: 1,
      activo: true,
      foto_url: null,
      fecha_registro: "2025-11-01"
    },
    { 
      id: 2, 
      nombre: "Ana", 
      apellido: "Martinez", 
      email: "ana@empresa.com", 
      telefono: "+1234567891", 
      equipo: "Beta", 
      equipo_id: 2,
      activo: true,
      foto_url: null,
      fecha_registro: "2025-11-02"
    }
  ],
  equipos: [
    { id: 1, tipo: "iPhone 14", imei: "123456789012345", vendedor_id: 1, estado: "activo", fecha_asignacion: "2025-11-01" },
    { id: 2, tipo: "Samsung Galaxy", imei: "987654321098765", vendedor_id: 2, estado: "activo", fecha_asignacion: "2025-11-02" }
  ],
  productos: [
    { id: 1, nombre: "Plan Básico", descripcion: "Plan telefonía básica", precio: 25.99, categoria: "Planes", activo: true },
    { id: 2, nombre: "Plan Premium", descripcion: "Plan telefonía premium", precio: 45.99, categoria: "Planes", activo: true }
  ],
  usuarios: [
    { id: 1, usuario: "admin", email: "admin@empresa.com", rol: "administrador", ultimo_acceso: "2025-11-09" },
    { id: 2, usuario: "supervisor", email: "supervisor@empresa.com", rol: "supervisor", ultimo_acceso: "2025-11-08" }
  ],
  tipo_plan: [
    { id: 1, nombre: "Residencial", descripcion: "Planes para uso residencial", precio_base: 19.99, activo: true },
    { id: 2, nombre: "Empresarial", descripcion: "Planes para empresas", precio_base: 39.99, activo: true }
  ],
  tiendas: [
    { id: 1, nombre: "Sucursal Centro", direccion: "Calle Principal 123", gerente: "María García", telefono: "+1234567892" },
    { id: 2, nombre: "Sucursal Norte", direccion: "Av. Norte 456", gerente: "Luis Pérez", telefono: "+1234567893" }
  ],
  soc_equipo: [
    { id: 1, nombre: "Sociedad Alpha", descripcion: "Equipo de ventas principal", miembros: 5, comision_total: 15000 },
    { id: 2, nombre: "Sociedad Beta", descripcion: "Equipo de ventas secundario", miembros: 3, comision_total: 9000 }
  ],
  features: [
    { id: 1, nombre: "Llamadas Ilimitadas", descripcion: "Llamadas sin límite", activo: true, planes_incluidos: ["Premium", "Empresarial"] },
    { id: 2, nombre: "5G Internet", descripcion: "Conexión 5G de alta velocidad", activo: true, planes_incluidos: ["Premium"] }
  ],
  mac: [
    { id: 1, direccion_mac: "AA:BB:CC:DD:EE:FF", dispositivo: "Router Cisco", ubicacion: "Sucursal Centro", activo: true },
    { id: 2, direccion_mac: "11:22:33:44:55:66", dispositivo: "Router Linksys", ubicacion: "Sucursal Norte", activo: true }
  ],
  departamentos: [
    { id: 1, nombre: "Ventas", descripcion: "Departamento de ventas y atención al cliente", empleados: 12, presupuesto: 150000 },
    { id: 2, nombre: "Técnico", descripcion: "Departamento técnico y soporte", empleados: 8, presupuesto: 120000 }
  ],
  razones_visita: [
    { id: 1, razon: "Consulta de Plan", descripcion: "Cliente consulta sobre planes disponibles", categoria: "comercial" },
    { id: 2, razon: "Soporte Técnico", descripcion: "Cliente requiere asistencia técnica", categoria: "tecnico" }
  ],
  ivu_nacional: [
    { id: 1, descripcion: "IVU Estándar", porcentaje: 10.5, aplicable_a: "servicios", vigente: true },
    { id: 2, descripcion: "IVU Reducido", porcentaje: 7.0, aplicable_a: "equipos", vigente: true }
  ],
  puntos_vendedor: [
    { id: 1, vendedor_id: 1, puntos: 1250, nivel: "Oro", ultimo_calculo: "2025-11-09" },
    { id: 2, vendedor_id: 2, puntos: 890, nivel: "Plata", ultimo_calculo: "2025-11-08" }
  ]
};

// === RUTAS PRINCIPALES ===
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Sistema Claro - Backend de Gestión FUNCIONANDO!',
    version: '2.0.0',
    estado: 'ACTIVO',
    modulos_gestion: Object.keys(datosGestion),
    endpoints: [
      '/api/gestion/comisiones', '/api/gestion/vendedores', '/api/gestion/equipos',
      '/api/gestion/productos', '/api/gestion/usuarios', '/api/gestion/tipo_plan',
      '/api/gestion/tiendas', '/api/gestion/soc_equipo', '/api/gestion/features',
      '/api/gestion/mac', '/api/gestion/departamentos', '/api/gestion/razones_visita',
      '/api/gestion/ivu_nacional', '/api/gestion/puntos_vendedor'
    ]
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Sistema Claro - Gestión Backend',
    uptime: process.uptime(),
    modulos_activos: 14
  });
});

// === ENDPOINTS DE GESTIÓN ===

// Gestión de Comisiones
app.get('/api/gestion/comisiones', (req, res) => {
  res.json({ success: true, data: datosGestion.comisiones, total: datosGestion.comisiones.length });
});

app.post('/api/gestion/comisiones', (req, res) => {
  const nuevaComision = { id: Date.now(), ...req.body, fecha: new Date().toISOString().split('T')[0] };
  datosGestion.comisiones.push(nuevaComision);
  res.status(201).json({ success: true, message: "Comisión registrada", data: nuevaComision });
});

// Gestión de Vendedores
app.get('/api/gestion/vendedores', (req, res) => {
  res.json({ success: true, data: datosGestion.vendedores, total: datosGestion.vendedores.length });
});

app.post('/api/gestion/vendedores', (req, res) => {
  const nuevoVendedor = { id: Date.now(), ...req.body, activo: true };
  datosGestion.vendedores.push(nuevoVendedor);
  res.status(201).json({ success: true, message: "Vendedor registrado", data: nuevoVendedor });
});

// Gestión de Equipos
app.get('/api/gestion/equipos', (req, res) => {
  res.json({ success: true, data: datosGestion.equipos, total: datosGestion.equipos.length });
});

app.post('/api/gestion/equipos', (req, res) => {
  const nuevoEquipo = { id: Date.now(), ...req.body, fecha_asignacion: new Date().toISOString().split('T')[0] };
  datosGestion.equipos.push(nuevoEquipo);
  res.status(201).json({ success: true, message: "Equipo registrado", data: nuevoEquipo });
});

// Gestión de Productos
app.get('/api/gestion/productos', (req, res) => {
  res.json({ success: true, data: datosGestion.productos, total: datosGestion.productos.length });
});

app.post('/api/gestion/productos', (req, res) => {
  const nuevoProducto = { id: Date.now(), ...req.body, activo: true };
  datosGestion.productos.push(nuevoProducto);
  res.status(201).json({ success: true, message: "Producto registrado", data: nuevoProducto });
});

// Gestión de Usuarios
app.get('/api/gestion/usuarios', (req, res) => {
  res.json({ success: true, data: datosGestion.usuarios, total: datosGestion.usuarios.length });
});

app.post('/api/gestion/usuarios', (req, res) => {
  const nuevoUsuario = { id: Date.now(), ...req.body, ultimo_acceso: new Date().toISOString().split('T')[0] };
  datosGestion.usuarios.push(nuevoUsuario);
  res.status(201).json({ success: true, message: "Usuario registrado", data: nuevoUsuario });
});

// Gestión de Tipo de Plan
app.get('/api/gestion/tipo_plan', (req, res) => {
  res.json({ success: true, data: datosGestion.tipo_plan, total: datosGestion.tipo_plan.length });
});

app.post('/api/gestion/tipo_plan', (req, res) => {
  const nuevoTipoPlan = { id: Date.now(), ...req.body, activo: true };
  datosGestion.tipo_plan.push(nuevoTipoPlan);
  res.status(201).json({ success: true, message: "Tipo de plan registrado", data: nuevoTipoPlan });
});

// Gestión de Tiendas
app.get('/api/gestion/tiendas', (req, res) => {
  res.json({ success: true, data: datosGestion.tiendas, total: datosGestion.tiendas.length });
});

app.post('/api/gestion/tiendas', (req, res) => {
  const nuevaTienda = { id: Date.now(), ...req.body };
  datosGestion.tiendas.push(nuevaTienda);
  res.status(201).json({ success: true, message: "Tienda registrada", data: nuevaTienda });
});

// Gestión de Soc Equipo
app.get('/api/gestion/soc_equipo', (req, res) => {
  res.json({ success: true, data: datosGestion.soc_equipo, total: datosGestion.soc_equipo.length });
});

app.post('/api/gestion/soc_equipo', (req, res) => {
  const nuevoSocEquipo = { id: Date.now(), ...req.body };
  datosGestion.soc_equipo.push(nuevoSocEquipo);
  res.status(201).json({ success: true, message: "Sociedad de equipo registrada", data: nuevoSocEquipo });
});

// Gestión de Features
app.get('/api/gestion/features', (req, res) => {
  res.json({ success: true, data: datosGestion.features, total: datosGestion.features.length });
});

app.post('/api/gestion/features', (req, res) => {
  const nuevoFeature = { id: Date.now(), ...req.body, activo: true };
  datosGestion.features.push(nuevoFeature);
  res.status(201).json({ success: true, message: "Feature registrado", data: nuevoFeature });
});

// Gestión de Mac
app.get('/api/gestion/mac', (req, res) => {
  res.json({ success: true, data: datosGestion.mac, total: datosGestion.mac.length });
});

app.post('/api/gestion/mac', (req, res) => {
  const nuevoMac = { id: Date.now(), ...req.body, activo: true };
  datosGestion.mac.push(nuevoMac);
  res.status(201).json({ success: true, message: "Dirección MAC registrada", data: nuevoMac });
});

// Gestión de Departamentos
app.get('/api/gestion/departamentos', (req, res) => {
  res.json({ success: true, data: datosGestion.departamentos, total: datosGestion.departamentos.length });
});

app.post('/api/gestion/departamentos', (req, res) => {
  const nuevoDepartamento = { id: Date.now(), ...req.body };
  datosGestion.departamentos.push(nuevoDepartamento);
  res.status(201).json({ success: true, message: "Departamento registrado", data: nuevoDepartamento });
});

// Gestión de Razones de Visita
app.get('/api/gestion/razones_visita', (req, res) => {
  res.json({ success: true, data: datosGestion.razones_visita, total: datosGestion.razones_visita.length });
});

app.post('/api/gestion/razones_visita', (req, res) => {
  const nuevaRazon = { id: Date.now(), ...req.body };
  datosGestion.razones_visita.push(nuevaRazon);
  res.status(201).json({ success: true, message: "Razón de visita registrada", data: nuevaRazon });
});

// Gestión de IVU Nacional
app.get('/api/gestion/ivu_nacional', (req, res) => {
  res.json({ success: true, data: datosGestion.ivu_nacional, total: datosGestion.ivu_nacional.length });
});

app.post('/api/gestion/ivu_nacional', (req, res) => {
  const nuevoIvu = { id: Date.now(), ...req.body, vigente: true };
  datosGestion.ivu_nacional.push(nuevoIvu);
  res.status(201).json({ success: true, message: "IVU registrado", data: nuevoIvu });
});

// Gestión de Puntos Vendedor
app.get('/api/gestion/puntos_vendedor', (req, res) => {
  res.json({ success: true, data: datosGestion.puntos_vendedor, total: datosGestion.puntos_vendedor.length });
});

app.post('/api/gestion/puntos_vendedor', (req, res) => {
  const nuevoPunto = { id: Date.now(), ...req.body, ultimo_calculo: new Date().toISOString().split('T')[0] };
  datosGestion.puntos_vendedor.push(nuevoPunto);
  res.status(201).json({ success: true, message: "Puntos registrados", data: nuevoPunto });
});

// === INICIAR SERVIDOR ===
const puerto = 9999;
app.listen(puerto, () => {
  console.log('🎉 ================================');
  console.log('🚀 BACKEND GESTIÓN - PUERTO', puerto);
  console.log('📊 Estado: TODOS LOS ENDPOINTS ACTIVOS');
  console.log('🔧 Módulos de Gestión: 14 OPERATIVOS');
  console.log('⚡ API REST: FUNCIONANDO PERFECTO');
  console.log('🎉 ================================');
});

export default app;