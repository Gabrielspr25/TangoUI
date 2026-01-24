# 🔒 SISTEMA CLARO - REGLAS Y

 CONFIGURACIÓN DEL PROYECTO
**Sistema SaaS Multi-Usuario de Gestión de Ventas para Claro Puerto Rico**

---

## 📌 INFORMACIÓN DEL PROYECTO

**Nombre:** Sistema Claro - TangoUI  
**Cliente:** SSGroup (Claro Puerto Rico)  
**Tipo:** Sistema SaaS Multi-Usuario  
**Tecnología:** Vite + Vanilla JavaScript + Tailwind CSS  
**Base de Datos:** PostgreSQL  
**Versión Actual:** **2.3.0** (23 de Enero, 2026)  
**Clasificación:** 🔒 CONFIDENCIAL

---

## 📋 REGLAS DE VERSIONADO

### **Sistema de Versiones: MAYOR.MENOR.PARCHE**

- **MAYOR (2.x.x):** Cambios arquitectónicos importantes o nuevos sistemas
  - Ejemplo: Implementación completa del Sistema de Agentes IA
  
- **MENOR (x.1.x):** Nuevas funcionalidades o módulos
  - Ejemplo: Agregar nuevo agente, nueva pantalla
  
- **PARCHE (x.x.1):** Correcciones de bugs o mejoras menores
  - Ejemplo: Fix de validaciones, ajustes de estilos

### **Ante CADA cambio significativo:**
1. ✅ Actualizar este archivo con nueva versión
2. ✅ Documentar los cambios realizados
3. ✅ Hacer build del proyecto
4. ✅ Desplegar al servidor si es necesario
5. ✅ Actualizar README.md si aplica

---

## 📜 HISTORIAL DE VERSIONES

### **Versión 2.3.0** - 23 de Enero, 2026
**🤖 SISTEMA DE PERSONALIZACIÓN + PANEL DE AGENTES IA COMPLETO**

**Cambios Mayores:**
- ✅ **Sistema de Temas** - Dark/Light mode con toggle funcional
- ✅ **Paleta de Colores** -  6 paletas profesionales (gris, gris claro, azul, verde, rojo, morado)
- ✅ **Control de Intensidad** - 2 sliders independientes (fondo 50-950, elementos 100-900)
- ✅ **Contraste Automático** - Texto se ajusta según fondo (auto/claro/oscuro)
- ✅ **Panel Agentes IA** - 17 agentes con reglas, tareas y progreso
- ✅ **Centro de Control vs Agentes** - Separados correctamente
- ✅ **CRUD Equipos** - Interfaz completa funcional (nombre, código, costo, externo)
- ✅ **CRUD Usuarios** - 13 campos + alertas + recargas (gestión completa)

**Módulos Actualizados:**
- `agentesIA` - NUEVO módulo exclusivo CREATOR con 17 agentes
- `centroControl` - Ahora accesible para CREATOR y ADMIN (sin aviso confidencial)
- `personalizacion` - Sistema completo de temas y paletas

**Centro de Control - 6 Tabs:**
1. 📱 Gestión de Equipos (CRUD funcional)
2. 💰 Gestión de Comisiones
3. 👥 Gestión de Usuarios (CRUD completo con 13 campos)
4. 📋 Gestión de Planes
5. 🧾 Gestión de IVU
6. 📄 Tipos de Contratos

**Panel Agentes IA - 17 Agentes:**
- 2 Activos | 7 En Desarrollo | 8 Planificados
- Progreso Global: 31%
- Estadísticas en tiempo real
- Clasificados por fase (Crítico/Importante/Complementario/Avanzado)
- Cada agente muestra: progreso, estado, reglas, tareas
- PREPARADO para modal editable (siguiente versión)

**Archivos Creados:**
- `src/agentesData.js` - Datos completos de 17 agentes con reglas y tareas

**Build:**
- 📦 **39.70 KB** (vs 34.67 KB anterior)
- ⚡ **Build en 1.46s**
- 🎯 **FUNCIONANDO** en http://104.236.211.88

---

### **Versión 2.2.0** - 23 de Enero, 2026
**🔄 RESETEO FRONTEND - SIMPLIFICACIÓN COMPLETA**

