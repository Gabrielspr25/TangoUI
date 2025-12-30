# 🚀 Sistema Claro - TangoUI

**Sistema SaaS Multi-Usuario de Gestión de Ventas para Telecomunicaciones (Claro Puerto Rico)**

Sistema empresarial completo con arquitectura modular de agentes, sistema de permisos de 4 niveles y 26 módulos funcionales para gestión integral de ventas, inventario, comisiones, CRM y administración.

---

## 🎯 **¿Qué es este proyecto?**

Sistema de gestión empresarial **SaaS (Software as a Service)** diseñado específicamente para **ventas de telecomunicaciones** (Claro PR), que incluye:

- ✅ **26 módulos funcionales** con control de acceso por permisos
- ✅ **Sistema de permisos de 4 niveles**: CREATOR, ADMIN, AGENT, BASIC
- ✅ **Arquitectura modular de agentes JavaScript** (sin framework)
- ✅ **Dashboard con íconos organizados** tipo grid responsive
- ✅ **Menú lateral con navegación jerárquica** y submódulos
- ✅ **Formularios completos**: Vendedores, Equipos, Comisiones, Activaciones
- ✅ **Sistema de gestión con 15 submódulos**: Comisiones, Vendedores, Equipos, Productos, Usuarios, Tipo de Plan, Tiendas, Soc Equipo, Features, MAC, Departamentos, Contratos, Razones de Visita, IVU Nacional, Puntos Vendedor

---

## 🏗️ **Arquitectura del Sistema**

### **Tecnologías Core**
- **Frontend:** Vite v7.1.12 (build tool ultra rápido)
- **Vanilla JavaScript** (sin React, sin frameworks - máximo rendimiento)
- **Tailwind CSS** (utility-first CSS framework)
- **Arquitectura SPA** (Single Page Application con navegación dinámica)
- **Git:** Control de versiones (GitHub: Gabrielspr25/TangoUI)

### **Tecnologías Core**
- **Frontend:** Vite v7.1.12 (build tool ultra rápido)
- **Vanilla JavaScript** (sin React, sin frameworks - máximo rendimiento)
- **Tailwind CSS** (utility-first CSS framework)
- **Arquitectura SPA** (Single Page Application con navegación dinámica)
- **Git:** Control de versiones (GitHub: Gabrielspr25/TangoUI)

### **Patrón de Arquitectura**
```
┌─────────────────────────────────────────────────┐
│           FRONTEND (Vanilla JS + Vite)          │
├─────────────────────────────────────────────────┤
│  main.js (3269 líneas)                          │
│  ├─ Sistema de Permisos (MODULE_PERMISSIONS)    │
│  ├─ Navegación Dinámica (navegarA)              │
│  ├─ Renderizado de Módulos                      │
│  └─ Importación de Agentes Modulares            │
├─────────────────────────────────────────────────┤
│  AGENTES MODULARES (src/agentes/)               │
│  ├─ moduloUnificadoVentasSimple.js              │
│  ├─ agenteEquipos.js                            │
│  ├─ AgenteActivaciones.jsx                      │
│  ├─ AgenteCambios.jsx                           │
│  ├─ AgenteInventario.jsx                        │
│  ├─ AgenteSubsidios.jsx                         │
│  └─ AgenteComisiones.jsx                        │
├─────────────────────────────────────────────────┤
│  BACKEND (Preparado - No implementado aún)      │
│  └─ API REST (Node.js + Express planeado)       │
└─────────────────────────────────────────────────┘
```

---

## 📋 **26 Módulos del Sistema**

### **ARCHIVO DONDE ESTÁN CONFIGURADOS LOS ÍCONOS:**
📁 **`src/main-backup.js`** (líneas 114-145)
- Función: `renderMenuItems()`
- Contiene array con 27 módulos (incluye Dashboard)
- Cada módulo tiene: `{ id, icon, label, badge }`

### **Lista Completa de Módulos con Íconos:**

