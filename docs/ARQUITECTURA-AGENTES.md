# 🏗️ ARQUITECTURA DE AGENTES - TANGO UI
**Fecha:** 9 de Noviembre, 2025  
**Ingeniero:** Gabriel  
**Documento de Respaldo para Reorganización**

---

## 📋 **ESTRUCTURA ACTUAL DETECTADA**

### **Módulos Principales Identificados:**
1. **Dashboard** 📊
2. **Gestión** ⚙️ (33 submódulos)
3. **Contratos** 📄
4. **Reportes** 📈
5. **Agentes IA** 🤖

### **Submódulos de Gestión Actuales:**
#### **VENTAS Y OPERACIONES**
- Generar Venta 🛒
- Pymes 🏪
- Activaciones 📱
- Inventario 📦
- Accesorios 🎧

#### **GESTIÓN ADMINISTRATIVA**
- Comisiones 💰
- Vendedores 👥
- Equipos 📱
- Productos 📦
- Usuarios 👤

#### **CONFIGURACIÓN Y CONTROL**
- Tipo de Plan 📋
- Tiendas 🏪
- Puntos Vendedor 🎯
- Ponche ⏰
- Consulta Meses 📅
- Documentos 📄

#### **ADMINISTRACIÓN AVANZADA**
- Administración ⚙️
- Permisos 🔐
- Documentos Administrador 📋

---

## 🎯 **NUEVA ESTRUCTURA PROPUESTA**

```
/src
  /agentes/
    /gestion/
      AgenteEquipos.jsx          ✅ (Ya implementado en main.js)
      AgenteComisiones.jsx       🔄 (Por crear)
      AgenteMAC.jsx              🔄 (Por crear)
      AgenteVendedores.jsx       🔄 (Por crear)
      AgentePuntos.jsx           🔄 (Por crear)
      AgenteProductos.jsx        🔄 (Por crear)
      AgenteUsuarios.jsx         🔄 (Por crear)
      AgentePermisos.jsx         🔄 (Por crear)
      AgenteDocumentos.jsx       🔄 (Por crear)
    
    /inventario/
      AgenteTienda.jsx           🔄 (Por crear)
      AgenteInventario.jsx       🔄 (Por crear) 
      AgenteAccesorios.jsx       🔄 (Por crear)
      AgenteStock.jsx            🔄 (Por crear)
    
    /ventas/
      AgenteGeneracionVenta.jsx  🔄 (Por crear)
      AgentePymes.jsx            🔄 (Por crear)
      AgenteActivaciones.jsx     🔄 (Por crear)
      AgenteProcesamiento.jsx    🔄 (Por crear)
      AgenteSeguimiento.jsx      🔄 (Por crear)
    
    /reportes/
      AgenteAnalytics.jsx        🔄 (Por crear)
      AgenteDashboard.jsx        🔄 (Por crear)
      AgenteEstadisticas.jsx     🔄 (Por crear)
    
    /configuracion/
      AgenteTipoPlan.jsx         🔄 (Por crear)
      AgenteConfiguracion.jsx    🔄 (Por crear)
      AgenteAdministracion.jsx   🔄 (Por crear)
    
  /components/
    /ui/
      Button.jsx                 🔄 (Por crear)
      Input.jsx                  🔄 (Por crear)
      Select.jsx                 🔄 (Por crear)
      Modal.jsx                  🔄 (Por crear)
      Card.jsx                   🔄 (Por crear)
      Table.jsx                  🔄 (Por crear)
    
    /forms/
      FormEquipo.jsx             🔄 (Por extraer de main.js)
      FormVendedor.jsx           🔄 (Por extraer de main.js)
      FormVenta.jsx              🔄 (Por extraer de main.js)
    
  /layouts/
    Sidebar.jsx                  🔄 (Por extraer de main.js)
    Header.jsx                   🔄 (Por extraer de main.js)
    Layout.jsx                   🔄 (Por crear)
  
  /utils/
    api.js                       🔄 (Por extraer de main.js)
    permissions.js               🔄 (Por extraer de main.js)
    notifications.js             🔄 (Por extraer de main.js)
  
  App.jsx                        🔄 (Por crear como componente principal)
  main.jsx                       🔄 (Por crear como punto de entrada React)
```

