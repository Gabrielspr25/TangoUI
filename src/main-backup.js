// === IMPORTACIONES ===
import './style.css'
import { getAgenteEquiposContent } from './agentes/agenteEquipos.js'
import { getModuloUnificadoVentasContent } from './agentes/moduloUnificadoVentasSimple.js'

// === SISTEMA DE USUARIOS Y PERMISOS ===
const USER_TYPES = {
  CREATOR: 'CREATOR',
  ADMIN: 'ADMIN', 
  AGENT: 'AGENT',
  BASIC: 'BASIC'
};

// Usuario actual simulado (en producción vendrá del backend)
let currentUser = {
  id: 1,
  nombre: 'Gabriel',
  email: 'gabriel@tangoui.com',
  tipo: USER_TYPES.CREATOR, // Cambiar para probar diferentes niveles
  plan: 'Enterprise',
  activo: true
};

// Base de datos de usuarios simulada
const USERS_DB = [
  {
    id: 1,
    nombre: 'Gabriel',
    email: 'gabriel@tangoui.com', 
    tipo: USER_TYPES.CREATOR,
    plan: 'Enterprise',
    activo: true,
    fechaRegistro: '2024-01-01'
  },
  {
    id: 2,
    nombre: 'Admin User',
    email: 'admin@empresa.com',
    tipo: USER_TYPES.ADMIN,
    plan: 'Pro',
    activo: true,
    fechaRegistro: '2024-01-15'
  },
  {
    id: 3,
    nombre: 'Agente Ventas',
    email: 'agente@empresa.com',
    tipo: USER_TYPES.AGENT,
    plan: 'Básico',
    activo: true,
    fechaRegistro: '2024-02-01'
  },
  {
    id: 4,
    nombre: 'Usuario Básico',
    email: 'usuario@empresa.com',
    tipo: USER_TYPES.BASIC,
    plan: 'Básico',
    activo: false,
    fechaRegistro: '2024-02-15'
  }
];

// Configuración de módulos con permisos
const MODULE_PERMISSIONS = {
  dashboard: ['CREATOR', 'ADMIN', 'AGENT', 'BASIC'],
  gestion: ['CREATOR', 'ADMIN'],
  centroVentas: ['CREATOR', 'ADMIN', 'AGENT', 'BASIC'], // Nuevo módulo unificado
  generarVenta: ['CREATOR', 'ADMIN', 'AGENT', 'BASIC'],
  pymes: ['CREATOR', 'ADMIN', 'AGENT'],
  activaciones: ['CREATOR', 'ADMIN', 'AGENT'],
  consultarBaseGeneral: ['CREATOR', 'ADMIN', 'AGENT'],
  consultarBaseFijo: ['CREATOR', 'ADMIN'],
  reportes: ['CREATOR', 'ADMIN', 'AGENT'],
  pagoFactura: ['CREATOR', 'ADMIN'],
  discrepanciasPago: ['CREATOR', 'ADMIN'],
  inventario: ['CREATOR', 'ADMIN', 'AGENT'],
  accesorios: ['CREATOR', 'ADMIN', 'AGENT'],
  documentos: ['CREATOR', 'ADMIN'],
  cuentasClientes: ['CREATOR', 'ADMIN', 'AGENT'],
  crm: ['CREATOR', 'ADMIN', 'AGENT'],
  sms: ['CREATOR', 'ADMIN'],
  fidelizacion: ['CREATOR', 'ADMIN'],
  consultaMeses: ['CREATOR', 'ADMIN'],
  ponche: ['CREATOR', 'ADMIN'],
  caja: ['CREATOR', 'ADMIN'],
  documentosAdmin: ['CREATOR'],
  conciliacionComisiones: ['CREATOR'],
  objetivosVenta: ['CREATOR', 'ADMIN'],
  administracion: ['CREATOR'],
  permisos: ['CREATOR'],
  agentesIA: ['CREATOR']
};

// Función para verificar permisos
function hasPermission(modulo) {
  const userType = currentUser.tipo;
  const allowedRoles = MODULE_PERMISSIONS[modulo];
  
  if (!allowedRoles) {
    return false; // Si no está definido, no tiene acceso
  }
  
  return allowedRoles.includes(userType);
}

// Función para obtener módulos visibles
function getVisibleModules() {
  return Object.keys(MODULE_PERMISSIONS).filter(module => hasPermission(module));
}

// Función para cambiar usuario (para testing)
// === FUNCIÓN PARA RENDERIZAR MENÚ CON PERMISOS ===
function renderMenuItems() {
  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', badge: null },
    { id: 'gestion', icon: '⚙️', label: 'Gestión', badge: '15' },
    { id: 'centroVentas', icon: '📊', label: 'Centro de Ventas', badge: 'NUEVO' },
    { id: 'generarVenta', icon: '🛒', label: 'Generar Venta', badge: null },
    { id: 'pymes', icon: '🏪', label: 'Pymes', badge: null },
    { id: 'activaciones', icon: '👥', label: 'Activaciones', badge: null },
    { id: 'consultarBaseGeneral', icon: '💰', label: 'Consultar Base General', badge: null },
    { id: 'consultarBaseFijo', icon: '💰', label: 'Consultar Base General FIJO', badge: null },
    { id: 'reportes', icon: '📈', label: 'Reportes', badge: null },
    { id: 'pagoFactura', icon: '💳', label: 'Pago Factura', badge: null },
    { id: 'discrepanciasPago', icon: '📋', label: 'Discrepancias de Pago', badge: null },
    { id: 'inventario', icon: '📦', label: 'Inventario', badge: null },
    { id: 'accesorios', icon: '🎧', label: 'Accesorios', badge: null },
    { id: 'documentos', icon: '📁', label: 'Documentos', badge: null },
    { id: 'cuentasClientes', icon: '👥', label: 'Cuentas Clientes', badge: null },
    { id: 'crm', icon: '🎯', label: 'CRM', badge: null },
    { id: 'sms', icon: '📱', label: 'SMS', badge: null },
    { id: 'fidelizacion', icon: '🏆', label: 'Programa de Fidelización', badge: null },
    { id: 'consultaMeses', icon: '📅', label: 'Consulta Meses', badge: null },
    { id: 'ponche', icon: '⏰', label: 'Ponche', badge: null },
    { id: 'caja', icon: '💳', label: 'Caja', badge: null },
    { id: 'documentosAdmin', icon: '📋', label: 'Documentos Admin', badge: null },
    { id: 'conciliacionComisiones', icon: '🔄', label: 'Conciliación', badge: null },
    { id: 'objetivosVenta', icon: '📊', label: 'Objetivos de Venta', badge: null },
    { id: 'administracion', icon: '⚙️', label: 'Administración', badge: null },
    { id: 'permisos', icon: '🔐', label: 'Permisos', badge: null },
    { id: 'agentesIA', icon: '🤖', label: 'Agentes IA', badge: 'CREATOR' }
  ];

  return menuItems
    .filter(item => hasPermission(item.id))
    .map((item, index) => {
      const activeClass = index === 0 ? ' bg-gray-700' : '';
      const badgeHtml = item.badge ? `<span class="ml-auto text-xs bg-blue-600 text-white px-2 py-1 rounded-full">${item.badge}</span>` : '';
      
      return `
        <a href="#${item.id}" onclick="navegarA('${item.id}')" 
           class="nav-item group flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors${activeClass}">
          <span class="mr-3">${item.icon}</span>
          ${item.label}
          ${badgeHtml}
        </a>
      `;
    })
    .join('');
}

// === FUNCIÓN PARA OBTENER INFO DEL USUARIO ===
function getUserInfo() {
  const totalModulos = Object.keys(MODULE_PERMISSIONS).length;
  const modulosVisibles = getVisibleModules().length;
  
  return {
    usuario: currentUser.nombre,
    tipo: currentUser.tipo,
    plan: currentUser.plan,
    totalModulos,
    modulosVisibles
  };
}

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
};

let currentModule = 'dashboard';
let currentSubmodule = null;

// === FUNCIONES DE NAVEGACIÓN ===
function navegarA(module, submodule = null) {
  currentModule = module;
  currentSubmodule = submodule;
  
  // Verificar permisos antes de navegar
  if (!hasPermission(module)) {
    const contentArea = document.querySelector('#content-area');
    contentArea.innerHTML = `
      <div class="space-y-6">
        <div class="text-center py-16">
          <div class="text-6xl mb-4">🔒</div>
          <h1 class="text-3xl font-bold text-red-400 mb-4">Acceso Denegado</h1>
          <p class="text-gray-400 mb-2">No tienes permisos para acceder a este módulo.</p>
          <p class="text-sm text-gray-500">Usuario actual: ${currentUser.nombre} (${currentUser.tipo})</p>
          <button onclick="navegarA('dashboard')" class="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
            Volver al Dashboard
          </button>
        </div>
      </div>
    `;
    return;
  }
  
  // Actualizar navegación activa
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active', 'bg-gray-700', 'text-white');
    item.classList.add('text-gray-300');
  });
  
  const activeNav = document.querySelector(`a[href="#${module}"]`);
  if (activeNav) {
    activeNav.classList.add('active', 'bg-gray-700', 'text-white');
    activeNav.classList.remove('text-gray-300');
  }
  
  // Renderizar contenido
  renderizarContenido();
  
  // Cargar datos específicos después del renderizado
  setTimeout(() => {
    if (currentSubmodule === 'vendedores') {
      cargarVendedores();
    } else if (currentSubmodule === 'equipos') {
      cargarEquipos();
    } else if (currentModule === 'dashboard' && !currentSubmodule) {
      cargarEstadisticasDashboard();
    }
  }, 100);
}

function renderizarContenido() {
  const contentArea = document.querySelector('#content-area');
  
  if (currentSubmodule) {
    const content = getSubmoduleContent(currentModule, currentSubmodule);
    if (content !== null) {
      contentArea.innerHTML = content;
    }
    // Si content es null, significa que ya se insertó directamente (caso equipos)
  } else {
    switch (currentModule) {
      case 'dashboard':
        contentArea.innerHTML = getDashboardContent();
        break;
      case 'gestion':
        contentArea.innerHTML = getGestionContent();
        break;
      case 'centroVentas':
        // Usar la nueva función del módulo unificado
        contentArea.innerHTML = '';
        contentArea.appendChild(getModuloUnificadoVentasContent());
        break;
      case 'generarVenta':
        contentArea.innerHTML = getGenerarVentaContent();
        break;
      case 'pymes':
        contentArea.innerHTML = getPymesContent();
        break;
      case 'activaciones':
        contentArea.innerHTML = getActivacionesContent();
        break;
      case 'consultarBaseGeneral':
        contentArea.innerHTML = getConsultarBaseGeneralContent();
        break;
      case 'consultarBaseFijo':
        contentArea.innerHTML = getConsultarBaseFijoContent();
        break;
      case 'reportes':
        contentArea.innerHTML = getReportesContent();
        break;
      case 'pagoFactura':
        contentArea.innerHTML = getPagoFacturaContent();
        break;
      case 'discrepanciasPago':
        contentArea.innerHTML = getDiscrepanciasPagoContent();
        break;
      case 'inventario':
        contentArea.innerHTML = getInventarioContent();
        break;
      case 'accesorios':
        contentArea.innerHTML = getAccesoriosContent();
        break;
      case 'documentos':
        contentArea.innerHTML = getDocumentosContent();
        break;
      case 'cuentasClientes':
        contentArea.innerHTML = getCuentasClientesContent();
        break;
      case 'crm':
        contentArea.innerHTML = getCRMContent();
        break;
      case 'sms':
        contentArea.innerHTML = getSMSContent();
        break;
      case 'fidelizacion':
        contentArea.innerHTML = getFidelizacionContent();
        break;
      case 'consultaMeses':
        contentArea.innerHTML = getConsultaMesesContent();
        break;
      case 'ponche':
        contentArea.innerHTML = getPoncheContent();
        break;
      case 'caja':
        contentArea.innerHTML = getCajaContent();
        break;
      case 'documentosAdmin':
        contentArea.innerHTML = getDocumentosAdminContent();
        break;
      case 'conciliacionComisiones':
        contentArea.innerHTML = getConciliacionComisionesContent();
        break;
      case 'objetivosVenta':
        contentArea.innerHTML = getObjetivosVentaContent();
        break;
      case 'administracion':
        contentArea.innerHTML = getAdministracionContent();
        break;
      case 'permisos':
        contentArea.innerHTML = getPermisosContent();
        break;
      case 'agentesIA':
        contentArea.innerHTML = getAgentesIAContent();
        break;
      default:
        contentArea.innerHTML = getDashboardContent();
    }
  }
}