| # | Módulo | Ícono | Permisos | Badge |
|---|--------|-------|----------|-------|
| 1 | **Dashboard** | 📊 | ALL | - |
| 2 | **Gestión** | ⚙️ | CREATOR, ADMIN | 15 submódulos |
| 3 | **Centro de Ventas** | 📊 | ALL | NUEVO |
| 4 | **Generar Venta** | 🛒 | ALL | - |
| 5 | **Pymes** | 🏪 | CREATOR, ADMIN, AGENT | - |
| 6 | **Activaciones** | 👥 | CREATOR, ADMIN, AGENT | - |
| 7 | **Consultar Base General** | 💰 | CREATOR, ADMIN, AGENT | - |
| 8 | **Consultar Base FIJO** | 💰 | CREATOR, ADMIN | - |
| 9 | **Reportes** | 📈 | CREATOR, ADMIN, AGENT | - |
| 10 | **Pago Factura** | 💳 | CREATOR, ADMIN | - |
| 11 | **Discrepancias de Pago** | 📋 | CREATOR, ADMIN | - |
| 12 | **Inventario** | 📦 | CREATOR, ADMIN, AGENT | - |
| 13 | **Accesorios** | 🎧 | CREATOR, ADMIN, AGENT | - |
| 14 | **Documentos** | 📁 | CREATOR, ADMIN | - |
| 15 | **Cuentas Clientes** | 👥 | CREATOR, ADMIN, AGENT | - |
| 16 | **CRM** | 🎯 | CREATOR, ADMIN, AGENT | - |
| 17 | **SMS** | 📱 | CREATOR, ADMIN | - |
| 18 | **Programa de Fidelización** | 🏆 | CREATOR, ADMIN | - |
| 19 | **Consulta Meses** | 📅 | CREATOR, ADMIN | - |
| 20 | **Ponche** | ⏰ | CREATOR, ADMIN | - |
| 21 | **Caja** | 💳 | CREATOR, ADMIN | - |
| 22 | **Documentos Admin** | 📋 | CREATOR | - |
| 23 | **Conciliación Comisiones** | 🔄 | CREATOR | - |
| 24 | **Objetivos de Venta** | 📊 | CREATOR, ADMIN | - |
| 25 | **Administración** | ⚙️ | CREATOR | - |
| 26 | **Permisos** | 🔐 | CREATOR | - |
| 27 | **Agentes IA** | 🤖 | CREATOR | CREATOR only |

---

## 🔐 **Sistema de Permisos (4 Niveles)**

```javascript
const USER_TYPES = {
  CREATOR: 'CREATOR',   // Acceso total (26/26 módulos)
  ADMIN: 'ADMIN',       // Gestión operativa (21/26 módulos)
  AGENT: 'AGENT',       // Ventas y operaciones (14/26 módulos)
  BASIC: 'BASIC'        // Acceso básico (2/26 módulos)
}
```

**Archivo de configuración:** `src/main-backup.js` (líneas 61-90)
- Objeto: `MODULE_PERMISSIONS`
- Define qué tipos de usuario pueden acceder a cada módulo
- Función de validación: `hasPermission(modulo)`

---

---

## 🛠️ **Instalación y Ejecución**

### **Prerequisitos:**
- Node.js v16+ 
- npm v8+
- Git

### **Pasos:**

```bash
# 1. Clonar repositorio
git clone https://github.com/Gabrielspr25/TangoUI.git
cd sistema-claro

# 2. Instalar dependencias
npm install

# 3. Ejecutar servidor de desarrollo
npm run dev

# 4. Abrir en navegador
http://localhost:5173/
```

### **Scripts Disponibles:**

```json
{
  "dev": "vite",                    // Servidor desarrollo (puerto 5173)
  "build": "vite build",            // Build producción
  "preview": "vite preview"         // Preview build
}
```

### **Puertos:**
- **Local:** http://localhost:5173/
- **Network:** http://192.168.10.118:5173/ (LAN)
- **Network:** http://100.69.63.59:5173/ (Tailscale VPN)

---

## 🔧 **Detalles Técnicos Importantes**

### **1. Sistema de Navegación**
- **Función principal:** `navegarA(module, submodule)`
- **Estado global:** `currentModule`, `currentSubmodule`
- **Renderizado dinámico:** `renderizarContenido()`
- **Validación de permisos:** Antes de cada navegación

### **2. Renderizado de Módulos**
```javascript
// Función de renderizado (línea ~195 en main-backup.js)
function renderizarContenido() {
  switch (currentModule) {
    case 'gestion': return getGestionContent()
    case 'centroVentas': return getModuloUnificadoVentasContent()
    case 'vendedores': return cargarVendedores()
    // ... 26 módulos
  }
}
```