---

## 📊 **ANÁLISIS DE MIGRACIÓN**

### **Funcionalidades Actuales a Migrar:**
1. **Sistema de Permisos** (USER_TYPES, currentUser) → `/utils/permissions.js`
2. **Gestión de Equipos** (Completo con CRUD) → `/agentes/gestion/AgenteEquipos.jsx`
3. **Navegación y Sidebar** → `/layouts/Sidebar.jsx`
4. **Dashboard Principal** → `/agentes/reportes/AgenteDashboard.jsx`
5. **Formularios** → `/components/forms/`
6. **APIs y Backend** → `/utils/api.js`

### **Componentes UI a Estandarizar:**
- Botones (primarios, secundarios, danger)
- Inputs (text, number, select, textarea)
- Modales (confirmación, formularios)
- Tarjetas (dashboard, listados)
- Tablas (con paginación, filtros)
- Notificaciones (success, error, warning)

---

## 🔧 **PLAN DE IMPLEMENTACIÓN**

### **FASE 1: Estructura Base** (1-2 horas)
1. Crear estructura de carpetas
2. Migrar utils y helpers
3. Crear componentes UI básicos
4. Configurar layouts principales

### **FASE 2: Migración de Agentes** (2-3 horas)
1. **AgenteEquipos.jsx** (migrar funcionalidad existente)
2. **AgenteDashboard.jsx** (dashboard principal)
3. **AgenteVendedores.jsx** (gestión de vendedores)
4. **AgenteGeneracionVenta.jsx** (ventas)

### **FASE 3: Agentes Restantes** (3-4 horas)
1. Completar agentes de /gestion/
2. Implementar agentes de /inventario/
3. Crear agentes de /reportes/
4. Configurar agentes de /configuracion/

### **FASE 4: Testing y Optimización** (1 hora)
1. Verificar funcionalidad completa
2. Optimizar rendimiento
3. Documentación de componentes

---

## 🎯 **AGENTES FALTANTES IDENTIFICADOS**

### **Críticos (Funcionalidad Base):**
- **AgenteComisiones.jsx** - Gestión de comisiones de vendedores
- **AgenteVendedores.jsx** - CRUD completo de vendedores
- **AgenteTienda.jsx** - Gestión de múltiples tiendas
- **AgenteGeneracionVenta.jsx** - Proceso completo de ventas

### **Importantes (Gestión Avanzada):**
- **AgenteMAC.jsx** - Control de direcciones MAC de dispositivos
- **AgentePuntos.jsx** - Sistema de puntuación de vendedores
- **AgenteProductos.jsx** - Catálogo de productos
- **AgentePermisos.jsx** - Control de accesos y roles

### **Complementarios (Funcionalidad Extendida):**
- **AgenteAnalytics.jsx** - Reportes y análisis avanzados
- **AgenteInventario.jsx** - Control de stock avanzado
- **AgenteConfiguracion.jsx** - Configuraciones del sistema
- **AgenteActivaciones.jsx** - Proceso de activación de servicios

---

## 💡 **RECOMENDACIONES DEL INGENIERO**

1. **Empezar con la estructura base** antes de migrar código
2. **Usar React + TypeScript** para mejor mantenimiento
3. **Implementar lazy loading** para los agentes
4. **Crear sistema de rutas** con React Router
5. **Documentar cada agente** con sus responsabilidades

---

## ✅ **CHECKLIST DE VALIDACIÓN**

- [ ] Estructura de carpetas creada
- [ ] Componentes UI base implementados
- [ ] Layouts extraídos y funcionando
- [ ] Utils migrados correctamente
- [ ] AgenteEquipos migrado (funcionalidad crítica)
- [ ] Navegación funcionando
- [ ] Sistema de permisos operativo
- [ ] Backend integrado correctamente

---

**🔥 ¿LISTO PARA EMPEZAR LA REORGANIZACIÓN?**