// === CONTENIDO DE DASHBOARD ===
function getDashboardContent() {
  const userInfo = getUserInfo();
  const visibleModules = getVisibleModules();
  
  return `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-white">Dashboard</h1>
        <span class="px-3 py-1 bg-green-600 text-white rounded-full text-sm">SISTEMA CON PERMISOS ✅</span>
      </div>
      
      <!-- Info del Usuario y Sistema de Permisos -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Usuario Actual -->
        <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <span class="text-white text-xl">�</span>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-white">Usuario Activo</h3>
              <p class="text-blue-400">${userInfo.usuario}</p>
            </div>
          </div>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between">
              <span class="text-gray-400">Tipo:</span>
              <span class="text-white font-medium">${userInfo.tipo}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Plan:</span>
              <span class="text-yellow-400">${userInfo.plan}</span>
            </div>
          </div>
        </div>
        
        <!-- Módulos Disponibles -->
        <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <span class="text-white text-xl">�</span>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-white">Acceso</h3>
              <p class="text-green-400">${userInfo.modulosVisibles} de ${userInfo.totalModulos}</p>
            </div>
          </div>
          <div class="w-full bg-gray-700 rounded-full h-2">
            <div class="bg-green-600 h-2 rounded-full" style="width: ${(userInfo.modulosVisibles/userInfo.totalModulos)*100}%"></div>
          </div>
          <p class="text-xs text-gray-400 mt-2">Módulos disponibles con tu nivel</p>
        </div>
        
        <!-- Sistema SaaS -->
        <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
              <span class="text-white text-xl">🚀</span>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-white">SaaS Activo</h3>
              <p class="text-purple-400">Sistema Multi-Usuario</p>
            </div>
          </div>
          <div class="space-y-1 text-sm">
            <div class="flex items-center text-green-400">
              <span class="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              <span>Permisos Activos</span>
            </div>
            <div class="flex items-center text-green-400">
              <span class="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              <span>Control de Acceso</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Módulos Disponibles -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 class="text-xl font-bold text-white mb-4">📋 Módulos Disponibles para tu Usuario</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          ${visibleModules.map(module => {
            const moduleInfo = getModuleInfo(module);
            return `
              <div class="bg-gray-700 p-3 rounded-lg border border-gray-600 hover:bg-gray-600 transition-colors cursor-pointer" onclick="navegarA('${module}')">
                <div class="text-center">
                  <span class="text-2xl">${moduleInfo.icon}</span>
                  <p class="text-xs text-white mt-1 truncate" title="${moduleInfo.label}">${moduleInfo.label}</p>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Módulos disponibles se cargan dinámicamente -->

      <!-- Estadísticas del Dashboard -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">👥</span>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-white">Vendedores</h3>
              <p class="text-2xl font-bold text-blue-400" id="stat-vendedores">-</p>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">💰</span>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-white">Ventas Hoy</h3>
              <p class="text-2xl font-bold text-green-400" id="stat-ventas">-</p>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">🏢</span>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-white">Equipos</h3>
              <p class="text-2xl font-bold text-orange-400" id="stat-equipos">-</p>
            </div>
          </div>
        </div>
        
        <div class="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span class="text-2xl">🎯</span>
            </div>
            <div class="ml-4">
              <h3 class="text-lg font-medium text-white">Meta Mes</h3>
              <p class="text-2xl font-bold text-purple-400" id="stat-meta">-</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Función auxiliar para obtener información de módulos
function getModuleInfo(moduleId) {
  const moduleData = {
    dashboard: { icon: '📊', label: 'Dashboard' },
    gestion: { icon: '⚙️', label: 'Gestión' },
    centroVentas: { icon: '📊', label: 'Centro de Ventas' },
    generarVenta: { icon: '🛒', label: 'Generar Venta' },
    pymes: { icon: '🏪', label: 'Pymes' },
    activaciones: { icon: '👥', label: 'Activaciones' },
    consultarBaseGeneral: { icon: '💰', label: 'Base General' },
    consultarBaseFijo: { icon: '💰', label: 'Base FIJO' },
    reportes: { icon: '📈', label: 'Reportes' },
    pagoFactura: { icon: '💳', label: 'Pago Factura' },
    discrepanciasPago: { icon: '📋', label: 'Discrepancias' },
    inventario: { icon: '📦', label: 'Inventario' },
    accesorios: { icon: '🎧', label: 'Accesorios' },
    documentos: { icon: '📁', label: 'Documentos' },
    cuentasClientes: { icon: '👥', label: 'Cuentas' },
    crm: { icon: '🎯', label: 'CRM' },
    sms: { icon: '📱', label: 'SMS' },
    fidelizacion: { icon: '🏆', label: 'Fidelización' },
    consultaMeses: { icon: '📅', label: 'Consulta Meses' },
    ponche: { icon: '⏰', label: 'Ponche' },
    caja: { icon: '💳', label: 'Caja' },
    documentosAdmin: { icon: '📋', label: 'Docs Admin' },
    conciliacionComisiones: { icon: '🔄', label: 'Conciliación' },
    objetivosVenta: { icon: '📊', label: 'Objetivos' },
    administracion: { icon: '⚙️', label: 'Administración' },
    permisos: { icon: '🔐', label: 'Permisos' },
    agentesIA: { icon: '🤖', label: 'Agentes IA' }
  };
  
  return moduleData[moduleId] || { icon: '❓', label: moduleId };
}

// === CONTENIDO DE GESTIÓN ===
function getGestionContent() {
  return `
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-white">⚙️ Gestión</h1>
        <span class="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">15 SUBMÓDULOS</span>
      </div>
      
      <p class="text-gray-300 text-lg">
        Módulo principal de gestión empresarial según documentación oficial
      </p>

      <!-- Grid de Submódulos de Gestión -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        
        <!-- Comisiones -->
        <div onclick="navegarA('gestion', 'comisiones')" class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-2xl mb-2">🧮</div>
            <h3 class="text-sm font-medium text-white">Comisiones</h3>
            <p class="text-xs text-gray-400 mt-1">Pagos</p>
          </div>
        </div>

        <!-- Vendedores -->
        <div onclick="navegarA('gestion', 'vendedores')" class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-2xl mb-2">👩‍💼</div>
            <h3 class="text-sm font-medium text-white">Vendedores</h3>
            <p class="text-xs text-gray-400 mt-1">Equipo</p>
          </div>
        </div>

        <!-- Equipos -->
        <div onclick="navegarA('gestion', 'equipos')" class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-2xl mb-2">📱</div>
            <h3 class="text-sm font-medium text-white">Equipos</h3>
            <p class="text-xs text-gray-400 mt-1">Dispositivos</p>
          </div>
        </div>

        <!-- Productos -->
        <div onclick="navegarA('gestion', 'productos')" class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-2xl mb-2">🎯</div>
            <h3 class="text-sm font-medium text-white">Productos</h3>
            <p class="text-xs text-gray-400 mt-1">Catálogo</p>
          </div>
        </div>

        <!-- Usuarios -->
        <div onclick="navegarA('gestion', 'usuarios')" class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-2xl mb-2">👤</div>
            <h3 class="text-sm font-medium text-white">Usuarios</h3>
            <p class="text-xs text-gray-400 mt-1">Accesos</p>
          </div>
        </div>

        <!-- Tipo de Plan -->
        <div onclick="navegarA('gestion', 'tipoPlan')" class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-2xl mb-2">📋</div>
            <h3 class="text-sm font-medium text-white">Tipo de Plan</h3>
            <p class="text-xs text-gray-400 mt-1">Planes</p>
          </div>
        </div>

        <!-- Tiendas -->
        <div onclick="navegarA('gestion', 'tiendas')" class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-2xl mb-2">🏠</div>
            <h3 class="text-sm font-medium text-white">Tiendas</h3>
            <p class="text-xs text-gray-400 mt-1">Sucursales</p>
          </div>
        </div>

        <!-- Soc Equipo -->
        <div onclick="navegarA('gestion', 'socEquipo')" class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-2xl mb-2">📄</div>
            <h3 class="text-sm font-medium text-white">Soc Equipo</h3>
            <p class="text-xs text-gray-400 mt-1">Sociedades</p>
          </div>
        </div>

        <!-- Features -->
        <div onclick="navegarA('gestion', 'features')" class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-2xl mb-2">🌍</div>
            <h3 class="text-sm font-medium text-white">Features</h3>
            <p class="text-xs text-gray-400 mt-1">Funciones</p>
          </div>
        </div>

        <!-- MAC -->
        <div onclick="navegarA('gestion', 'mac')" class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-2xl mb-2">📖</div>
            <h3 class="text-sm font-medium text-white">MAC</h3>
            <p class="text-xs text-gray-400 mt-1">Direcciones</p>
          </div>
        </div>

        <!-- Departamentos -->
        <div onclick="navegarA('gestion', 'departamentos')" class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-2xl mb-2">🏷️</div>
            <h3 class="text-sm font-medium text-white">Departamentos</h3>
            <p class="text-xs text-gray-400 mt-1">Etiquetas</p>
          </div>
        </div>

        <!-- Razones de Visita -->
        <div onclick="navegarA('gestion', 'razonesVisita')" class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-2xl mb-2">☑️</div>
            <h3 class="text-sm font-medium text-white">Razones Visita</h3>
            <p class="text-xs text-gray-400 mt-1">Motivos</p>
          </div>
        </div>

        <!-- IVU Nacional -->
        <div onclick="navegarA('gestion', 'ivuNacional')" class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-2xl mb-2">💵</div>
            <h3 class="text-sm font-medium text-white">IVU Nacional</h3>
            <p class="text-xs text-gray-400 mt-1">Impuestos</p>
          </div>
        </div>

        <!-- Puntos Vendedor -->
        <div onclick="navegarA('gestion', 'puntosVendedor')" class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-2xl mb-2">🎁</div>
            <h3 class="text-sm font-medium text-white">Puntos Vendedor</h3>
            <p class="text-xs text-gray-400 mt-1">Puntuación</p>
          </div>
        </div>

        <!-- Contratos -->
        <div onclick="navegarA('gestion', 'contratos')" class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-2xl mb-2">✍️</div>
            <h3 class="text-sm font-medium text-white">Contratos</h3>
            <p class="text-xs text-gray-400 mt-1">Gestión</p>
          </div>
        </div>

        <!-- === NUEVOS AGENTES ESPECIALIZADOS === -->
        
        <!-- Activaciones -->
        <div onclick="navegarA('gestion', 'activaciones')" class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-2xl mb-2">🔄</div>
            <h3 class="text-sm font-medium text-white">Activaciones</h3>
            <p class="text-xs text-gray-400 mt-1">Agente IA</p>
          </div>
        </div>

        <!-- Cambios -->
        <div onclick="navegarA('gestion', 'cambios')" class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-2xl mb-2">🔄</div>
            <h3 class="text-sm font-medium text-white">Cambios</h3>
            <p class="text-xs text-gray-400 mt-1">Agente IA</p>
          </div>
        </div>

        <!-- Inventario -->
        <div onclick="navegarA('gestion', 'inventario')" class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-2xl mb-2">📦</div>
            <h3 class="text-sm font-medium text-white">Inventario</h3>
            <p class="text-xs text-gray-400 mt-1">Agente IA</p>
          </div>
        </div>

        <!-- Subsidios -->
        <div onclick="navegarA('gestion', 'subsidios')" class="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:bg-gray-700 transition-colors cursor-pointer">
          <div class="text-center">
            <div class="text-2xl mb-2">💰</div>
            <h3 class="text-sm font-medium text-white">Subsidios</h3>
            <p class="text-xs text-gray-400 mt-1">Agente IA</p>
          </div>
        </div>

      </div>
    </div>
  `;
}

// === FUNCIÓN PARA OBTENER CONTENIDO DE SUBMÓDULOS ===
function getSubmoduleContent(module, submodule) {
  switch(submodule) {
    case 'vendedores':
      return getVendedoresContent();
    case 'comisiones':
      return getComisionesContent();
    case 'equipos':
      // Usar la nueva función refactorizada
      const contenidoDiv = document.getElementById('contenido');
      contenidoDiv.innerHTML = '';
      contenidoDiv.appendChild(getAgenteEquiposContent());
      return null; // Ya se insertó directamente
    case 'productos':
      return getProductosContent();
    case 'usuarios':
      return getUsuariosContent();
    case 'tipoPlan':
      return getTipoPlanContent();
    case 'tiendas':
      return getTiendasContent();
    case 'socEquipo':
      return getSocEquipoContent();
    case 'features':
      return getFeaturesContent();
    case 'mac':
      return getMacContent();
    case 'departamentos':
      return getDepartamentosContent();
    case 'razonesVisita':
      return getRazonesVisitaContent();
    case 'ivuNacional':
      return getIvuNacionalContent();
    case 'puntosVendedor':
      return getPuntosVendedorContent();
    case 'contratos':
      return getContratosContent();
    // === NUEVOS AGENTES ESPECIALIZADOS ===
    case 'activaciones':
      return getActivacionesAgenteContent();
    case 'cambios':
      return getCambiosAgenteContent();
    case 'inventario':
      return getInventarioAgenteContent();
    case 'subsidios':
      return getSubsidiosAgenteContent();
    default:
      return `<div class="text-center py-8">
        <h3 class="text-lg font-medium text-white mb-2">Submódulo en construcción</h3>
        <p class="text-gray-400">Este submódulo estará disponible próximamente.</p>
        <button onclick="navegarA('gestion')" class="mt-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md">← Volver a Gestión</button>
      </div>`;
  }
}

// === SUBMÓDULO DE VENDEDORES ===
function getVendedoresContent() {
  return `
    <div class="space-y-6">
      <!-- Header del módulo -->
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">
          ← Volver a Gestión
        </button>
        <h2 class="text-2xl font-bold text-white">👥 Gestión de Vendedores</h2>
      </div>

      <!-- Botones de acción -->
      <div class="flex justify-between items-center">
        <p class="text-gray-300">Administración del equipo de ventas</p>
        <div class="flex space-x-3">
          <button onclick="cargarVendedores()" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
            🔄 Recargar
          </button>
          <button onclick="abrirFormularioVendedor()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
            ➕ Nuevo Vendedor
          </button>
        </div>
      </div>

      <!-- Formulario de nuevo vendedor (inicialmente oculto) -->
      <div id="formulario-vendedor" class="hidden bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 class="text-lg font-medium text-white mb-4">📝 Registrar Nuevo Vendedor</h3>
        <form id="form-vendedor" onsubmit="guardarVendedor(event)" class="space-y-4">
          <!-- Sección de foto de perfil -->
          <div class="flex justify-center mb-6">
            <div class="relative">
              <div id="photo-preview" class="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center border-2 border-gray-500 overflow-hidden">
                <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                </svg>
              </div>
              <button type="button" onclick="document.getElementById('photo-input').click()" 
                      class="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 transition-colors">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path>
                </svg>
              </button>
              <input type="file" id="photo-input" name="foto" accept="image/*" class="hidden" onchange="previewPhoto(event)">
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Nombre -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Nombre *</label>
              <input type="text" id="vendedor_nombre" name="nombre" required 
                     class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                     placeholder="Juan">
            </div>
            <!-- Apellido -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Apellido *</label>
              <input type="text" id="vendedor_apellido" name="apellido" required 
                     class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                     placeholder="Pérez">
            </div>
            <!-- Email -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Email *</label>
              <input type="email" id="vendedor_email" name="email" required 
                     class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                     placeholder="juan.perez@empresa.com">
            </div>
            <!-- Teléfono -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Teléfono *</label>
              <input type="tel" id="vendedor_telefono" name="telefono" required 
                     class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                     placeholder="+1 (787) 123-4567">
            </div>
            <!-- Equipo -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-300 mb-2">Equipo de Ventas</label>
              <select id="vendedor_equipo" name="equipo_id" 
                      class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seleccionar equipo</option>
                <option value="1">Equipo Alpha</option>
                <option value="2">Equipo Beta</option>
                <option value="3">Equipo Gamma</option>
              </select>
            </div>
          </div>

          <!-- Botones -->
          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" onclick="cerrarFormularioVendedor()" 
                    class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors">
              ❌ Cancelar
            </button>
            <button type="submit" 
                    class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
              💾 Guardar Vendedor
            </button>
          </div>
        </form>
      </div>

      <!-- Lista de vendedores -->
      <div class="bg-gray-800 rounded-lg border border-gray-700">
        <div class="px-6 py-4 border-b border-gray-700">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-white">📋 Lista de Vendedores</h3>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-400" id="vendedores-count">0 vendedores</span>
              <div class="w-2 h-2 bg-green-400 rounded-full" title="Conectado"></div>
            </div>
          </div>
        </div>
        
        <!-- Tabla de vendedores -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-700">
            <thead class="bg-gray-900">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Vendedor</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Contacto</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Equipo</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody id="tabla-vendedores" class="bg-gray-800 divide-y divide-gray-700">
              <!-- Los datos se cargan dinámicamente -->
            </tbody>
          </table>
        </div>

        <!-- Estado de carga -->
        <div id="loading-vendedores" class="p-8 text-center">
          <div class="inline-flex items-center px-4 py-2 text-sm text-gray-400">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Cargando vendedores...
          </div>
        </div>
      </div>
    </div>
  `;
}

// === PLACEHOLDERS PARA OTROS SUBMÓDULOS ===
function getComisionesContent() {
  return `
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">← Volver a Gestión</button>
        <h2 class="text-2xl font-bold text-white">💰 Gestión de Comisiones</h2>
      </div>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de comisiones en desarrollo...</p>
      </div>
    </div>
  `;
}

function getEquiposContent() {
  return `
    <div class="space-y-6">
      <!-- Header del módulo -->
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">
          ← Volver a Gestión
        </button>
        <h2 class="text-2xl font-bold text-white">📱 Gestión de Equipos</h2>
      </div>

      <!-- Botones de acción -->
      <div class="flex justify-between items-center">
        <p class="text-gray-300">Administración de dispositivos móviles</p>
        <div class="flex space-x-3">
          <button onclick="cargarEquipos()" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
            🔄 Recargar
          </button>
          <button onclick="abrirFormularioEquipo()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
            ➕ Nuevo Equipo
          </button>
        </div>
      </div>

      <!-- Formulario de nuevo equipo (inicialmente oculto) -->
      <div id="formulario-equipo" class="hidden bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 class="text-lg font-medium text-white mb-4">📱 Registrar Nuevo Equipo</h3>
        <form id="form-equipo" onsubmit="guardarEquipo(event)" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Marca -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Marca *</label>
              <select id="equipo_marca" name="marca" required 
                      class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seleccionar marca</option>
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="Google">Google</option>
                <option value="Huawei">Huawei</option>
                <option value="OnePlus">OnePlus</option>
                <option value="Motorola">Motorola</option>
                <option value="Oppo">Oppo</option>
                <option value="Vivo">Vivo</option>
                <option value="Realme">Realme</option>
                <option value="Honor">Honor</option>
                <option value="Nokia">Nokia</option>
                <option value="Sony">Sony</option>
                <option value="LG">LG</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            
            <!-- Modelo -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Modelo *</label>
              <input type="text" id="equipo_modelo" name="modelo" required 
                     class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                     placeholder="Ej: iPhone 15 Pro, Galaxy S24, Redmi Note 13">
            </div>

            <!-- Tipo/Dispositivo -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Tipo de Dispositivo *</label>
              <select id="equipo_tipo" name="tipo" required 
                      class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Seleccionar tipo</option>
                <option value="Smartphone">📱 Smartphone</option>
                <option value="Tablet">📟 Tablet</option>
                <option value="Laptop">💻 Laptop</option>
                <option value="Smartwatch">⌚ Smartwatch</option>
                <option value="Router">📡 Router</option>
                <option value="Modem">🌐 Módem</option>
                <option value="Otro">❓ Otro</option>
              </select>
            </div>

            <!-- Costo -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Costo (USD)</label>
              <input type="number" id="equipo_costo" name="costo" step="0.01" min="0"
                     class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                     placeholder="0.00">
            </div>

            <!-- IMEI -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">IMEI *</label>
              <input type="text" id="equipo_imei" name="imei" required 
                     maxlength="15" pattern="[0-9]{15}"
                     class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                     placeholder="123456789012345">
              <p class="text-xs text-gray-400 mt-1">15 dígitos numéricos únicos</p>
            </div>

            <!-- Externo (Checkbox) -->
            <div class="flex items-center space-x-3">
              <input type="checkbox" id="equipo_externo" name="externo" 
                     class="h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2">
              <label for="equipo_externo" class="text-sm font-medium text-gray-300">
                🌐 Equipo Externo
              </label>
              <span class="text-xs text-gray-400">(Marca si no pertenece a la empresa)</span>
            </div>
            <!-- Vendedor Asignado -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Vendedor Asignado</label>
              <select id="equipo_vendedor" name="vendedor_id" 
                      class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Sin asignar</option>
                <!-- Los vendedores se cargarán dinámicamente desde el backend -->
              </select>
            </div>
            <!-- Estado -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Estado *</label>
              <select id="equipo_estado" name="estado" required 
                      class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="activo">🟢 Activo</option>
                <option value="inactivo">🟡 Inactivo</option>
                <option value="mantenimiento">🔧 En Mantenimiento</option>
                <option value="perdido">❌ Perdido</option>
                <option value="dañado">💥 Dañado</option>
                <option value="retirado">📦 Retirado</option>
              </select>
            </div>
            <!-- Número de Serie -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Número de Serie</label>
              <input type="text" id="equipo_serie" name="numero_serie"
                     class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                     placeholder="S/N del dispositivo">
            </div>
            <!-- Fecha de Adquisición -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Fecha de Adquisición</label>
              <input type="date" id="equipo_fecha" name="fecha_adquisicion"
                     class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            </div>
            <!-- Observaciones -->
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-300 mb-2">Observaciones</label>
              <textarea id="equipo_observaciones" name="observaciones" rows="3"
                        class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                        placeholder="Comentarios adicionales sobre el equipo..."></textarea>
            </div>
          </div>

          <!-- Botones -->
          <div class="flex justify-end space-x-3 pt-4">
            <button type="button" onclick="cerrarFormularioEquipo()" 
                    class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors">
              ❌ Cancelar
            </button>
            <button type="submit" 
                    class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
              💾 Guardar Equipo
            </button>
          </div>
        </form>
      </div>

      <!-- Lista de equipos -->
      <div class="bg-gray-800 rounded-lg border border-gray-700">
        <div class="px-6 py-4 border-b border-gray-700">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-medium text-white">📋 Lista de Equipos</h3>
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-400" id="equipos-count">0 equipos</span>
              <div class="w-2 h-2 bg-green-400 rounded-full" title="Conectado"></div>
            </div>
          </div>
        </div>
        
        <!-- Tabla de equipos -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-700">
            <thead class="bg-gray-900">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Marca/Modelo</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">IMEI</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Costo</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Vendedor</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Externo</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody id="tabla-equipos" class="bg-gray-800 divide-y divide-gray-700">
              <!-- Los datos se cargan dinámicamente -->
            </tbody>
          </table>
        </div>

        <!-- Estado de carga -->
        <div id="loading-equipos" class="p-8 text-center">
          <div class="inline-flex items-center px-4 py-2 text-sm text-gray-400">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Cargando equipos...
          </div>
        </div>
      </div>
    </div>
  `;
}

function getProductosContent() {
  return `
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">← Volver a Gestión</button>
        <h2 class="text-2xl font-bold text-white">📦 Gestión de Productos</h2>
      </div>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de productos en desarrollo...</p>
      </div>
    </div>
  `;
}

function getUsuariosContent() {
  return `
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">← Volver a Gestión</button>
        <h2 class="text-2xl font-bold text-white">👤 Gestión de Usuarios</h2>
      </div>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de usuarios en desarrollo...</p>
      </div>
    </div>
  `;
}

function getTipoPlanContent() {
  return `
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">← Volver a Gestión</button>
        <h2 class="text-2xl font-bold text-white">📄 Gestión de Tipo de Plan</h2>
      </div>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de tipo de plan en desarrollo...</p>
      </div>
    </div>
  `;
}

function getTiendasContent() {
  return `
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">← Volver a Gestión</button>
        <h2 class="text-2xl font-bold text-white">🏪 Gestión de Tiendas</h2>
      </div>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de tiendas en desarrollo...</p>
      </div>
    </div>
  `;
}

function getSocEquipoContent() {
  return `
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">← Volver a Gestión</button>
        <h2 class="text-2xl font-bold text-white">👥 Gestión de Soc Equipo</h2>
      </div>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de soc equipo en desarrollo...</p>
      </div>
    </div>
  `;
}

function getFeaturesContent() {
  return `
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">← Volver a Gestión</button>
        <h2 class="text-2xl font-bold text-white">⚡ Gestión de Features</h2>
      </div>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de features en desarrollo...</p>
      </div>
    </div>
  `;
}

function getMacContent() {
  return `
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">← Volver a Gestión</button>
        <h2 class="text-2xl font-bold text-white">💻 Gestión de MAC</h2>
      </div>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de MAC en desarrollo...</p>
      </div>
    </div>
  `;
}

function getDepartamentosContent() {
  return `
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">← Volver a Gestión</button>
        <h2 class="text-2xl font-bold text-white">🏛️ Gestión de Departamentos</h2>
      </div>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de departamentos en desarrollo...</p>
      </div>
    </div>
  `;
}

function getRazonesVisitaContent() {
  return `
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">← Volver a Gestión</button>
        <h2 class="text-2xl font-bold text-white">📝 Gestión de Razones de Visita</h2>
      </div>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de razones de visita en desarrollo...</p>
      </div>
    </div>
  `;
}

function getIvuNacionalContent() {
  return `
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">← Volver a Gestión</button>
        <h2 class="text-2xl font-bold text-white">🧾 Gestión de IVU Nacional</h2>
      </div>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de IVU Nacional en desarrollo...</p>
      </div>
    </div>
  `;
}

function getPuntosVendedorContent() {
  return `
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">← Volver a Gestión</button>
        <h2 class="text-2xl font-bold text-white">🎯 Gestión de Puntos Vendedor</h2>
      </div>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de puntos vendedor en desarrollo...</p>
      </div>
    </div>
  `;
}

// === PLACEHOLDERS PARA OTROS MÓDULOS PRINCIPALES ===
function getContratosContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">📋 Contratos</h1>
      <p class="text-gray-400">Gestión de contratos y importación de datos</p>
      
      <!-- Sección de Importación de Datos -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-white flex items-center">
            <span class="text-2xl mr-3">📊</span>
            Vista Previa y Mapeo de Columnas
          </h2>
        </div>
        
        <!-- Upload Area -->
        <div id="upload-area" class="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center mb-6 hover:border-gray-500 transition-colors">
          <div class="text-4xl mb-4">📁</div>
          <p class="text-gray-300 mb-2">Arrastra y suelta tu archivo CSV o Excel aquí</p>
          <p class="text-gray-500 text-sm mb-4">o haz clic para seleccionar un archivo</p>
          <input type="file" id="file-input" class="hidden" accept=".csv,.xlsx,.xls">
          <button onclick="document.getElementById('file-input').click()" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
            Seleccionar Archivo
          </button>
        </div>
        
        <!-- Progress -->
        <div id="upload-progress" class="hidden mb-6">
          <div class="bg-gray-700 rounded-full h-2 mb-2">
            <div id="progress-bar" class="bg-blue-600 h-2 rounded-full" style="width: 0%"></div>
          </div>
          <p id="progress-text" class="text-sm text-gray-400">Subiendo archivo...</p>
        </div>
        
        <!-- Mapping Interface -->
        <div id="mapping-interface" class="hidden">
          <div class="grid md:grid-cols-2 gap-6">
            <!-- Column Mapping -->
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-white">Asignación de columnas</h3>
              <div id="column-mappings" class="space-y-3">
                <!-- Mappings will be generated here -->
              </div>
            </div>
            
            <!-- Preview -->
            <div class="space-y-4">
              <h3 class="text-lg font-medium text-white">Vista previa (primeras filas)</h3>
              <div class="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                <table id="preview-table" class="w-full text-sm">
                  <!-- Preview data will be shown here -->
                </table>
              </div>
            </div>
          </div>
          
          <!-- Import Controls -->
          <div class="flex justify-between items-center mt-6 pt-4 border-t border-gray-700">
            <div class="text-sm text-gray-400">
              <span id="file-info">Archivo seleccionado</span>
            </div>
            <div class="space-x-3">
              <button onclick="resetUpload()" class="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md">
                Cancelar
              </button>
              <button onclick="importData()" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">
                Importar Datos
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Contratos Table -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 class="text-xl font-semibold text-white mb-4">Contratos Registrados</h2>
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-700">
                <th class="text-left py-2 text-gray-300">BAN</th>
                <th class="text-left py-2 text-gray-300">SUB</th>
                <th class="text-left py-2 text-gray-300">SUB_STATUS</th>
                <th class="text-left py-2 text-gray-300">SUB_STATUS_DATE</th>
                <th class="text-left py-2 text-gray-300">SOC</th>
                <th class="text-left py-2 text-gray-300">SOC_DESCRIPTION</th>
              </tr>
            </thead>
            <tbody id="contratos-table-body">
              <tr class="text-gray-400">
                <td colspan="6" class="py-4 text-center">No hay contratos cargados. Importa un archivo para comenzar.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <script>
      // File upload functionality
      let currentFile = null;
      let columnMappings = {};
      
      // Setup file upload
      const fileInput = document.getElementById('file-input');
      const uploadArea = document.getElementById('upload-area');
      
      // Drag and drop handlers
      uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('border-blue-500');
      });
      
      uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('border-blue-500');
      });
      
      uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('border-blue-500');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
          handleFileSelect(files[0]);
        }
      });
      
      fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
          handleFileSelect(e.target.files[0]);
        }
      });
      
      function handleFileSelect(file) {
        currentFile = file;
        uploadFile(file);
      }
      
      async function uploadFile(file) {
        const progressEl = document.getElementById('upload-progress');
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');
        
        progressEl.classList.remove('hidden');
        
        const formData = new FormData();
        formData.append('file', file);
        
        try {
          progressText.textContent = 'Analizando archivo...';
          progressBar.style.width = '50%';
          
          const response = await fetch('http://localhost:9000/api/upload/analyze', {
            method: 'POST',
            body: formData
          });
          
          if (!response.ok) {
            throw new Error('Error al subir archivo');
          }
          
          const result = await response.json();
          
          progressBar.style.width = '100%';
          progressText.textContent = 'Análisis completado';
          
          setTimeout(() => {
            progressEl.classList.add('hidden');
            showMappingInterface(result);
          }, 1000);
          
        } catch (error) {
          console.error('Error:', error);
          progressText.textContent = 'Error al procesar archivo';
          progressBar.classList.add('bg-red-600');
          alert('Error al procesar el archivo: ' + error.message);
        }
      }
      
      function showMappingInterface(data) {
        const mappingInterface = document.getElementById('mapping-interface');
        const columnMappingsEl = document.getElementById('column-mappings');
        const previewTable = document.getElementById('preview-table');
        const fileInfo = document.getElementById('file-info');
        
        // Show interface
        mappingInterface.classList.remove('hidden');
        
        // Update file info
        fileInfo.textContent = \`\${data.fileName} - \${data.rowCount} filas detectadas\`;
        
        // Generate column mappings
        columnMappingsEl.innerHTML = '';
        data.columns.forEach(column => {
          const mappingEl = document.createElement('div');
          mappingEl.className = 'space-y-2';
          
          const suggested = data.suggestedMapping[column] || '';
          
          mappingEl.innerHTML = \`
            <label class="block">
              <span class="text-sm font-medium text-gray-300">COLUMNA EN ARCHIVO</span>
              <div class="text-lg font-semibold text-white">\${column}</div>
            </label>
            <select class="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white" 
                    onchange="updateMapping('\${column}', this.value)">
              <option value="">Ignorar</option>
              \${data.availableFields.map(field => 
                \`<option value="\${field}" \${field === suggested ? 'selected' : ''}>\${field}</option>\`
              ).join('')}
            </select>
            <p class="text-xs text-gray-500">Se enviará a la columna ←→ en la tabla.</p>
          \`;
          
          columnMappingsEl.appendChild(mappingEl);
          
          if (suggested) {
            columnMappings[column] = suggested;
          }
        });
        
        // Generate preview table
        let tableHTML = '<thead><tr>';
        data.columns.forEach(col => {
          tableHTML += \`<th class="text-left py-1 px-2 text-gray-300 border-b border-gray-700">\${col}</th>\`;
        });
        tableHTML += '</tr></thead><tbody>';
        
        data.sampleData.forEach(row => {
          tableHTML += '<tr>';
          data.columns.forEach(col => {
            tableHTML += \`<td class="py-1 px-2 text-gray-300">\${row[col] || ''}</td>\`;
          });
          tableHTML += '</tr>';
        });
        tableHTML += '</tbody>';
        
        previewTable.innerHTML = tableHTML;
      }
      
      function updateMapping(column, value) {
        if (value) {
          columnMappings[column] = value;
        } else {
          delete columnMappings[column];
        }
      }
      
      function resetUpload() {
        document.getElementById('mapping-interface').classList.add('hidden');
        document.getElementById('upload-progress').classList.add('hidden');
        document.getElementById('file-input').value = '';
        currentFile = null;
        columnMappings = {};
      }
      
      async function importData() {
        if (!currentFile || Object.keys(columnMappings).length === 0) {
          alert('Selecciona un archivo y configura al menos una columna.');
          return;
        }
        
        try {
          // Aquí implementarías la llamada real al backend
          alert('Funcionalidad de importación en desarrollo. Mappings configurados: ' + 
                JSON.stringify(columnMappings, null, 2));
                
          resetUpload();
          
        } catch (error) {
          console.error('Error:', error);
          alert('Error al importar datos: ' + error.message);
        }
      }
    </script>
  `;
}

function getReportesContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">📈 Reportes</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de reportes en desarrollo...</p>
      </div>
    </div>
  `;
}

function getAgentesIAContent() {
  return `
    <div class="space-y-6" id="agentes-container">
      <!-- Header con Toggle de Visibilidad -->
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold text-white">🤖 Panel de Administración</h1>
        <div class="flex space-x-3">
          <button onclick="toggleSystemInfo()" class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md text-sm">
            👁️ Toggle Info Sistema
          </button>
          <span class="px-3 py-1 bg-red-600 text-white rounded-full text-sm">CREADOR ONLY</span>
        </div>
      </div>
      
      <!-- Información del Sistema (Ocultable) -->
      <div id="system-info" class="bg-red-900/20 border border-red-700/50 rounded-lg p-4">
        <div class="grid md:grid-cols-3 gap-4">
          <div class="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 class="text-lg font-medium text-white mb-2">📊 Estado del Sistema</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-400">Uptime:</span>
                <span class="text-green-400">99.9%</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Usuarios Activos:</span>
                <span class="text-blue-400">24</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Licencias Vendidas:</span>
                <span class="text-yellow-400">12/50</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Revenue Este Mes:</span>
                <span class="text-green-400">$2,340</span>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 class="text-lg font-medium text-white mb-2">🔧 Configuración</h3>
            <div class="space-y-2">
              <button class="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md">
                Gestionar Licencias
              </button>
              <button class="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md">
                Backup Sistema
              </button>
              <button class="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-md">
                Logs del Sistema
              </button>
            </div>
          </div>
          
          <div class="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 class="text-lg font-medium text-white mb-2">💰 Monetización</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-400">Plan Básico:</span>
                <span class="text-white">$50/mes</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Plan Pro:</span>
                <span class="text-white">$120/mes</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400">Plan Enterprise:</span>
                <span class="text-white">$300/mes</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sistema de Agentes de Ventas -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-white">👥 Agentes de Ventas</h2>
          <button onclick="abrirFormularioAgente()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            ➕ Nuevo Agente
          </button>
        </div>
        
        <!-- Formulario Nuevo Agente (Oculto inicialmente) -->
        <div id="formulario-agente" class="hidden mb-6 bg-gray-900 rounded-lg p-4 border border-gray-600">
          <h3 class="text-lg font-medium text-white mb-4">Registrar Nuevo Agente</h3>
          <form class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Nombre Completo</label>
                <input type="text" id="agente-nombre" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Nombre del agente">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input type="email" id="agente-email" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="agente@empresa.com">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Plan Asignado</label>
                <select id="agente-plan" class="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="basico">Plan Básico - $50/mes</option>
                  <option value="pro">Plan Pro - $120/mes</option>
                  <option value="enterprise">Plan Enterprise - $300/mes</option>
                </select>
              </div>
            </div>
            
            <!-- Permisos de Módulos -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-3">Permisos de Módulos</label>
              <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                <label class="flex items-center space-x-2">
                  <input type="checkbox" value="gestion" class="rounded bg-gray-700 border-gray-600">
                  <span class="text-sm text-gray-300">Gestión</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" value="reportes" class="rounded bg-gray-700 border-gray-600">
                  <span class="text-sm text-gray-300">Reportes</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" value="inventario" class="rounded bg-gray-700 border-gray-600">
                  <span class="text-sm text-gray-300">Inventario</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" value="crm" class="rounded bg-gray-700 border-gray-600">
                  <span class="text-sm text-gray-300">CRM</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" value="ventas" class="rounded bg-gray-700 border-gray-600">
                  <span class="text-sm text-gray-300">Generar Venta</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" value="documentos" class="rounded bg-gray-700 border-gray-600">
                  <span class="text-sm text-gray-300">Documentos</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" value="administracion" class="rounded bg-gray-700 border-gray-600">
                  <span class="text-sm text-gray-300">Administración</span>
                </label>
                <label class="flex items-center space-x-2">
                  <input type="checkbox" value="todos" class="rounded bg-gray-700 border-gray-600" onchange="toggleTodosPermisos(this)">
                  <span class="text-sm text-yellow-300">🔓 Todos</span>
                </label>
              </div>
            </div>
            
            <div class="flex space-x-3">
              <button type="button" onclick="guardarAgente()" class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
                💾 Guardar Agente
              </button>
              <button type="button" onclick="cerrarFormularioAgente()" class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors">
                ❌ Cancelar
              </button>
            </div>
          </form>
        </div>

        <!-- Lista de Agentes -->
        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-700">
                <th class="text-left py-3 text-gray-300">Agente</th>
                <th class="text-left py-3 text-gray-300">Email</th>
                <th class="text-left py-3 text-gray-300">Plan</th>
                <th class="text-left py-3 text-gray-300">Estado</th>
                <th class="text-left py-3 text-gray-300">Último Acceso</th>
                <th class="text-left py-3 text-gray-300">Acciones</th>
              </tr>
            </thead>
            <tbody id="agentes-lista">
              <!-- Los agentes se cargarán dinámicamente desde el backend -->
              <tr class="border-b border-gray-700">
                <td colspan="6" class="py-8 text-center text-gray-400">
                  <div class="flex flex-col items-center">
                    <svg class="h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path>
                    </svg>
                    <p class="text-lg font-medium">No hay agentes registrados</p>
                    <p class="text-sm">Agrega un nuevo agente para comenzar</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Información del Creador -->
      <div class="bg-purple-900/20 border border-purple-700/50 rounded-md p-4">
        <p class="text-sm text-purple-300">
          🔐 <strong>Panel de Creador:</strong> Este panel es visible solo para el propietario del sistema. Los permisos de cada agente determinan qué módulos pueden ver y usar.
        </p>
      </div>
    </div>
    
    <script>
      // Sistema de Gestión de Agentes
      
      function toggleSystemInfo() {
        const systemInfo = document.getElementById('system-info');
        if (systemInfo.style.display === 'none') {
          systemInfo.style.display = 'block';
        } else {
          systemInfo.style.display = 'none';
        }
      }
      
      function abrirFormularioAgente() {
        document.getElementById('formulario-agente').classList.remove('hidden');
      }
      
      function cerrarFormularioAgente() {
        document.getElementById('formulario-agente').classList.add('hidden');
        limpiarFormularioAgente();
      }
      
      function limpiarFormularioAgente() {
        document.getElementById('agente-nombre').value = '';
        document.getElementById('agente-email').value = '';
        document.getElementById('agente-plan').value = 'basico';
        
        // Limpiar checkboxes
        const checkboxes = document.querySelectorAll('#formulario-agente input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = false);
      }
      
      function toggleTodosPermisos(checkbox) {
        const checkboxes = document.querySelectorAll('#formulario-agente input[type="checkbox"]:not([value="todos"])');
        checkboxes.forEach(cb => cb.checked = checkbox.checked);
      }
      
      function guardarAgente() {
        const nombre = document.getElementById('agente-nombre').value;
        const email = document.getElementById('agente-email').value;
        const plan = document.getElementById('agente-plan').value;
        
        if (!nombre || !email) {
          alert('Por favor complete todos los campos requeridos.');
          return;
        }
        
        // Recopilar permisos seleccionados
        const permisos = [];
        const checkboxes = document.querySelectorAll('#formulario-agente input[type="checkbox"]:checked:not([value="todos"])');
        checkboxes.forEach(cb => permisos.push(cb.value));
        
        // Aquí se haría la llamada al backend para guardar
        console.log('Guardando agente:', {
          nombre: nombre,
          email: email,
          plan: plan,
          permisos: permisos
        });
        
        alert('Agente guardado exitosamente (simulado)');
        cerrarFormularioAgente();
        
        // Agregar a la tabla (simulado)
        agregarAgenteATabla(nombre, email, plan);
      }
      
      function agregarAgenteATabla(nombre, email, plan) {
        const tbody = document.getElementById('agentes-lista');
        const planColor = plan === 'enterprise' ? 'purple' : plan === 'pro' ? 'blue' : 'green';
        
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-700';
        row.innerHTML = \`
          <td class="py-3 text-white">\${nombre}</td>
          <td class="py-3 text-gray-400">\${email}</td>
          <td class="py-3">
            <span class="px-2 py-1 bg-\${planColor}-600 text-white text-xs rounded-full">\${plan}</span>
          </td>
          <td class="py-3">
            <span class="px-2 py-1 bg-green-600 text-white text-xs rounded-full">Activo</span>
          </td>
          <td class="py-3 text-gray-400">Ahora</td>
          <td class="py-3">
            <button class="px-2 py-1 bg-yellow-600 hover:bg-yellow-700 text-white text-xs rounded-md mr-2">
              ✏️ Editar
            </button>
            <button class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-md">
              🗑️ Eliminar
            </button>
          </td>
        \`;
        
        tbody.appendChild(row);
      }
      
      // Ocultar info del sistema por defecto para seguridad
      document.addEventListener('DOMContentLoaded', function() {
        const systemInfo = document.getElementById('system-info');
        if (systemInfo) {
          systemInfo.style.display = 'none';
        }
      });
    </script>
  `;
}

// === FUNCIONES AUXILIARES ===
function abrirFormularioVendedor() {
  document.getElementById('formulario-vendedor').classList.remove('hidden');
}

function cerrarFormularioVendedor() {
  document.getElementById('formulario-vendedor').classList.add('hidden');
  // Limpiar formulario
  document.getElementById('form-vendedor').reset();
  // Limpiar preview de foto
  resetPhotoPreview();
}

// === FUNCIONES DE MANEJO DE FOTOS ===
function previewPhoto(event) {
  const file = event.target.files[0];
  if (file) {
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      showErrorMessage('❌ Por favor selecciona un archivo de imagen válido');
      event.target.value = '';
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showErrorMessage('❌ La imagen debe ser menor a 5MB');
      event.target.value = '';
      return;
    }

    // Crear preview
    const reader = new FileReader();
    reader.onload = function(e) {
      const preview = document.getElementById('photo-preview');
      preview.innerHTML = `<img src="${e.target.result}" alt="Preview" class="w-full h-full object-cover">`;
    };
    reader.readAsDataURL(file);
    
    showSuccessMessage('✅ Foto seleccionada correctamente');
  }
}

