import express from 'express';
import cors from 'cors';
const app = express();

// Configuración básica
app.use(cors());
app.use(express.json());

// Datos simples
const datos = {
  vendedores: [
    { id: 1, nombre: "Carlos Rodriguez", email: "carlos@empresa.com" },
    { id: 2, nombre: "Ana Martinez", email: "ana@empresa.com" },
    { id: 3, nombre: "Luis Garcia", email: "luis@empresa.com" }
  ]
};

// Rutas
app.get('/', (req, res) => {
  res.json({ 
    mensaje: 'Backend Sistema Claro FUNCIONANDO!',
    estado: 'ACTIVO'
  });
});

app.get('/health', (req, res) => {
  res.json({ estado: 'OK', hora: new Date() });
});

app.get('/api/vendedores', (req, res) => {
  res.json({ success: true, data: datos.vendedores });
});

app.post('/api/agentes/ejecutar', (req, res) => {
  res.json({ 
    success: true, 
    mensaje: 'Agente ejecutado correctamente',
    agente: req.body.agente || 'AgenteGestion'
  });
});

// Iniciar servidor
const puerto = 8888;
app.listen(puerto, () => {
  console.log('================================');
  console.log('BACKEND FUNCIONANDO EN PUERTO', puerto);
  console.log('URL: http://localhost:' + puerto);
  console.log('================================');
});