**Cambios Mayores:**
- ✅ **Eliminado React** - Frontend ahora es HTML/JS vanilla
- ✅ **Eliminado src/ completo** - Reinicio desde cero
- ✅ **Sistema simplificado** - Sin complejidad innecesaria
- ✅ **Tailwind CDN** - Sin compilación CSS
- ✅ **Centro de Control integrado** - Visible en menú lateral
- ✅ **Logo con versión visible** - v2.2.0 siempre visible

**Archivos Conservados:**
- `docs/` - Toda documentación intacta
- `BD/` - Análisis BD legacy (328 tablas)
- `backend/` - Toda lógica del sistema
- `.agent/rules/` - Reglas del proyecto
- Scripts de deploy

**Archivos Recreados:**
- `index.html` - HTML limpio con Tailwind CDN
- `src/main.js` - JavaScript vanilla, sin dependencias
- `vite.config.js` - Configuración simplificada

**Build:**
- 📦 **6.41 KB** total (vs 211 KB anterior)
- ⚡ **Build en 1.39s** (vs 3+ segundos)
- 🎯 **FUNCIONANDO** en http://104.236.211.88

---

### **Versión 2.1.0** - 23 de Enero, 2026
**🗄️ ANÁLISIS BD LEGACY COMPLETADO**

**Cambios Mayores:**
- ✅ **Conexión exitosa a BD Legacy** (167.99.12.125)
- ✅ **Análisis completo de 328 tablas** del sistema legacy claropr
- ✅ **Documentación completa** de estructura, relaciones y datos
- ✅ Creado wrapper para integración de Centro de Control

**Archivos Creados:**
- `backend/scripts/explore-legacy-db.js` - Script de análisis de BD
- `docs/BD-LEGACY-CLAROPR.md` - Documentación completa (205 KB, 328 tablas)
- `BD/legacy-schema-claropr.json` - Datos estructurados en JSON
- `src/agentes/centroControlWrapper.js` - Wrapper de integración

**Archivos Eliminados:**
- `docs/BD-LEGACY-CLARO-PR.md` - Archivo vacío del primer intento
- `BD/legacy-schema-analysis.json` - JSON de BD postgres vacía

**BD Legacy Analizada:**
- 📊 **328 tablas** documentadas
- 🔗 **Foreign Keys** mapeadas
- 📈 **98,238 registros** en ventaproductoitem
- 💰 **64,063 registros** en ventaproducto
- 👥 **9,892 registros** en clientecredito

**Tablas Críticas Identificadas:**
- `venta`, `ventaproducto`, `ventaproductoitem`
- `vendedor`, `clientecredito`
- `equipos`, `comisiones`
- `activaciones`, `subsidios`

---

### **Versión 2.0.0** - 23 de Enero, 2026
**🎯 LANZAMIENTO SISTEMA DE AGENTES IA**

**Cambios Mayores:**
- ✅ Implementado **Sistema de Agentes IA** completo
- ✅ Creado **Centro de Control de Agentes** (pantalla privada CREATOR)
- ✅ Documentación completa de 17 agentes necesarios
- ✅ Integración del CentroControlAgentes.jsx en sistema

**Archivos Creados:**
- `src/agentes/CentroControlAgentes.jsx` - Panel privado de control
- `docs/AGENTES-CLARO-PR.md` - Documentación técnica completa
- `docs/LISTA-AGENTES.md` - Resumen ejecutivo de agentes
- `.agent/rules/sistema-claro.md` - Este archivo

**Archivos Modificados:**
- `src/main.js` - Agregado módulo centroControl
- `deploy.sh` - Corregida ruta del servidor
- `deploy.ps1` - Script PowerShell mejorado
- `deploy-simple.ps1` - Script de deploy simplificado

**Agentes Documentados: 17**
- 🔴 Críticos: 4 (Equipos, Ventas, Comisiones, Inventario)
- 🟡 Importantes: 4 (Activaciones, Vendedores, Subsidios, Metas)
- 🟢 Complementarios: 5 (Reportes, Cambios, Clientes, Validación, Productos)
- 🔵 Avanzados: 4 (Documentos, Administración, Permisos, Personal IA)