function resetPhotoPreview() {
  const preview = document.getElementById('photo-preview');
  preview.innerHTML = `
    <svg class="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
    </svg>
  `;
}

// === FUNCIONES DE EQUIPOS ===
function abrirFormularioEquipo() {
  const formulario = document.getElementById('formulario-equipo');
  if (formulario) {
    formulario.classList.remove('hidden');
    cargarVendedoresSelect();
    setupEquipoFormEvents(); // Configurar eventos del formulario
    document.getElementById('equipo_marca').focus();
  }
}

function cerrarFormularioEquipo() {
  const formulario = document.getElementById('formulario-equipo');
  const form = document.getElementById('form-equipo');
  
  // Ocultar formulario
  formulario.classList.add('hidden');
  
  // Reset formulario
  form.reset();
  
  // Limpiar estado de edición
  form.removeAttribute('data-edit-id');
  
  // Restaurar botón a estado original
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.innerHTML = '💾 Guardar Equipo';
  submitBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
  submitBtn.classList.add('bg-green-600', 'hover:bg-green-700');
}

async function cargarEquipos() {
  try {
    showLoadingEquipos();
    const response = await fetch('http://localhost:9999/api/gestion/equipos');
    const data = await response.json();
    
    if (data.success) {
      renderEquipos(data.data);
      updateEquiposCount(data.data.length);
    } else {
      showErrorEquipos('Error cargando equipos');
    }
  } catch (error) {
    console.error('Error cargando equipos:', error);
    showErrorEquipos('No se pudo conectar al servidor');
  }
}

