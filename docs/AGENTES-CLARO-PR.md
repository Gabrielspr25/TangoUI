# 🤖 SISTEMA DE AGENTES IA - CLARO PR
**Documento de Arquitectura de Agentes Inteligentes**  
**Fecha:** 23 de Enero, 2026  
**Proyecto:** Sistema Claro - TangoUI  
**Confidencialidad:** 🔒 SOLO CREATOR (Gabriel) - NO VISIBLE PARA DEALERS

---

## 📊 ANÁLISIS DE BASE DE DATOS CLARO PR

### **Tablas Principales Identificadas:**

Basado en las migraciones y estructura del backend:

1. **dispositivos** - Equipos móviles (smartphones, tablets)
2. **equipos** - Equipos de trabajo
3. **vendedores** - Gestión de vendedores
4. **ventas** - Transacciones de venta
5. **metas** - Objetivos de venta
6. **comisiones** - Cálculo de comisiones
7. **productos** - Catálogo de productos
8. **activaciones** - Activaciones de servicios
9. **inventario** - Control de stock
10. **clientes** - Base de clientes
11. **tiendas** - Múltiples ubicaciones
12. **usuarios** - Sistema de acceso
13. **permisos** - Control de roles
14. **reportes** - Analítica de datos
15. **subsidios** - Programas de subsidio

---

## 🎯 AGENTES NECESARIOS - CLASIFICACIÓN POR PRIORIDAD

### **🔴 CRÍTICOS (Implementar Primero - Fase 1)**

#### **1. Agente de Equipos** 📱
- **Responsabilidad:** Gestión completa de dispositivos móviles
- **Tablas:** `dispositivos`, `equipos`
- **Funciones:**
  - CRUD de equipos (crear, leer, actualizar, eliminar)
  - Validación de IMEI (15-20 dígitos)
  - Asignación a vendedores
  - Control de estados (activo, inactivo, mantenimiento, perdido, dañado)
  - Sincronización con Excel (Equipos.xls)
  - Tracking de historial de cambios
- **Reglas de Negocio:**
  - IMEI único obligatorio
  - Validar que el equipo no esté ya asignado
  - Registrar fecha de adquisición y asignación
  - Control de equipos externos vs empresa
  - Cálculo automático de costos
- **Estado Actual:** ✅ Parcialmente implementado (`AgenteEquipos.jsx`, `agenteEquipos.js`)

#### **2. Agente de Ventas** 🛒
- **Responsabilidad:** Proceso completo de generación de ventas
- **Tablas:** `ventas`, `productos`, `clientes`, `comisiones`
- **Funciones:**
  - Creación de nuevas ventas
  - Selección de productos/planes
  - Validación de disponibilidad
  - Cálculo automático de precios
  - Generación de comisiones
  - Envío a sistema de activación
- **Reglas de Negocio:**
  - Validar stock antes de vender
  - Cálculo de comisiones según tipo de producto
  - Registro de vendedor y tienda
  - Generación de número de venta único
  - Estado de venta (pendiente, completada, cancelada)
- **Estado Actual:** 🔄 Por implementar completamente

#### **3. Agente de Comisiones** 💰
- **Responsabilidad:** Cálculo y gestión de comisiones
- **Tablas:** `comisiones`, `ventas`, `vendedores`, `metas`
- **Funciones:**
  - Cálculo automático por venta
  - Diferentes tipos de comisión (fijo, móvil, accesorios)
  - Validación de cumplimiento de metas
  - Generación de reportes de comisiones
  - Conciliación de pagos
- **Reglas de Negocio:**
  - Comisión varía según tipo de producto
  - Bonos por cumplimiento de metas
  - Penalizaciones por cancelaciones
  - Comisión de empresa vs comisión de vendedor
  - Corte mensual de comisiones
- **Estado Actual:** 🔄 Por implementar

#### **4. Agente de Inventario** 📦
- **Responsabilidad:** Control de stock y disponibilidad
- **Tablas:** `inventario`, `productos`, `dispositivos`, `tiendas`
- **Funciones:**
  - Control de entradas y salidas
  - Alertas de stock bajo
  - Transferencias entre tiendas
  - Reportes de inventario
  - Valorización de stock
- **Reglas de Negocio:**
  - Stock mínimo por producto
  - Restricción de venta sin stock
  - Trazabilidad de movimientos
  - Inventario por tienda
  - Auditoría de diferencias