**Deploy:**
- ✅ Deploy exitoso a http://104.236.211.88
- ✅ Build optimizado (153 KB total)

---

### **Versión 1.5.0** - 22 de Enero, 2026
**Mejoras en Agentes Existentes**

**Cambios:**
- Actualización de AgenteEquipos.jsx
- Mejoras en AgenteInventario.jsx
- Ajustes en main.js para tareas de agentes

---

### **Versión 1.0.0** - Noviembre, 2025
**Lanzamiento Inicial**

**Funcionalidades Base:**
- Sistema de permisos (4 niveles)
- 26 módulos funcionales
- Dashboard principal
- Menú lateral con navegación
- Formularios de gestión

---

## 🔐 REGLAS DE CONFIDENCIALIDAD

### **Niveles de Acceso:**

1. **CREATOR (Gabriel)** - Acceso Total
   - ✅ Todos los módulos (27/27)
   - ✅ Centro de Control de Agentes IA
   - ✅ Configuraciones del sistema
   - ✅ Documentación confidencial
   
2. **ADMIN** - Gestión Operativa
   - ✅ 21/27 módulos
   - 🚫 NO acceso a Centro de Control
   - 🚫 NO acceso a configuraciones críticas
   
3. **AGENT** - Ventas y Operaciones
   - ✅ 14/27 módulos
   - 🚫 NO acceso a gestión
   
4. **BASIC** - Acceso Básico
   - ✅ 2/27 módulos
   - 🚫 Solo lectura

### **Módulos CONFIDENCIALES (Solo CREATOR):**
- 🔒 Centro de Control de Agentes IA (`centroControl`)
- 🔒 Agentes IA (`agentesIA`)
- 🔒 Administración (`administracion`)
- 🔒 Permisos (`permisos`)
- 🔒 Documentos Admin (`documentosAdmin`)
- 🔒 Conciliación de Comisiones (`conciliacionComisiones`)

---

## 🎯 REGLAS DE DESARROLLO

### **1. Arquitectura de Agentes**
- Cada agente es un archivo JSX independiente en `src/agentes/`
- Cada agente tiene **reglas de negocio específicas** documentadas
- Seguir el patrón establecido en `CentroControlAgentes.jsx`

### **2. Sistema de Permisos**
- **SIEMPRE** verificar permisos antes de renderizar
- Usar `hasPermission(module)` antes de mostrar cualquier contenido
- **NUNCA** exponer módulos confidenciales a usuarios no autorizados

### **3. Gestión de Estado**
- Usuario actual en `currentUser`
- Módulo activo en `currentModule`
- Submódulo en `currentSubmodule`

### **4. Navegación**
- Usar función `navegarA(module, submodule)`
- Actualizar documento al navegar
- Cargar datos específicos del módulo

### **5. Validación de Datos**
- Validar ANTES de guardar
- Mensajes de error claros
- Feedback visual inmediato

---

## 📦 REGLAS DE DEPLOY

### **Antes de Desplegar:**
1. ✅ Hacer `npm run build`
2. ✅ Verificar que no hay errores
3. ✅ Probar localmente con `npm run dev`
4. ✅ Actualizar versión en este archivo
5. ✅ Documentar cambios

### **Deploy al Servidor:**
```powershell
# Opción 1: Script simplificado
.\deploy-simple.ps1

# Opción 2: Script completo
.\deploy.ps1 -DropletIP "104.236.211.88"

# Opción 3: Bash
bash deploy.sh 104.236.211.88
```

### **Post-Deploy:**
1. ✅ Verificar que la app carga en http://104.236.211.88
2. ✅ Probar login y navegación
3. ✅ Verificar permisos funcionando
4. ✅ Documentar versión desplegada

---

## 🗂️ ESTRUCTURA DEL PROYECTO