async function guardarEquipo(event) {
  event.preventDefault();
  
  const form = event.target;
  const editId = form.getAttribute('data-edit-id');
  const isEditing = !!editId;
  
  try {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = isEditing ? '⏳ Actualizando...' : '⏳ Guardando...';
    submitBtn.disabled = true;

    // Crear objeto con datos del formulario
    const formData = new FormData(form);
    const equipoData = {
      marca: formData.get('marca'),
      modelo: formData.get('modelo'),
      tipo: formData.get('tipo'),
      imei: formData.get('imei'),
      costo: formData.get('costo') ? parseFloat(formData.get('costo')) : null,
      externo: formData.get('externo') === 'on',
      vendedor_id: formData.get('vendedor_id') || null,
      estado: formData.get('estado'),
      numero_serie: formData.get('numero_serie'),
      fecha_adquisicion: formData.get('fecha_adquisicion') || null,
      observaciones: formData.get('observaciones')
    };

    const url = isEditing 
      ? `http://localhost:9999/api/gestion/equipos/${editId}`
      : 'http://localhost:9999/api/gestion/equipos';
    
    const method = isEditing ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(equipoData)
    });

    const data = await response.json();

    if (data.success) {
      showSuccessMessage(isEditing ? '✅ Equipo actualizado correctamente' : '✅ Equipo guardado correctamente');
      cerrarFormularioEquipo();
      cargarEquipos();
    } else {
      showErrorMessage('❌ Error: ' + data.message);
    }

    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

  } catch (error) {
    console.error('Error guardando equipo:', error);
    showErrorMessage('❌ Error de conexión al servidor');
    
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.innerHTML = isEditing ? '💾 Actualizar Equipo' : '💾 Guardar Equipo';
    submitBtn.disabled = false;
  }
}