- **Estado Actual:** ✅ Parcialmente implementado (`AgenteInventario.jsx`)

---

### **🟡 IMPORTANTES (Fase 2)**

#### **5. Agente de Activaciones** 📱
- **Responsabilidad:** Proceso de activación de servicios
- **Tablas:** `activaciones`, `ventas`, `clientes`
- **Funciones:**
  - Registro de activaciones
  - Validación de documentos
  - Seguimiento de estado
  - Integración con sistema Claro
- **Reglas de Negocio:**
  - Requiere venta aprobada
  - Validación de identidad del cliente
  - Estados: pendiente, en proceso, activado, rechazado
  - Tiempo límite de activación (48-72 horas)
- **Estado Actual:** ✅ Parcialmente implementado (`AgenteActivaciones.jsx`)

#### **6. Agente de Vendedores** 👥
- **Responsabilidad:** Gestión de vendedores y equipos de venta
- **Tablas:** `vendedores`, `usuarios`, `tiendas`, `metas`
- **Funciones:**
  - CRUD de vendedores
  - Asignación a tiendas
  - Configuración de metas
  - Perfiles y permisos
  - Historial de desempeño
- **Reglas de Negocio:**
  - Vendedor único por usuario
  - Asignación a una tienda principal
  - Metas mensuales configurables
  - Control de vendedores activos/inactivos
- **Estado Actual:** 🔄 En backend (`vendedores.js`)

#### **7. Agente de Subsidios** 💵
- **Responsabilidad:** Gestión de programas de subsidio
- **Tablas:** `subsidios`, `ventas`, `productos`
- **Funciones:**
  - Aplicación de subsidios a ventas
  - Validación de elegibilidad
  - Cálculo de descuentos
  - Reportes de subsidios aplicados
- **Reglas de Negocio:**
  - Subsidio según tipo de plan
  - Limitaciones por cliente
  - Fecha de vigencia del subsidio
  - Aprobación requerida para montos altos
- **Estado Actual:** ✅ Parcialmente implementado (`AgenteSubsidios.jsx`)

#### **8. Agente de Metas** 🎯
- **Responsabilidad:** Configuración y seguimiento de objetivos
- **Tablas:** `metas`, `vendedores`, `ventas`
- **Funciones:**
  - Creación de metas mensuales
  - Seguimiento de progreso
  - Alertas de cumplimiento
  - Dashboard de metas
- **Reglas de Negocio:**
  - Metas por vendedor y/o tienda
  - Diferentes métricas (cantidad, valor, activaciones)
  - Revisión mensual
  - Bonos por sobrecumplimiento
- **Estado Actual:** 🔄 En backend (`metas.js`)

---

### **🟢 COMPLEMENTARIOS (Fase 3)**

#### **9. Agente de Reportes** 📊
- **Responsabilidad:** Generación de reportes y analítica
- **Tablas:** TODAS (lectura)
- **Funciones:**
  - Reportes de ventas
  - Análisis de comisiones
  - Dashboard ejecutivo
  - Exportación a PDF/Excel
- **Reglas de Negocio:**
  - Permisos por nivel de usuario
  - Datos en tiempo real
  - Filtros personalizables
- **Estado Actual:** 🔄 Por implementar

#### **10. Agente de Cambios** 🔄
- **Responsabilidad:** Gestión de cambios y devoluciones
- **Tablas:** `cambios`, `ventas`, `inventario`
- **Funciones:**
  - Registro de cambios
  - Devoluciones
  - Ajuste de inventario
  - Ajuste de comisiones
- **Reglas de Negocio:**
  - Plazo de cambio (7-14 días)
  - Motivo de cambio obligatorio
  - Afecta comisión del vendedor
  - Reingreso a inventario
- **Estado Actual:** ✅ Parcialmente implementado (`AgenteCambios.jsx`)

#### **11. Agente de Clientes** 👤
- **Responsabilidad:** Base de datos de clientes
- **Tablas:** `clientes`, `ventas`, `activaciones`
- **Funciones:**
  - CRUD de clientes
  - Historial de compras
  - Validación de documentos
  - Segmentación de clientes
- **Reglas de Negocio:**
  - Documento único (SSN/TaxID)
  - Datos obligatorios por ley
  - Privacidad de información
  - Consentimiento de datos