```
sistema-claro/
├── .agent/
│   ├── rules/
│   │   └── sistema-claro.md          ← ESTE ARCHIVO
│   └── workflows/
├── src/
│   ├── agentes/
│   │   ├── CentroControlAgentes.jsx  ← NUEVO (v2.0.0)
│   │   ├── AgenteEquipos.jsx
│   │   ├── AgentePersonal.jsx
│   │   ├── AgenteInventario.jsx
│   │   ├── AgenteActivaciones.jsx
│   │   ├── AgenteSubsidios.jsx
│   │   ├── AgenteCambios.jsx
│   │   ├── AgenteComisiones.jsx
│   │   ├── agentsConfig.js
│   │   └── agentTasks.js
│   ├── main.js                       ← Núcleo del sistema
│   └── style.css
├── docs/
│   ├── AGENTES-CLARO-PR.md           ← NUEVO (v2.0.0)
│   ├── LISTA-AGENTES.md              ← NUEVO (v2.0.0)
│   └── ARQUITECTURA-AGENTES.md
├── backend/
│   ├── migrations/
│   ├── src/
│   └── .env
├── deploy.sh
├── deploy.ps1                        ← Actualizado (v2.0.0)
├── deploy-simple.ps1                 ← NUEVO (v2.0.0)
├── package.json
└── README.md
```

---

## 🔄 WORKFLOW DE TRABAJO

### **Para Nuevas Funcionalidades:**
1. Documentar en archivo correspondiente
2. Crear/modificar archivos necesarios
3. Probar localmente
4. Actualizar versión MENOR (x.Y.x)
5. Hacer commit a Git
6. Desplegar si es necesario

### **Para Correcciones:**
1. Identificar el bug
2. Corregir código
3. Probar
4. Actualizar versión PARCHE (x.x.Y)
5. Hacer commit
6. Desplegar

### **Para Cambios Mayores:**
1. Planificar arquitectura
2. Documentar completamente
3. Implementar por fases
4. Testing exhaustivo
5. Actualizar versión MAYOR (X.x.x)
6. Documentar todo
7. Desplegar con cuidado

---

## 📊 ROADMAP ACTUAL

### **Sprint 1 (En Curso)** - Agentes Críticos
- [ ] Completar Agente de Equipos (75% → 100%)
- [ ] Desarrollar Agente de Ventas (45% → 100%)
- [ ] Implementar Agente de Comisiones (20% → 80%)
- [ ] Finalizar Agente de Inventario (60% → 100%)

### **Sprint 2** - Agentes Importantes
- [ ] Agente de Activaciones
- [ ] Agente de Vendedores
- [ ] Agente de Subsidios
- [ ] Agente de Metas

### **Sprint 3** - Agentes Complementarios
- [ ] Agente de Reportes
- [ ] Agente de Clientes
- [ ] Agente de Validación
- [ ] Agente de Productos

### **Sprint 4** - Agentes Avanzados e IA
- [ ] Agente Personal IA
- [ ] Agente de Permisos
- [ ] Agente de Administración

---

## 🚨 REGLAS CRÍTICAS

### **⚠️ NUNCA:**
- ❌ Exponer datos confidenciales a usuarios no autorizados
- ❌ Desplegar sin probar
- ❌ Modificar main.js sin backup
- ❌ Cambiar permisos sin documentar
- ❌ Compartir credenciales o llaves SSH
- ❌ **Hablar de cache del navegador** (Gabriel trabaja en incógnito SIEMPRE)

### **✅ SIEMPRE:**
- ✅ Verificar permisos antes de renderizar
- ✅ Validar datos antes de guardar
- ✅ Documentar cambios importantes
- ✅ Hacer backup antes de cambios mayores
- ✅ Probar localmente antes de deploy

---

## 📞 CONTACTO Y SOPORTE

**Desarrollador Principal:** Gabriel  
**Email:** gabriel@tangoui.com  
**Servidor:** http://104.236.211.88  
**Base de Datos:** PostgreSQL (localhost:5432/UI)

---

## 📝 NOTAS ADICIONALES

- Este archivo debe actualizarse con CADA cambio significativo
- La versión en este archivo es la fuente de verdad
- Mantener sincronizado con README.md
- Documentar TODAS las decisiones arquitectónicas importantes

---

**Última actualización de este archivo:** 23 de Enero, 2026  
**Próxima revisión programada:** Al completar Sprint 1  
**Estado del Proyecto:** 🟢 Activo - En Desarrollo