async function cargarVendedoresSelect() {
  try {
    const response = await fetch('http://localhost:9999/api/gestion/vendedores');
    const data = await response.json();
    
    if (data.success) {
      const select = document.getElementById('equipo_vendedor');
      select.innerHTML = '<option value="">Sin asignar</option>';
      
      data.data.forEach(vendedor => {
        const option = document.createElement('option');
        option.value = vendedor.id;
        option.textContent = `${vendedor.nombre} ${vendedor.apellido || ''}`;
        select.appendChild(option);
      });
    }
  } catch (error) {
    console.error('Error cargando vendedores:', error);
  }
}

function setupEquipoFormEvents() {
  const marcaSelect = document.getElementById('equipo_marca');
  const modeloInput = document.getElementById('equipo_modelo');
  
  if (marcaSelect && modeloInput) {
    marcaSelect.addEventListener('change', function() {
      const marca = this.value;
      if (marca && marca !== 'Otro') {
        // Sugerencias de modelos populares por marca
        const sugerencias = {
          'Apple': 'iPhone 15 Pro, iPhone 15, iPhone 14 Pro, iPhone 14',
          'Samsung': 'Galaxy S24 Ultra, Galaxy S24, Galaxy A54, Galaxy A34',
          'Xiaomi': 'Redmi Note 13, POCO X6, Mi 13, Redmi 12',
          'Google': 'Pixel 8 Pro, Pixel 8, Pixel 7a',
          'Huawei': 'P60 Pro, P60, Mate 60, Nova 11',
          'OnePlus': 'OnePlus 12, OnePlus 11, Nord CE 3',
          'Motorola': 'Edge 40, Moto G84, Edge 30'
        };
        
        if (sugerencias[marca]) {
          modeloInput.placeholder = `Ej: ${sugerencias[marca]}`;
        }
      }
    });
  }
}

// Función para cargar estadísticas del dashboard
async function cargarEstadisticasDashboard() {
  try {
    // Cargar estadísticas desde el backend
    const responses = await Promise.allSettled([
      fetch('http://localhost:9999/api/gestion/vendedores'),
      fetch('http://localhost:9999/api/gestion/equipos'),
      fetch('http://localhost:9999/api/dashboard/ventas'),
      fetch('http://localhost:9999/api/dashboard/metas')
    ]);

    // Procesar respuestas
    const [vendedores, equipos, ventas, metas] = responses.map(async (response, index) => {
      if (response.status === 'fulfilled' && response.value.ok) {
        const data = await response.value.json();
        return data.success ? data.data : null;
      }
      return null;
    });

    // Actualizar estadísticas en el DOM
    const statVendedores = await vendedores;
    const statEquipos = await equipos;
    
    document.getElementById('stat-vendedores').textContent = 
      statVendedores ? statVendedores.length || '0' : '0';
    
    document.getElementById('stat-equipos').textContent = 
      statEquipos ? statEquipos.length || '0' : '0';
    
    document.getElementById('stat-ventas').textContent = '$0.00';
    document.getElementById('stat-meta').textContent = '0%';

  } catch (error) {
    console.log('Cargando estadísticas desde backend...');
    // Mantener placeholders hasta que el backend esté disponible
    document.getElementById('stat-vendedores').textContent = '0';
    document.getElementById('stat-equipos').textContent = '0';
    document.getElementById('stat-ventas').textContent = '$0.00';
    document.getElementById('stat-meta').textContent = '0%';
  }
}

function renderEquipos(equipos) {
  const tbody = document.getElementById('tabla-equipos');
  const loadingDiv = document.getElementById('loading-equipos');
  
  if (!equipos || equipos.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="px-6 py-8 text-center text-gray-400">
          <div class="flex flex-col items-center">
            <svg class="h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            <p class="text-lg font-medium">No hay equipos registrados</p>
            <p class="text-sm">Haz clic en "Nuevo Equipo" para agregar el primer dispositivo</p>
          </div>
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = equipos.map(equipo => {
      const estadoColor = getEstadoColor(equipo.estado);
      const costoFormateado = equipo.costo ? `$${parseFloat(equipo.costo).toFixed(2)}` : 'N/A';
      const externoIcon = equipo.externo ? '🌐' : '🏢';
      const externoText = equipo.externo ? 'Externo' : 'Interno';
      
      return `
        <tr class="hover:bg-gray-700">
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <div class="h-10 w-10 rounded bg-gray-600 flex items-center justify-center mr-3">
                <span class="text-white text-lg">📱</span>
              </div>
              <div>
                <div class="text-sm font-medium text-white">${equipo.marca} ${equipo.modelo}</div>
                <div class="text-sm text-gray-400">${equipo.tipo} • ID: ${equipo.id}</div>
              </div>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-mono text-white">${equipo.imei}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-white font-semibold">${costoFormateado}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm text-white">${getVendedorNombre(equipo.vendedor_id)}</div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 py-1 text-xs font-semibold rounded-full ${estadoColor}">
              ${getEstadoTexto(equipo.estado)}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center">
              <span class="text-sm mr-1">${externoIcon}</span>
              <span class="text-sm text-gray-300">${externoText}</span>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <button onclick="editarEquipo(${equipo.id})" class="text-blue-400 hover:text-blue-300 mr-3"
              ✏️ Editar
            </button>
            <button onclick="eliminarEquipo(${equipo.id})" class="text-red-400 hover:text-red-300">
              🗑️ Eliminar
            </button>
          </td>
        </tr>
      `;
    }).join('');
  }
  
  loadingDiv.style.display = 'none';
}

function getEstadoColor(estado) {
  switch(estado) {
    case 'activo': return 'bg-green-600 text-white';
    case 'inactivo': return 'bg-yellow-600 text-white';
    case 'mantenimiento': return 'bg-blue-600 text-white';
    case 'perdido': return 'bg-red-600 text-white';
    case 'dañado': return 'bg-red-700 text-white';
    case 'retirado': return 'bg-gray-600 text-white';
    default: return 'bg-gray-600 text-white';
  }
}

function getEstadoTexto(estado) {
  switch(estado) {
    case 'activo': return '🟢 Activo';
    case 'inactivo': return '🟡 Inactivo';
    case 'mantenimiento': return '🔧 Mantenimiento';
    case 'perdido': return '❌ Perdido';
    case 'dañado': return '💥 Dañado';
    case 'retirado': return '📦 Retirado';
    default: return estado;
  }
}

function getVendedorNombre(vendedorId) {
  // Esta función debería consultar los vendedores desde el backend
  // Por ahora retorna placeholder hasta que se implemente la API
  return vendedorId ? `Vendedor ${vendedorId}` : 'Sin asignar';
}

function showLoadingEquipos() {
  const loadingDiv = document.getElementById('loading-equipos');
  const tbody = document.getElementById('tabla-equipos');
  tbody.innerHTML = '';
  loadingDiv.style.display = 'block';
}

function updateEquiposCount(count) {
  const countElement = document.getElementById('equipos-count');
  if (countElement) {
    countElement.textContent = `${count} equipo${count !== 1 ? 's' : ''}`;
  }
}

function showErrorEquipos(message) {
  const tbody = document.getElementById('tabla-equipos');
  const loadingDiv = document.getElementById('loading-equipos');
  
  tbody.innerHTML = `
    <tr>
      <td colspan="6" class="px-6 py-8 text-center text-red-400">
        <div class="flex flex-col items-center">
          <svg class="h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <p class="text-lg font-medium">${message}</p>
          <button onclick="cargarEquipos()" class="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            🔄 Reintentar
          </button>
        </div>
      </td>
    </tr>
  `;
  loadingDiv.style.display = 'none';
}