### **3. Submódulos de Gestión (15 totales)**
```javascript
const SUBMODULES = {
  gestion: {
    comisiones: 'Comisiones',
    vendedores: 'Vendedores',
    equipos: 'Equipos',
    productos: 'Productos',
    usuarios: 'Usuarios',
    tipoPlan: 'Tipo de Plan',
    tiendas: 'Tiendas',
    socEquipo: 'Soc Equipo',
    features: 'Features',
    mac: 'MAC',
    departamentos: 'Departamentos',
    contratos: 'Contratos',
    razonesVisita: 'Razones de Visita',
    ivuNacional: 'IVU Nacional',
    puntosVendedor: 'Puntos Vendedor'
  }
}
```

### **4. Formularios Implementados**

#### **Vendedores** (Gestión > Vendedores)
- Crear/Editar/Eliminar vendedores
- Upload foto de perfil (drag & drop)
- Validación de campos
- Asignación a equipos de venta
- Vista de lista con búsqueda

#### **Equipos** (Gestión > Equipos)
- Formulario completo de gestión de equipos móviles
- Validación IMEI (15 o 20 dígitos)
- Validación SIM (20 dígitos)
- Campos: IMEI, SIM, Modelo, Color, Almacenamiento, Estado
- Vista de lista filtrable

### **5. Usuario Actual (Simulado)**
```javascript
let currentUser = {
  id: 1,
  nombre: 'Gabriel',
  email: 'gabriel@tangoui.com',
  tipo: USER_TYPES.CREATOR,
  plan: 'Enterprise',
  activo: true
}
```

---

## 🎨 **Tema Visual**

### **Original (Actual - main-backup.js)**
- Fondo: `bg-gray-900`
- Sidebar: `bg-gray-800`
- Cards: `bg-gray-800` con bordes `border-gray-700`
- Colores de acento: Blue (`bg-blue-600`), Green (`bg-green-600`)
- Tipografía: Tailwind default
- Diseño: Dashboard moderno con sidebar lateral fijo

### **Futurista (Experimental - main-new.js + style-new.css)**
- Fondo espacial con partículas animadas
- Glass morphism (`backdrop-blur-md`)
- Gradientes neon (cyan → purple → pink)
- Efectos glow y sombras de color
- Animaciones CSS personalizadas
- ⚠️ **Estado:** Experimental, no en producción

---

---

## 📦 **Estructura Completa del Proyecto**

```
sistema-claro/
├── 📁 src/
│   ├── 📄 main.js (154 líneas - versión original Git)
│   ├── 📄 main-backup.js (3269 líneas - ⭐ VERSIÓN COMPLETA CON TODO)
│   ├── 📄 main-new.js (versión futurista - experimental)
│   ├── 📄 style.css (Tailwind CSS original)
│   ├── 📄 style-new.css (tema futurista con efectos glass)
│   ├── 📄 counter.js (utilities)
│   │
│   ├── 📁 agentes/ (Módulos JavaScript independientes)
│   │   ├── moduloUnificadoVentasSimple.js
│   │   ├── agenteEquipos.js
│   │   ├── AgenteActivaciones.jsx
│   │   ├── AgenteCambios.jsx
│   │   ├── AgenteInventario.jsx
│   │   ├── AgenteSubsidios.jsx
│   │   └── AgenteComisiones.jsx
│   │
│   └── 📁 componentes/ (Componentes reutilizables)
│
├── 📁 public/ (Assets estáticos)
├── 📁 docs/ (Documentación completa)
│   └── ARQUITECTURA-AGENTES.md
│
├── 📁 backend/ (Backend planeado - no implementado)
├── 📁 BD/ (Estructura de base de datos)
│
├── 📄 index.html (Entry point original)
├── 📄 index-old.html (backup)
├── 📄 index-futurista.html (versión experimental)
│
├── 📄 package.json
├── 📄 tailwind.config.js
├── 📄 postcss.config.js
├── 📄 vite.config.js
└── 📄 README.md
```

### **Archivos Clave:**

| Archivo | Descripción | Líneas |
|---------|-------------|--------|
| `src/main-backup.js` | ⭐ **VERSION COMPLETA** - Sistema funcionando con todos los módulos, agentes, permisos y formularios | 3269 |
| `src/main.js` | Versión original del último commit Git (básica) | 154 |
| `src/agentes/moduloUnificadoVentasSimple.js` | Módulo de Centro de Ventas (funcional) | ~500 |
| `src/agentes/agenteEquipos.js` | Formulario de gestión de equipos móviles | ~353 |
| `docs/ARQUITECTURA-AGENTES.md` | Documentación de la arquitectura modular | - |