- **Estado Actual:** 🔄 Por implementar

#### **12. Agente de Validación** ✅
- **Responsabilidad:** Validación de datos y reglas de negocio
- **Tablas:** TODAS
- **Funciones:**
  - Validación de formularios
  - Check de reglas de negocio
  - Prevención de duplicados
  - Validación de integridad
- **Reglas de Negocio:**
  - Validar antes de guardar
  - Mensajes de error claros
  - Sugerencias de corrección
  - Log de validaciones fallidas
- **Estado Actual:** 🔄 Por implementar

#### **13. Agente de Productos** 📦
- **Responsabilidad:** Catálogo de productos y servicios
- **Tablas:** `productos`, `planes`, `precios`
- **Funciones:**
  - CRUD de productos
  - Gestión de precios
  - Categorización
  - Disponibilidad regional
- **Reglas de Negocio:**
  - Productos activos/inactivos
  - Precio con IVU
  - Vigencia de precios
  - Productos por región
- **Estado Actual:** 🔄 En backend

---

### **🔵 AVANZADOS (Fase 4)**

#### **14. Agente de Documentos** 📄
- **Responsabilidad:** Gestión documental
- **Tablas:** `documentos`, `ventas`, `clientes`
- **Funciones:**
  - Upload de documentos
  - Validación de documentos
  - Archivo digital
  - Búsqueda de documentos
- **Estado Actual:** 🔄 Por implementar

#### **15. Agente de Administración** ⚙️
- **Responsabilidad:** Configuraciones del sistema
- **Tablas:** `configuracion`, `parametros`
- **Funciones:**
  - Parámetros del sistema
  - Configuraciones generales
  - Mantenimiento
  - Auditoría
- **Estado Actual:** 🔄 Por implementar

#### **16. Agente de Permisos** 🔐
- **Responsabilidad:** Control de acceso y roles
- **Tablas:** `usuarios`, `permisos`, `roles`
- **Funciones:**
  - Gestión de roles
  - Asignación de permisos
  - Control de acceso
  - Auditoría de accesos
- **Estado Actual:** 🔄 Por implementar

#### **17. Agente Personal** 🤖
- **Responsabilidad:** Asistente IA personalizado
- **Tablas:** TODAS (lectura inteligente)
- **Funciones:**
  - Respuestas a consultas
  - Sugerencias inteligentes
  - Automatización de tareas
  - Predicciones y alertas
- **Estado Actual:** 🔄 Por implementar completamente

---

## 📋 RESUMEN EJECUTIVO

### **Total de Agentes Necesarios: 17**

**Distribución por Fase:**
- 🔴 **Fase 1 (CRÍTICOS):** 4 agentes
- 🟡 **Fase 2 (IMPORTANTES):** 4 agentes  
- 🟢 **Fase 3 (COMPLEMENTARIOS):** 5 agentes
- 🔵 **Fase 4 (AVANZADOS):** 4 agentes

**Estado Actual de Implementación:**
- ✅ **Implementados:** 5 agentes (29%)
- 🔄 **En desarrollo:** 7 agentes (41%)
- ❌ **Por implementar:** 5 agentes (30%)

---

## 🎯 ROADMAP DE IMPLEMENTACIÓN

### **Sprint 1 (Semana 1-2)** - CRÍTICOS
1. Completar **Agente de Equipos**
2. Implementar **Agente de Ventas**
3. Desarrollar **Agente de Comisiones**
4. Finalizar **Agente de Inventario**

### **Sprint 2 (Semana 3-4)** - IMPORTANTES
5. **Agente de Activaciones**
6. **Agente de Vendedores**
7. **Agente de Subsidios**
8. **Agente de Metas**

### **Sprint 3 (Semana 5-6)** - COMPLEMENTARIOS
9-13. Agentes complementarios

### **Sprint 4 (Semana 7-8)** - AVANZADOS
14-17. Agentes avanzados e IA

---

## 🔒 NOTA DE CONFIDENCIALIDAD

**Este documento es CONFIDENCIAL y de acceso exclusivo para:**
- Gabriel (CREATOR)
- Equipo de desarrollo autorizado

**NO debe ser compartido con:**
- Dealers
- Vendedores
- Personal operativo
- Clientes externos

---

**Última actualización:** 23 de Enero, 2026  
**Versión:** 1.0  
**Clasificación:** 🔒 CONFIDENCIAL