async function editarEquipo(id) {
  try {
    // Obtener los datos del equipo
    const response = await fetch(`http://localhost:9999/api/gestion/equipos`);
    const data = await response.json();
    
    if (data.success) {
      const equipo = data.data.find(e => e.id == id);
      if (equipo) {
        // Abrir el formulario y cargar los datos
        abrirFormularioEquipo();
        
        // Llenar el formulario con los datos existentes
        setTimeout(() => {
          document.getElementById('equipo_marca').value = equipo.marca || '';
          document.getElementById('equipo_modelo').value = equipo.modelo || '';
          document.getElementById('equipo_tipo').value = equipo.tipo || '';
          document.getElementById('equipo_imei').value = equipo.imei || '';
          document.getElementById('equipo_costo').value = equipo.costo || '';
          document.getElementById('equipo_externo').checked = equipo.externo || false;
          document.getElementById('equipo_vendedor').value = equipo.vendedor_id || '';
          document.getElementById('equipo_estado').value = equipo.estado || '';
          document.getElementById('equipo_serie').value = equipo.numero_serie || '';
          document.getElementById('equipo_fecha').value = equipo.fecha_adquisicion || '';
          document.getElementById('equipo_observaciones').value = equipo.observaciones || '';
          
          // Cambiar el comportamiento del formulario para actualización
          const form = document.getElementById('form-equipo');
          form.setAttribute('data-edit-id', id);
          
          const submitBtn = form.querySelector('button[type="submit"]');
          submitBtn.innerHTML = '💾 Actualizar Equipo';
          submitBtn.classList.remove('bg-green-600', 'hover:bg-green-700');
          submitBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }, 100);
        
      } else {
        showErrorMessage('❌ Equipo no encontrado');
      }
    }
  } catch (error) {
    console.error('Error cargando equipo:', error);
    showErrorMessage('❌ Error de conexión al servidor');
  }
}

async function eliminarEquipo(id) {
  if (!confirm('¿Estás seguro de eliminar este equipo? Esta acción no se puede deshacer.')) {
    return;
  }

  try {
    const response = await fetch(`http://localhost:9999/api/gestion/equipos/${id}`, {
      method: 'DELETE'
    });

    const data = await response.json();

    if (data.success) {
      showSuccessMessage('✅ Equipo eliminado correctamente');
      cargarEquipos(); // Recargar la lista
    } else {
      showErrorMessage('❌ Error: ' + data.message);
    }
  } catch (error) {
    console.error('Error eliminando equipo:', error);
    showErrorMessage('❌ Error de conexión al servidor');
  }
}

// === FUNCIONES DE VENDEDORES ===
async function cargarVendedores() {
  try {
    showLoadingVendedores();
    const response = await fetch('http://localhost:9999/api/gestion/vendedores');
    const data = await response.json();
    
    if (data.success) {
      renderVendedores(data.data);
      updateVendedoresCount(data.data.length);
    } else {
      showErrorVendedores('Error cargando vendedores');
    }
  } catch (error) {
    console.error('Error cargando vendedores:', error);
    showErrorVendedores('No se pudo conectar al servidor');
  }
}

async function guardarVendedor(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  
  try {
    // Mostrar loading en el botón
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '⏳ Guardando...';
    submitBtn.disabled = true;

    // Enviar FormData directamente para soportar archivos
    const response = await fetch('http://localhost:9999/api/gestion/vendedores', {
      method: 'POST',
      body: formData // No establecer Content-Type, el navegador lo hará automáticamente para multipart/form-data
    });

    const data = await response.json();

    if (data.success) {
      // Mostrar éxito
      showSuccessMessage('✅ Vendedor guardado correctamente');
      cerrarFormularioVendedor();
      cargarVendedores(); // Recargar lista
    } else {
      showErrorMessage('❌ Error: ' + data.message);
    }

    // Restaurar botón
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;

  } catch (error) {
    console.error('Error guardando vendedor:', error);
    showErrorMessage('❌ Error de conexión al servidor');
    
    // Restaurar botón
    const submitBtn = event.target.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '💾 Guardar Vendedor';
    submitBtn.disabled = false;
  }
}

function renderVendedores(vendedores) {
  const tbody = document.getElementById('tabla-vendedores');
  const loadingDiv = document.getElementById('loading-vendedores');
  
  if (!vendedores || vendedores.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="px-6 py-8 text-center text-gray-400">
          <div class="flex flex-col items-center">
            <svg class="h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
            </svg>
            <p class="text-lg font-medium">No hay vendedores registrados</p>
            <p class="text-sm">Haz clic en "Nuevo Vendedor" para agregar el primer vendedor</p>
          </div>
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = vendedores.map(vendedor => `
      <tr class="hover:bg-gray-700">
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <div class="h-10 w-10 rounded-full overflow-hidden border border-gray-600 bg-blue-600 flex-shrink-0">
              ${vendedor.foto_url ? 
                `<img src="${vendedor.foto_url}" alt="${vendedor.nombre}" class="h-full w-full object-cover">` :
                `<div class="h-full w-full bg-blue-600 flex items-center justify-center">
                  <span class="text-white font-medium text-sm">${vendedor.nombre.charAt(0)}${vendedor.apellido ? vendedor.apellido.charAt(0) : ''}</span>
                </div>`
              }
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-white">${vendedor.nombre} ${vendedor.apellido || ''}</div>
              <div class="text-sm text-gray-400">ID: ${vendedor.id}</div>
            </div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-white">${vendedor.email}</div>
          <div class="text-sm text-gray-400">${vendedor.telefono}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm text-white">${vendedor.equipo_nombre || 'Sin asignar'}</div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span class="px-2 py-1 text-xs font-semibold rounded-full ${vendedor.activo ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}">
            ${vendedor.activo ? 'Activo' : 'Inactivo'}
          </span>
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
          <button onclick="editarVendedor(${vendedor.id})" class="text-blue-400 hover:text-blue-300 mr-3">
            ✏️ Editar
          </button>
          <button onclick="eliminarVendedor(${vendedor.id})" class="text-red-400 hover:text-red-300">
            🗑️ Eliminar
          </button>
        </td>
      </tr>
    `).join('');
  }
  
  loadingDiv.style.display = 'none';
}

function showLoadingVendedores() {
  const loadingDiv = document.getElementById('loading-vendedores');
  const tbody = document.getElementById('tabla-vendedores');
  tbody.innerHTML = '';
  loadingDiv.style.display = 'block';
}

function updateVendedoresCount(count) {
  const countElement = document.getElementById('vendedores-count');
  if (countElement) {
    countElement.textContent = `${count} vendedor${count !== 1 ? 'es' : ''}`;
  }
}

function showErrorVendedores(message) {
  const tbody = document.getElementById('tabla-vendedores');
  const loadingDiv = document.getElementById('loading-vendedores');
  
  tbody.innerHTML = `
    <tr>
      <td colspan="5" class="px-6 py-8 text-center text-red-400">
        <div class="flex flex-col items-center">
          <svg class="h-12 w-12 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
          </svg>
          <p class="text-lg font-medium">${message}</p>
          <button onclick="cargarVendedores()" class="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
            🔄 Reintentar
          </button>
        </div>
      </td>
    </tr>
  `;
  loadingDiv.style.display = 'none';
}

function editarVendedor(id) {
  console.log('Editar vendedor:', id);
  showInfoMessage('🔧 Función de edición en desarrollo...');
}

function eliminarVendedor(id) {
  if (confirm('¿Estás seguro de eliminar este vendedor?')) {
    console.log('Eliminar vendedor:', id);
    showInfoMessage('🔧 Función de eliminación en desarrollo...');
  }
}

// Funciones de notificación
function showSuccessMessage(message) {
  showNotification(message, 'success');
}

function showErrorMessage(message) {
  showNotification(message, 'error');
}

function showInfoMessage(message) {
  showNotification(message, 'info');
}

function showNotification(message, type = 'info') {
  // Crear elemento de notificación
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 transition-all duration-300 ${
    type === 'success' ? 'bg-green-600 text-white' :
    type === 'error' ? 'bg-red-600 text-white' :
    'bg-blue-600 text-white'
  }`;
  notification.innerHTML = message;
  
  document.body.appendChild(notification);
  
  // Remover después de 3 segundos
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// === FUNCIONES DE API (PLACEHOLDERS) ===
async function cargarDatos(endpoint) {
  console.log(`Cargando datos de: ${endpoint}`);
  return { mensaje: 'Datos simulados' };
}

async function guardarDatos(endpoint, data) {
  console.log(`Guardando datos en: ${endpoint}`, data);
  return { exito: true };
}

async function verificarConexionBackend() {
  console.log('Verificando conexión con backend...');
  return { conectado: false };
}

// === INICIALIZACIÓN ===
window.navegarA = navegarA;
window.abrirFormularioVendedor = abrirFormularioVendedor;
window.cerrarFormularioVendedor = cerrarFormularioVendedor;
window.cargarDatos = cargarDatos;
window.guardarDatos = guardarDatos;
window.verificarConexionBackend = verificarConexionBackend;
window.hasPermission = hasPermission;
window.cargarEstadisticasDashboard = cargarEstadisticasDashboard;
// Funciones de vendedores
window.cargarVendedores = cargarVendedores;
window.guardarVendedor = guardarVendedor;
window.editarVendedor = editarVendedor;
window.eliminarVendedor = eliminarVendedor;
window.previewPhoto = previewPhoto;
// Funciones de equipos
window.abrirFormularioEquipo = abrirFormularioEquipo;
window.cerrarFormularioEquipo = cerrarFormularioEquipo;
window.cargarEquipos = cargarEquipos;
window.guardarEquipo = guardarEquipo;
window.editarEquipo = editarEquipo;
window.eliminarEquipo = eliminarEquipo;

// === RENDERIZAR LA APLICACIÓN ===
document.querySelector('#app').innerHTML = `
  <div class="min-h-screen bg-gray-900 flex">
    <!-- Sidebar Navigation -->
    <div class="w-64 bg-gray-800 shadow-lg border-r border-gray-700">
      <div class="flex flex-col h-full">
        <!-- Logo/Header -->
        <div class="flex items-center justify-center h-16 px-4 bg-gray-900 border-b border-gray-700">
          <h1 class="text-xl font-bold text-white">🚀 TangoUI</h1>
          <span class="ml-2 px-2 py-1 bg-green-600 text-white text-xs rounded-full">FIJO</span>
        </div>
        
        <!-- Navigation Menu -->
        <nav class="flex-1 px-2 py-4 space-y-1 overflow-y-auto" id="navigation-menu">
          ${renderMenuItems()}
        </nav>
        
        <!-- Footer del Sidebar -->
        <div class="px-2 py-4 border-t border-gray-700">
          <div class="flex items-center px-3 py-2">
            <div class="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <span class="text-xs text-gray-400">Sistema Oficial ✅</span>
          </div>
          <div class="text-xs text-gray-500 px-3" id="modules-count">
            ${getUserInfo().modulosVisibles}/${getUserInfo().totalModulos} Módulos Visibles
          </div>
          <div class="text-xs text-blue-400 px-3 mt-1">
            Usuario: ${getUserInfo().usuario} (${getUserInfo().tipo})
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top Bar -->
      <header class="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div class="flex justify-between items-center">
          <div>
            <h1 class="text-xl font-semibold text-white">Dashboard</h1>
            <p class="text-sm text-gray-400">ESTRUCTURA OFICIAL ✅</p>
          </div>
          <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors">
            🔧 Actualizar
          </button>
        </div>
      </header>

      <!-- Content -->
      <main id="content-area" class="flex-1 overflow-y-auto bg-gray-900 p-6">
        <!-- El contenido se renderiza aquí dinámicamente -->
      </main>
    </div>
  </div>
`;

// === FUNCIONES DE CONTENIDO PARA MÓDULOS DEL MENÚ LATERAL ===

function getGenerarVentaContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">🛒 Generar Venta</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de generación de ventas en desarrollo...</p>
      </div>
    </div>
  `;
}

function getPymesContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">🏪 Pymes</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de Pymes en desarrollo...</p>
      </div>
    </div>
  `;
}

function getActivacionesContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">👥 Activaciones</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de activaciones en desarrollo...</p>
      </div>
    </div>
  `;
}

function getConsultarBaseGeneralContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">💰 Consultar Base General</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de consulta de base general en desarrollo...</p>
      </div>
    </div>
  `;
}

function getConsultarBaseFijoContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">💰 Consultar Base General FIJO</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de consulta de base FIJO en desarrollo...</p>
      </div>
    </div>
  `;
}

function getPagoFacturaContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">💳 Pago Factura</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de pago de facturas en desarrollo...</p>
      </div>
    </div>
  `;
}

function getDiscrepanciasPagoContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">📋 Discrepancias de Pago de factura</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de discrepancias de pago en desarrollo...</p>
      </div>
    </div>
  `;
}

function getInventarioContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">📦 Inventario</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de inventario en desarrollo...</p>
      </div>
    </div>
  `;
}

function getAccesoriosContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">🎧 Accesorios</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de accesorios en desarrollo...</p>
      </div>
    </div>
  `;
}

function getDocumentosContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">📁 Documentos</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de documentos en desarrollo...</p>
      </div>
    </div>
  `;
}

function getCuentasClientesContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">👥 Cuentas Clientes</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de cuentas de clientes en desarrollo...</p>
      </div>
    </div>
  `;
}

function getCRMContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">🎯 CRM</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de CRM en desarrollo...</p>
      </div>
    </div>
  `;
}

function getSMSContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">📱 SMS</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de SMS en desarrollo...</p>
      </div>
    </div>
  `;
}

function getFidelizacionContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">🏆 Programa de Fidelización</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de programa de fidelización en desarrollo...</p>
      </div>
    </div>
  `;
}

function getConsultaMesesContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">📅 Consulta Meses</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de consulta de meses en desarrollo...</p>
      </div>
    </div>
  `;
}

function getPoncheContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">⏰ Ponche</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de ponche en desarrollo...</p>
      </div>
    </div>
  `;
}

function getCajaContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">💳 Caja</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de caja en desarrollo...</p>
      </div>
    </div>
  `;
}

function getDocumentosAdminContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">📋 Documentos Administrador</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de documentos de administrador en desarrollo...</p>
      </div>
    </div>
  `;
}

function getConciliacionComisionesContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">🔄 Conciliación Comisiones</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de conciliación de comisiones en desarrollo...</p>
      </div>
    </div>
  `;
}

function getObjetivosVentaContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">📊 Objetivos de Venta</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de objetivos de venta en desarrollo...</p>
      </div>
    </div>
  `;
}

function getAdministracionContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">⚙️ Administración</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de administración en desarrollo...</p>
      </div>
    </div>
  `;
}

function getPermisosContent() {
  return `
    <div class="space-y-6">
      <h1 class="text-3xl font-bold text-white">🔐 Permisos</h1>
      <div class="text-center py-8">
        <p class="text-gray-400">Módulo de permisos en desarrollo...</p>
      </div>
    </div>
  `;
}

// === NUEVOS AGENTES ESPECIALIZADOS ===

function getActivacionesAgenteContent() {
  return `
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">
          ← Volver a Gestión
        </button>
        <h2 class="text-2xl font-bold text-white">🔄 Agente de Activaciones</h2>
      </div>
      
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 class="text-lg font-medium text-white mb-4">📱 Sistema de Activaciones</h3>
        <p class="text-gray-400 mb-4">Formulario de Registro de Activaciones - Gestión de activaciones de servicios y equipos</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button class="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
            ➕ Nueva Activación
          </button>
          <button class="p-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
            📋 Consultar Activaciones
          </button>
        </div>
      </div>
    </div>
  `;
}

function getCambiosAgenteContent() {
  return `
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">
          ← Volver a Gestión
        </button>
        <h2 class="text-2xl font-bold text-white">🔄 Agente de Cambios</h2>
      </div>
      
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 class="text-lg font-medium text-white mb-4">🔄 Sistema de Cambios</h3>
        <p class="text-gray-400 mb-4">Formulario de Registro de Cambios - Gestión de cambios de equipos y servicios</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button class="p-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition-colors">
            🔄 Solicitar Cambio
          </button>
          <button class="p-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors">
            📊 Historial de Cambios
          </button>
        </div>
      </div>
    </div>
  `;
}

function getInventarioAgenteContent() {
  return `
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">
          ← Volver a Gestión
        </button>
        <h2 class="text-2xl font-bold text-white">📦 Agente de Inventario</h2>
      </div>
      
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 class="text-lg font-medium text-white mb-4">📦 Sistema de Inventario</h3>
        <p class="text-gray-400 mb-4">Formulario de Registro de Inventario - Control de stock y productos</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button class="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
            📦 Ver Stock
          </button>
          <button class="p-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
            ➕ Agregar Producto
          </button>
          <button class="p-4 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors">
            📊 Reportes
          </button>
        </div>
      </div>
    </div>
  `;
}

function getSubsidiosAgenteContent() {
  return `
    <div class="space-y-6">
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">
          ← Volver a Gestión
        </button>
        <h2 class="text-2xl font-bold text-white">💰 Agente de Subsidios</h2>
      </div>
      
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 class="text-lg font-medium text-white mb-4">💰 Sistema de Subsidios</h3>
        <p class="text-gray-400 mb-4">Formulario de Registro de Subsidios - Gestión de subsidios y ayudas</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button class="p-4 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors">
            💰 Nuevo Subsidio
          </button>
          <button class="p-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
            📋 Consultar Subsidios
          </button>
        </div>
      </div>
    </div>
  `;
}

// === AGENTE EQUIPOS AVANZADO ===
function getAgenteEquiposContent() {
  return `
    <div class="space-y-6 max-w-4xl mx-auto">
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">
          ← Volver a Gestión
        </button>
        <h2 class="text-2xl font-bold text-white">📱 Agente de Equipos</h2>
        <span class="px-3 py-1 bg-green-600 text-white rounded-full text-sm">CON VALIDACIONES IA ✅</span>
      </div>
      
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 class="text-lg font-medium text-white mb-4">📋 Registro de Equipos</h3>
        <p class="text-gray-400 mb-6">Formulario inteligente con validación de IMEI y gestión completa de equipos</p>
        
        <form id="form-agente-equipos" class="space-y-4" onsubmit="event.preventDefault(); manejarRegistroEquipo();">
          <!-- Fila 1: Código y Modelo -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Código *</label>
              <input 
                type="text" 
                name="codigo" 
                placeholder="Ej: EQ001" 
                class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Modelo *</label>
              <input 
                type="text" 
                name="modelo" 
                placeholder="Ej: iPhone 14 Pro" 
                class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <!-- Fila 2: Marca y Costo -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Marca *</label>
              <input 
                type="text" 
                name="marca" 
                placeholder="Ej: Apple" 
                class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Costo *</label>
              <input 
                type="number" 
                name="costo" 
                placeholder="0.00" 
                step="0.01"
                class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <!-- Fila 3: Tipo de Ingreso y Tienda -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Tipo de Ingreso</label>
              <select 
                name="tipoIngreso" 
                class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="externo">Externo</option>
                <option value="interno">Interno</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Tienda de Ingreso</label>
              <input 
                type="text" 
                name="tienda" 
                placeholder="Ej: Sucursal Centro" 
                class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Fila 4: Factura y Fecha -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Factura de Compra</label>
              <input 
                type="text" 
                name="factura" 
                placeholder="Ej: FAC-2025-001" 
                class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Fecha de Compra</label>
              <input 
                type="date" 
                name="fechaCompra" 
                value="${new Date().toISOString().split('T')[0]}"
                class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- IMEI con validación especial -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">IMEI (15 dígitos) *</label>
            <input 
              type="text" 
              name="imei" 
              placeholder="123456789012345" 
              maxlength="15"
              oninput="validarIMEITiempoReal()"
              class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <span id="error-imei" class="text-red-400 text-sm" style="display: none;"></span>
          </div>

          <!-- Historial -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Historial de Movimientos</label>
            <textarea 
              name="historial" 
              placeholder="Comentarios adicionales, historial de reparaciones, etc..."
              rows="3"
              class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
            ></textarea>
          </div>

          <!-- Botón de registro -->
          <div class="flex justify-end">
            <button 
              type="submit"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              📱 Registrar Equipo
            </button>
          </div>
        </form>

        <!-- Alerta -->
        <div id="alerta-agente-equipos" style="display: none;" class="mt-4"></div>
      </div>

      <!-- Panel de información -->
      <div class="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h4 class="text-sm font-medium text-white mb-2">🤖 Funciones del Agente IA</h4>
        <ul class="text-sm text-gray-400 space-y-1">
          <li>• Validación automática de IMEI (15 dígitos)</li>
          <li>• Control de campos obligatorios</li>
          <li>• Historial para trazabilidad completa</li>
          <li>• Integración con sistema de inventario</li>
        </ul>
      </div>
    </div>
  `;
}

// === FUNCIONES DEL AGENTE DE EQUIPOS ===
function manejarRegistroEquipo() {
  const form = document.getElementById('form-agente-equipos');
  const formDataObj = new FormData(form);
  
  const imei = formDataObj.get('imei');
  function validarIMEI(imei) {
    if (!imei || (imei.length !== 15 && imei.length !== 20)) {
      return "El IMEI debe tener exactamente 15 o 20 dígitos.";
    }
    if (!/^\d{15}$|^\d{20}$/.test(imei)) {
      return "El IMEI solo debe contener números.";
    }
    return null;
  }
  
  const error = validarIMEI(imei);
  const alertaDiv = document.getElementById('alerta-agente-equipos');
  
  if (error) {
    alertaDiv.className = 'p-4 border-l-4 rounded-md bg-red-900 border-red-500 text-red-200';
    alertaDiv.textContent = error;
    alertaDiv.style.display = 'block';
    return;
  }

  // Validar campos requeridos
  const camposRequeridos = ['codigo', 'modelo', 'marca', 'costo', 'imei'];
  for (let campo of camposRequeridos) {
    if (!formDataObj.get(campo)) {
      alertaDiv.className = 'p-4 border-l-4 rounded-md bg-yellow-900 border-yellow-500 text-yellow-200';
      alertaDiv.textContent = `El campo ${campo} es requerido.`;
      alertaDiv.style.display = 'block';
      return;
    }
  }

  // Simular registro exitoso
  alertaDiv.className = 'p-4 border-l-4 rounded-md bg-green-900 border-green-500 text-green-200';
  alertaDiv.textContent = '✅ Equipo registrado correctamente en el sistema.';
  alertaDiv.style.display = 'block';
  
  // Limpiar formulario después de 2 segundos
  setTimeout(() => {
    form.reset();
    alertaDiv.style.display = 'none';
  }, 2000);
}

function validarIMEITiempoReal() {
  const imeiInput = document.querySelector('input[name="imei"]');
  const imei = imeiInput.value;
  
  function validarIMEI(imei) {
    if (!imei || (imei.length !== 15 && imei.length !== 20)) {
      return "El IMEI debe tener exactamente 15 o 20 dígitos.";
    }
    if (!/^\d{15}$|^\d{20}$/.test(imei)) {
      return "El IMEI solo debe contener números.";
    }
    return null;
  }
  
  const error = validarIMEI(imei);
  const errorSpan = document.getElementById('error-imei');
  if (error && imei.length > 0) {
    errorSpan.textContent = error;
    errorSpan.style.display = 'block';
    imeiInput.style.borderColor = '#ef4444';
  } else {
    errorSpan.style.display = 'none';
    imeiInput.style.borderColor = '#6b7280';
  }
}

// Inicializar con Dashboard
navegarA('dashboard');