---

---

## 🎯 **Roadmap y Estado Actual**

### **✅ Completado**
- [x] Frontend base con Vite + Vanilla JS
- [x] Sistema de permisos de 4 niveles (CREATOR, ADMIN, AGENT, BASIC)
- [x] 26 módulos con control de acceso
- [x] Menú lateral con navegación jerárquica
- [x] Submódulos de Gestión (15 submódulos)
- [x] Formulario completo de Vendedores (CRUD)
- [x] Formulario completo de Equipos (CRUD)
- [x] Dashboard con estadísticas
- [x] Módulo Centro de Ventas (modular)
- [x] Arquitectura de agentes JavaScript modulares
- [x] Tailwind CSS configurado y funcionando
- [x] Git repository configurado (GitHub: Gabrielspr25/TangoUI)

### **🚧 En Desarrollo**
- [ ] Formularios de los 24 módulos restantes
- [ ] Conexión a backend (API REST)
- [ ] Base de datos (PostgreSQL/MongoDB)
- [ ] Autenticación y sesiones de usuario
- [ ] Sistema de roles dinámico
- [ ] Dashboard con datos reales (actualmente mock data)

### **📅 Planeado (Futuro)**
- [ ] APIs de IA (OpenAI/LLM) para asistentes inteligentes
- [ ] Sistema de notificaciones en tiempo real
- [ ] Reportes exportables (PDF, Excel)
- [ ] Multi-tenancy (múltiples empresas)
- [ ] Aplicación móvil (React Native)
- [ ] Deploy en Digital Ocean
- [ ] CI/CD con GitHub Actions
- [ ] Testing automatizado (Jest, Vitest)

---

## 🐛 **Troubleshooting**

### **Problema: "ERR_CONNECTION_REFUSED"**
**Causa:** El servidor Vite no está corriendo  
**Solución:**
```bash
npm run dev
```

### **Problema: "Identifier already declared"**
**Causa:** Caché del navegador  
**Solución:**
```bash
# Hard refresh en navegador:
CTRL + SHIFT + R (Windows/Linux)
CMD + SHIFT + R (Mac)
```

### **Problema: Página en blanco**
**Causa:** Error en main.js  
**Solución:**
```bash
# Abrir consola del navegador (F12)
# Ver error específico en Console
# Verificar que index.html apunta a main.js correcto
```

### **Restaurar versión estable:**
```bash
git restore src/main.js
git restore index.html
npm run dev
```

---

## 📚 **Documentación Adicional**

### **Carpeta `/docs`:**
- `ARQUITECTURA-AGENTES.md` - Documentación de arquitectura modular
- `Resumen_Completo_Sistema.pdf` - Resumen completo del proyecto
- `Propuesta_Tecnica_Asistente_IA_SSGroup.pdf` - Propuesta técnica oficial

### **PDFs en raíz:**
- `Resumen_Completo_Sistema_Explicado.pdf`
- `Resumen_Sistema_Ventas.pdf`
- `Proyecto_SistemaClaro_ResumenCompleto.pdf`

---

## 👥 **Equipo de Desarrollo**

- **🎯 Director de Proyecto:** Gabriel (CREATOR - Acceso total)
- **💻 Desarrollador Principal:** Gabriel Spr
- **🤖 Asistente IA:** GitHub Copilot
- **📊 Cliente:** SSGroup (Sistema Claro Puerto Rico)

---

## 📄 **Licencia y Confidencialidad**

**Estado:** ✅ Proyecto privado - SSGroup  
**Repositorio:** GitHub privado (Gabrielspr25/TangoUI)  
**Confidencialidad:** Sistema propietario para uso exclusivo de SSGroup

---

## 🔗 **Enlaces Importantes**

- **Repositorio Git:** https://github.com/Gabrielspr25/TangoUI
- **Servidor Local:** http://localhost:5173/
- **Documentación:** `/docs/ARQUITECTURA-AGENTES.md`

---

## 📞 **Contacto y Soporte**

Para preguntas técnicas o soporte:
- **Email:** gabriel@tangoui.com
- **GitHub:** @Gabrielspr25

---

**Última actualización:** 30 de Noviembre, 2025  
**Versión del Sistema:** 1.0.0 (En desarrollo activo)  
**Estado del Proyecto:** 🟢 Activo