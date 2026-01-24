// Sistema Claro - TangoUI v2.3.0
// Sistema de Personalización Completo

const APP_VERSION = '2.3.0';
const currentUser = { nombre: 'Gabriel', rol: 'CREATOR', email: 'gabriel@tangoui.com' };

// Configuración de temas guardada por usuario
const userConfig = {
  theme: localStorage.getItem('theme') || 'dark',
  colorPalette: localStorage.getItem('colorPalette') || 'blue',
  bgIntensity: parseInt(localStorage.getItem('bgIntensity') || '900'),
  highlightIntensity: parseInt(localStorage.getItem('highlightIntensity') || '100'),
  textMode: localStorage.getItem('textMode') || 'auto' // auto, light, dark
};

// Paletas de colores disponibles
const colorPalettes = {
  gray: { name: 'Gris', bg: 'slate', accent: 'gray' },
  lightGray: { name: 'Gris Claro', bg: 'gray', accent: 'slate' },
  blue: { name: 'Azul', bg: 'blue', accent: 'sky' },
  green: { name: 'Verde', bg: 'green', accent: 'emerald' },
  red: { name: 'Rojo', bg: 'red', accent: 'rose' },
  purple: { name: 'Morado', bg: 'purple', accent: 'violet' }
};

// Función para calcular contraste y elegir color de texto
function getTextColor(bgIntensity) {
  if (userConfig.textMode === 'light') return 'text-white';
  if (userConfig.textMode === 'dark') return 'text-gray-900';
  // Auto: si fondo es claro (50-500) usar texto oscuro, si es oscuro (600-950) usar texto claro
  return bgIntensity <= 500 ? 'text-gray-900' : 'text-white';
}

function getTextMuted(bgIntensity) {
  return bgIntensity <= 500 ? 'text-gray-600' : 'text-gray-300';
}

function applyTheme() {
  const palette = colorPalettes[userConfig.colorPalette];
  const textColor = getTextColor(userConfig.bgIntensity);
  const textMuted = getTextMuted(userConfig.bgIntensity);

  document.documentElement.style.setProperty('--bg-color', `var(--${palette.bg}-${userConfig.bgIntensity})`);
  document.documentElement.style.setProperty('--sidebar-color', `var(--${palette.bg}-${Math.min(userConfig.bgIntensity + 50, 950)})`);
  document.documentElement.style.setProperty('--accent-color', `var(--${palette.accent}-${userConfig.highlightIntensity})`);

  document.body.className = `bg-${palette.bg}-${userConfig.bgIntensity} ${textColor}`;

  // Guardar preferencias
  Object.keys(userConfig).forEach(key => localStorage.setItem(key, userConfig[key]));
}

window.setColorPalette = function (palette) {
  userConfig.colorPalette = palette;
  applyTheme();
  renderContent();
}

window.setBgIntensity = function (value) {
  userConfig.bgIntensity = parseInt(value);
  applyTheme();
  renderContent();
}

window.setHighlightIntensity = function (value) {
  userConfig.highlightIntensity = parseInt(value);
  applyTheme();
}

window.setTextMode = function (mode) {
  userConfig.textMode = mode;
  applyTheme();
  renderContent();
}

// Módulos del sistema
const modules = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard', roles: ['CREATOR', 'ADMIN', 'AGENT'] },
  { id: 'centroControl', icon: '🎛️', label: 'Centro de Control', roles: ['CREATOR', 'ADMIN'] },
  { id: 'agentesIA', icon: '🤖', label: 'Agentes IA', roles: ['CREATOR'], badge: '🔒' },
  { id: 'personalizacion', icon: '🎨', label: 'Personalización', roles: ['CREATOR', 'ADMIN', 'AGENT'] }
];

// Tabs del Centro de Control
const centroControlTabs = [
  { id: 'equipos', icon: '📱', label: 'Gestión de Equipos', color: 'blue' },
  { id: 'comisiones', icon: '💰', label: 'Gestión de Comisiones', color: 'green' },
  { id: 'equipo', icon: '👥', label: 'Gestión de Usuarios', color: 'purple' },
  { id: 'planes', icon: '📋', label: 'Gestión de Planes', color: 'orange' },
  { id: 'ivu', icon: '🧾', label: 'Gestión de IVU', color: 'red' },
  { id: 'contratos', icon: '📄', label: 'Tipos de Contratos', color: 'cyan' },
  { id: 'tiendas', icon: '🏪', label: 'Gestión de Tiendas', color: 'pink' }
];

let currentModule = 'centroControl';
let currentCentroControlTab = 'equipos';

// Función para cambiar tabs del Centro de Control
window.cambiarTab = function (tabId) {
  currentCentroControlTab = tabId;
  renderContent();
};

function renderMenu() {
  const menu = document.getElementById('menu');
  const textColor = getTextColor(userConfig.bgIntensity);
  const palette = colorPalettes[userConfig.colorPalette];

  menu.innerHTML = modules
    .filter(m => m.roles.includes(currentUser.rol))
    .map(m => `
      <button onclick="navigate('${m.id}')" 
              class="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors ${textColor} ${currentModule === m.id ? `bg-${palette.accent}-600` : ''}"
              id="menu-${m.id}">
        <span class="text-xl">${m.icon}</span>
        <span class="flex-1 text-left">${m.label}</span>
        ${m.badge ? `<span class="text-xs">${m.badge}</span>` : ''}
      </button>
    `).join('');
}

window.navigate = function (module) {
  currentModule = module;
  renderMenu();
  renderContent();
}

function renderContent() {
  const content = document.getElementById('content');
  const textColor = getTextColor(userConfig.bgIntensity);
  const textMuted = getTextMuted(userConfig.bgIntensity);
  const palette = colorPalettes[userConfig.colorPalette];

  switch (currentModule) {
    case 'personalizacion':
      content.innerHTML = `
        <h1 class="text-4xl font-bold mb-8 bg-gradient-to-r from-${palette.accent}-400 to-${palette.accent}-600 bg-clip-text text-transparent">🎨 Personalización</h1>
        
        <div class="max-w-2xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <h2 class="text-2xl font-bold mb-6 ${textColor}">Regulador de Tonalidad</h2>
          
          <!-- Selector de Paleta -->
          <div class="mb-8">
            <div class="text-sm ${textMuted} mb-3">PALETA DE COLORES</div>
            <div class="grid grid-cols-6 gap-3">
              ${Object.entries(colorPalettes).map(([key, pal]) => `
                <button onclick="setColorPalette('${key}')" 
                        class="h-12 rounded-xl border-2 ${userConfig.colorPalette === key ? 'border-white scale-110' : 'border-transparent opacity-50'} 
                               bg-gradient-to-br from-${pal.bg}-600 to-${pal.bg}-800 hover:scale-105 transition-all"
                        title="${pal.name}">
                </button>
              `).join('')}
            </div>
          </div>
          
          <!-- Intensidad de Fondo -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-3">
              <div class="text-sm ${textMuted}">INTENSIDAD DE FONDO</div>
              <div class="text-lg font-bold ${textColor}">${userConfig.bgIntensity}</div>
            </div>
            <input type="range" min="50" max="950" step="50" value="${userConfig.bgIntensity}"
                   onchange="setBgIntensity(this.value)"
                   class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer">
            <div class="flex justify-between text-xs ${textMuted} mt-1">
              <span>Claro (50)</span>
              <span>Oscuro (950)</span>
            </div>
          </div>
          
          <!-- Intensidad de Resaltado -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-3">
              <div class="text-sm ${textMuted}">INTENSIDAD DE ELEMENTOS DESTACADOS</div>
              <div class="text-lg font-bold ${textColor}">${userConfig.highlightIntensity}</div>
            </div>
            <input type="range" min="100" max="900" step="100" value="${userConfig.highlightIntensity}"
                   onchange="setHighlightIntensity(this.value)"
                   class="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer">
            <div class="flex justify-between text-xs ${textMuted} mt-1">
              <span>Sutil (100)</span>
              <span>Intenso (900)</span>
            </div>
          </div>
          
          <!-- Modo de Texto -->
          <div class="mb-6">
            <div class="text-sm ${textMuted} mb-3">CONTRASTE DE TEXTO</div>
            <div class="grid grid-cols-3 gap-3">
              ${['auto', 'light', 'dark'].map(mode => `
                <button onclick="setTextMode('${mode}')"
                        class="px-4 py-3 rounded-lg border ${userConfig.textMode === mode ? 'border-white bg-white/10' : 'border-white/20'} hover:bg-white/5 transition-colors ${textColor}">
                  ${mode === 'auto' ? '🔄 Auto' : mode === 'light' ? '💡 Claro' : '🌙 Oscuro'}
                </button>
              `).join('')}
            </div>
          </div>
          
          <div class="text-xs ${textMuted} bg-white/5 rounded-lg p-4">
            <strong>Tip Profesional:</strong> Usa intensidades bajas (50-200) para fondos de lectura y altas (800-950) para elementos destacados o menús de control.
            El modo "Auto" ajusta el texto automáticamente según el fondo elegido.
          </div>
        </div>
      `;
      break;

    case 'centroControl':
      content.innerHTML = `
        <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-${palette.accent}-400 to-${palette.accent}-600 bg-clip-text text-transparent">
          🎛️ Centro de Control
        </h1>
        <p class="${textMuted} mb-8">Sistema Claro - TangoUI | Versión ${APP_VERSION}</p>
        
        <!-- Tabs de Gestión -->
        <div class="flex space-x-2 mb-6 overflow-x-auto pb-2">
          ${centroControlTabs.map(tab => `
            <button onclick="cambiarTab('${tab.id}')"
                    class="flex items-center space-x-2 px-4 py-3 rounded-lg transition-all whitespace-nowrap
                           ${currentCentroControlTab === tab.id
          ? `bg-${tab.color}-600 text-white shadow-lg scale-105`
          : `bg-white/5 ${textColor} hover:bg-white/10`}">
              <span class="text-xl">${tab.icon}</span>
              <span class="font-medium">${tab.label}</span>
            </button>
          `).join('')}
        </div>
        
        <!-- Contenido del Tab Actual -->
        <div class="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          ${getCentroControlTabContent(textColor, textMuted)}
        </div>
      `;
      break;

    case 'agentesIA':
      const agentes = [
        { nombre: 'Equipos', icon: '📱', progreso: 75, estado: 'activo', fase: 'Crítico', reglas: 5, tareas: 12 },
        { nombre: 'Ventas', icon: '🛒', progreso: 45, estado: 'desarrollo', fase: 'Crítico', reglas: 8, tareas: 15 },
        { nombre: 'Comisiones', icon: '💰', progreso: 20, estado: 'planificado', fase: 'Crítico', reglas: 6, tareas: 10 },
        { nombre: 'Inventario', icon: '📦', progreso: 60, estado: 'activo', fase: 'Crítico', reglas: 4, tareas: 8 },
        { nombre: 'Activaciones', icon: '📱', progreso: 55, estado: 'desarrollo', fase: 'Importante', reglas: 5, tareas: 9 },
        { nombre: 'Vendedores', icon: '👥', progreso: 30, estado: 'desarrollo', fase: 'Importante', reglas: 4, tareas: 7 },
        { nombre: 'Subsidios', icon: '💵', progreso: 40, estado: 'desarrollo', fase: 'Importante', reglas: 5, tareas: 6 },
        { nombre: 'Metas', icon: '🎯', progreso: 25, estado: 'planificado', fase: 'Importante', reglas: 4, tareas: 8 },
        { nombre: 'Reportes', icon: '📊', progreso: 15, estado: 'planificado', fase: 'Complementario', reglas: 3, tareas: 10 },
        { nombre: 'Cambios', icon: '🔄', progreso: 35, estado: 'desarrollo', fase: 'Complementario', reglas: 4, tareas: 6 },
        { nombre: 'Clientes', icon: '👤', progreso: 10, estado: 'planificado', fase: 'Complementario', reglas: 5, tareas: 8 },
        { nombre: 'Validación', icon: '✅', progreso: 50, estado: 'desarrollo', fase: 'Complementario', reglas: 7, tareas: 5 },
        { nombre: 'Productos', icon: '📦', progreso: 20, estado: 'planificado', fase: 'Complementario', reglas: 4, tareas: 6 },
        { nombre: 'Documentos', icon: '📄', progreso: 5, estado: 'planificado', fase: 'Avanzado', reglas: 3, tareas: 7 },
        { nombre: 'Administración', icon: '⚙️', progreso: 10, estado: 'planificado', fase: 'Avanzado', reglas: 5, tareas: 9 },
        { nombre: 'Permisos', icon: '🔐', progreso: 15, estado: 'planificado', fase: 'Avanzado', reglas: 6, tareas: 8 },
        { nombre: 'Personal', icon: '🤖', progreso: 30, estado: 'desarrollo', fase: 'Avanzado', reglas: 10, tareas: 20 }
      ];

      content.innerHTML = `
        <div class="bg-red-900/30 border-2 border-red-500 rounded-xl p-4 mb-6 flex items-center space-x-3">
          <div class="text-3xl">🔒</div>
          <div>
            <div class="text-red-400 font-bold text-lg">CONFIDENCIAL - EXCLUSIVO CREATOR (Gabriel)</div>
            <div class="text-red-300 text-sm">Este panel NO es visible para clientes que compren el sistema</div>
          </div>
        </div>
        
        <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-${palette.accent}-400 to-${palette.accent}-600 bg-clip-text text-transparent">
          🤖 Centro de Control de Agentes IA
        </h1>
        <p class="${textMuted} mb-8">Sistema Claro - TangoUI | Versión ${APP_VERSION}</p>
        
        <!-- Estadísticas -->
        <div class="grid grid-cols-5 gap-4 mb-8">
          <div class="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6">
            <div class="text-blue-200 text-sm mb-1">Total Agentes</div>
            <div class="text-4xl font-bold">17</div>
          </div>
          <div class="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6">
            <div class="text-green-200 text-sm mb-1">Activos</div>
            <div class="text-4xl font-bold">${agentes.filter(a => a.estado === 'activo').length}</div>
          </div>
          <div class="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl p-6">
            <div class="text-yellow-200 text-sm mb-1">En Desarrollo</div>
            <div class="text-4xl font-bold">${agentes.filter(a => a.estado === 'desarrollo').length}</div>
          </div>
          <div class="bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl p-6">
            <div class="text-gray-200 text-sm mb-1">Planificados</div>
            <div class="text-4xl font-bold">${agentes.filter(a => a.estado === 'planificado').length}</div>
          </div>
          <div class="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6">
            <div class="text-purple-200 text-sm mb-1">Progreso Global</div>
            <div class="text-4xl font-bold">${Math.round(agentes.reduce((sum, a) => sum + a.progreso, 0) / agentes.length)}%</div>
          </div>
        </div>
        
        <!-- Grid de Agentes -->
        <h2 class="text-2xl font-bold mb-4 ${textColor}">🔴 Agentes del Sistema</h2>
        <div class="grid grid-cols-4 gap-4">
          ${agentes.map(a => `
            <div class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform border border-gray-700 hover:border-${a.estado === 'activo' ? 'green' : 'yellow'}-500">
              <div class="text-4xl mb-4">${a.icon}</div>
              <h3 class="${textColor} font-bold text-lg mb-2">${a.nombre}</h3>
              <div class="text-xs ${textMuted} mb-3">${a.fase} | ${a.reglas} reglas | ${a.tareas} tareas</div>
              <div class="mb-4">
                <div class="flex justify-between text-xs ${textMuted} mb-1">
                  <span>Progreso</span>
                  <span>${a.progreso}%</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-2">
                  <div class="h-2 rounded-full bg-gradient-to-r from-${a.estado === 'activo' ? 'green' : 'yellow'}-500 to-${a.estado === 'activo' ? 'green' : 'yellow'}-700" style="width:${a.progreso}%"></div>
                </div>
              </div>
              <div class="text-xs px-2 py-1 rounded ${a.estado === 'activo' ? 'bg-green-500/20 text-green-400' : a.estado === 'desarrollo' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'}">
                ${a.estado}
              </div>
            </div>
          `).join('')}
        </div>
      `;
      break;

    case 'dashboard':
      content.innerHTML = `
        <h1 class="text-4xl font-bold mb-8 bg-gradient-to-r from-${palette.accent}-400 to-${palette.accent}-600 bg-clip-text text-transparent">Dashboard</h1>
        <div class="grid grid-cols-4 gap-6">
          <div class="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6"><div class="text-blue-200 text-sm mb-2">Ventas</div><div class="text-3xl font-bold text-white">$45,231</div></div>
          <div class="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6"><div class="text-green-200 text-sm mb-2">Inventario</div><div class="text-3xl font-bold text-white">1,234</div></div>
          <div class="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6"><div class="text-purple-200 text-sm mb-2">Agentes</div><div class="text-3xl font-bold text-white">17</div></div>
          <div class="bg-gradient-to-br from-orange-600 to-orange-800 rounded-xl p-6"><div class="text-orange-200 text-sm mb-2">Reportes</div><div class="text-3xl font-bold text-white">89</div></div>
        </div>
      `;
      break;

    default:
      content.innerHTML = `<div class="text-2xl ${textColor}">${modules.find(m => m.id === currentModule)?.icon} ${modules.find(m => m.id === currentModule)?.label} - En desarrollo</div>`;
  }
}

function getCentroControlTabContent(textColor, textMuted) {
  const tab = centroControlTabs.find(t => t.id === currentCentroControlTab);

  const contents = {
    equipos: `
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold ${textColor}">${tab.icon} ${tab.label}</h2>
        <button onclick="location.reload()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center space-x-2">
          <span>⬅️</span>
          <span>Regresar</span>
        </button>
      </div>
      
      <div class="grid grid-cols-3 gap-6">
        <!-- Tabla de Equipos -->
        <div class="col-span-2">
          <div class="flex items-center justify-between mb-4">
            <div class="flex space-x-2">
              <button class="p-2 bg-white/5 hover:bg-white/10 rounded-lg" title="Descargar">☁️</button>
              <button class="p-2 bg-white/5 hover:bg-white/10 rounded-lg" title="Cargar">☁️</button>
            </div>
            <div class="flex space-x-2">
              <button onclick="agregarEquipo()" class="p-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-xl" title="Agregar">➕</button>
              <button onclick="editarEquipo()" class="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white" title="Editar">✏️</button>
              <button onclick="eliminarEquipo()" class="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white" title="Eliminar">🗑️</button>
            </div>
          </div>
          
          <div class="bg-white/5 rounded-xl overflow-hidden border border-white/10">
            <table class="w-full" id="tablaEquipos">
              <thead class="bg-white/10">
                <tr class="${textColor}">
                  <th class="px-4 py-3 text-left">Nombre Modelo</th>
                  <th class="px-4 py-3 text-left">Código</th>
                  <th class="px-4 py-3 text-right">Costo</th>
                  <th class="px-4 py-3 text-center">Externo</th>
                </tr>
              </thead>
              <tbody id="listaEquipos" class="${textMuted}">
                <tr>
                  <td colspan="4" class="px-4 py-8 text-center ${textMuted}">
                    No hay equipos registrados. Haz clic en ➕ para agregar.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Panel de Datos -->
        <div class="col-span-1">
          <div class="bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 class="text-lg font-bold ${textColor} mb-6">Datos</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm ${textMuted} mb-2">Nombre Modelo</label>
                <input type="text" id="nombreModelo" 
                       class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg ${textColor} focus:border-blue-500 focus:outline-none">
              </div>
              
              <div>
                <label class="block text-sm ${textMuted} mb-2">Código</label>
                <input type="text" id="codigo" 
                       class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg ${textColor} focus:border-blue-500 focus:outline-none">
              </div>
              
              <div>
                <label class="block text-sm ${textMuted} mb-2">Costo</label>
                <input type="number" id="costo" value="0.00" step="0.01"
                       class="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg ${textColor} focus:border-blue-500 focus:outline-none">
              </div>
              
              <div class="flex items-center space-x-2">
                <input type="checkbox" id="externo" 
                       class="w-5 h-5 bg-white/5 border border-white/10 rounded cursor-pointer">
                <label class="text-sm ${textColor}">Externo</label>
              </div>
              
              <div class="flex space-x-2 pt-4">
                <button onclick="guardarEquipo()" 
                        class="flex-1 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white font-medium flex items-center justify-center space-x-2">
                  <span>💾</span>
                  <span>Guardar</span>
                </button>
                <button onclick="limpiarFormulario()" 
                        class="px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white">
                  ❌
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        let equipos = [];
        let equipoSeleccionado = null;
        
        window.agregarEquipo = function() {
          limpiarFormulario();
          equipoSeleccionado = null;
        }
        
        window.editarEquipo = function() {
          if (equipoSeleccionado === null) {
            alert('Selecciona un equipo de la tabla primero');
            return;
          }
          const equipo = equipos[equipoSeleccionado];
          document.getElementById('nombreModelo').value = equipo.nombre;
          document.getElementById('codigo').value = equipo.codigo;
          document.getElementById('costo').value = equipo.costo;
          document.getElementById('externo').checked = equipo.externo;
        }
        
        window.eliminarEquipo = function() {
          if (equipoSeleccionado === null) {
            alert('Selecciona un equipo de la tabla primero');
            return;
          }
          if (confirm('¿Eliminar este equipo?')) {
            equipos.splice(equipoSeleccionado, 1);
            equipoSeleccionado = null;
            renderizarTabla();
            limpiarFormulario();
          }
        }
        
        window.guardarEquipo = function() {
          const nombre = document.getElementById('nombreModelo').value.trim();
          const codigo = document.getElementById('codigo').value.trim();
          const costo = parseFloat(document.getElementById('costo').value);
          const externo = document.getElementById('externo').checked;
          
          if (!nombre || !codigo) {
            alert('Nombre y Código son obligatorios');
            return;
          }
          
          const equipo = { nombre, codigo, costo, externo };
          
          if (equipoSeleccionado !== null) {
            equipos[equipoSeleccionado] = equipo;
            equipoSeleccionado = null;
          } else {
            equipos.push(equipo);
          }
          
          renderizarTabla();
          limpiarFormulario();
        }
        
        window.limpiarFormulario = function() {
          document.getElementById('nombreModelo').value = '';
          document.getElementById('codigo').value = '';
          document.getElementById('costo').value = '0.00';
          document.getElementById('externo').checked = false;
        }
        
        function renderizarTabla() {
          const tbody = document.getElementById('listaEquipos');
          if (equipos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="px-4 py-8 text-center ${textMuted}">No hay equipos registrados. Haz clic en ➕ para agregar.</td></tr>';
            return;
          }
          
          tbody.innerHTML = equipos.map((eq, idx) => \`
            <tr onclick="equipoSeleccionado=\${idx}; this.parentElement.querySelectorAll('tr').forEach(r=>r.classList.remove('bg-blue-600/20')); this.classList.add('bg-blue-600/20');" 
                class="hover:bg-white/5 cursor-pointer transition-colors \${equipoSeleccionado === idx ? 'bg-blue-600/20' : ''}">
              <td class="px-4 py-3">\${eq.nombre}</td>
              <td class="px-4 py-3">\${eq.codigo}</td>
              <td class="px-4 py-3 text-right">\${eq.costo.toFixed(2)}</td>
              <td class="px-4 py-3 text-center">\${eq.externo ? 'Sí' : 'No'}</td>
            </tr>
          \`).join('');
        }
      </script>
    `,
    comisiones: `
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold ${textColor}">💰 Gestión de Comisiones</h2>
        <button onclick="location.reload()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center space-x-2">
          <span>⬅️</span>
          <span>Regresar</span>
        </button>
      </div>
      
      <div class="mb-6 flex items-center justify-between">
        <div class="flex space-x-4">
          <button class="p-2 bg-white/5 hover:bg-white/10 rounded-lg" title="Descargar">☁️</button>
          <button class="p-2 bg-white/5 hover:bg-white/10 rounded-lg" title="Cargar">☁️</button>
        </div>
        <div class="flex space-x-3 items-center">
          <label class="text-sm ${textColor}">Recalcular Bono por Volumen</label>
          <label class="text-sm ${textColor}">Año</label>
          <select class="px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor}">
            <option>2026</option>
            <option>2025</option>
          </select>
          <label class="text-sm ${textColor}">Mes</label>
          <select class="px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor}">
            <option>Enero</option>
            <option>Febrero</option>
            <option>Marzo</option>
          </select>
        </div>
      </div>
      
      <div class="bg-white/5 rounded-xl overflow-hidden border border-white/10">
        <table class="w-full text-sm" id="tablaComisiones">
          <thead class="bg-white/10">
            <tr class="${textColor}">
              <th class="px-3 py-2 text-left">Tipo</th>
              <th class="px-3 py-2 text-right">Rate Des</th>
              <th class="px-3 py-2 text-right">Rate Hasta</th>
              <th class="px-3 py-2 text-center">Meses</th>
              <th class="px-3 py-2 text-right">Portabilidad</th>
              <th class="px-3 py-2 text-right">Comision Claro</th>
              <th class="px-3 py-2 text-right">Retención</th>
              <th class="px-3 py-2 text-right">Bunder</th>
              <th class="px-3 py-2 text-right">Papelless</th>
              <th class="px-3 py-2 text-left">Desde</th>
              <th class="px-3 py-2 text-left">Hasta</th>
            </tr>
          </thead>
          <tbody class="${textColor}">
            <tr>
              <td colspan="11" class="px-4 py-8 text-center ${textColor}">
                No hay registros de comisiones. Use botones arriba para cargar datos.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <script>
        let comisiones = [];
        
        window.agregarComision = function() {
          const nuevaComision = {
            tipo: prompt('Tipo:'),
            rateDes: parseFloat(prompt('Rate Des:') || '0'),
            rateHasta: parseFloat(prompt('Rate Hasta:') || '0'),
            meses: parseInt(prompt('Meses:') || '0'),
            portabilidad: parseFloat(prompt('Portabilidad:') || '0'),
            comisionClaro: parseFloat(prompt('Comision Claro:') || '0'),
            retencion: parseFloat(prompt('Retención:') || '0'),
            bunder: parseFloat(prompt('Bunder:') || '0'),
            papelless: parseFloat(prompt('Papelless:') || '0'),
            desde: prompt('Desde (fecha):'),
            hasta: prompt('Hasta (fecha):')
          };
          
          if (nuevaComision.tipo) {
            comisiones.push(nuevaComision);
            renderizarTablaComisiones();
          }
        };
        
        function renderizarTablaComisiones() {
          const tbody = document.querySelector('#tablaComisiones tbody');
          if (comisiones.length === 0) {
            tbody.innerHTML = '<tr><td colspan="11" class="px-4 py-8 text-center">No hay registros de comisiones. Use botones arriba para cargar datos.</td></tr>';
            return;
          }
          
          tbody.innerHTML = comisiones.map((c, idx) => \`
            <tr class="hover:bg-white/5 cursor-pointer">
              <td class="px-3 py-2">\${c.tipo}</td>
              <td class="px-3 py-2 text-right">\${c.rateDes.toFixed(2)}</td>
              <td class="px-3 py-2 text-right">\${c.rateHasta.toFixed(2)}</td>
              <td class="px-3 py-2 text-center">\${c.meses}</td>
              <td class="px-3 py-2 text-right">\${c.portabilidad.toFixed(2)}</td>
              <td class="px-3 py-2 text-right">\${c.comisionClaro.toFixed(2)}</td>
              <td class="px-3 py-2 text-right">\${c.retencion.toFixed(2)}</td>
              <td class="px-3 py-2 text-right">\${c.bunder.toFixed(2)}</td>
              <td class="px-3 py-2 text-right">\${c.papelless.toFixed(2)}</td>
              <td class="px-3 py-2">\${c.desde}</td>
              <td class="px-3 py-2">\${c.hasta}</td>
            </tr>
          \`).join('');
        }
      </script>
    `,
    equipo: `
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold ${textColor}">${tab.icon} Gestión de Usuarios</h2>
        <button onclick="location.reload()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center space-x-2">
          <span>⬅️</span>
          <span>Regresar</span>
        </button>
      </div>
      
      <div class="grid grid-cols-4 gap-6">
        <!-- Tabla de Usuarios -->
        <div class="col-span-2">
          <div class="flex items-center justify-between mb-4">
            <label class="flex items-center space-x-2 ${textColor}">
              <input type="checkbox" id="verEliminados" class="w-4 h-4">
              <span class="text-sm">Ver eliminados</span>
            </label>
            <div class="flex space-x-2">
              <button onclick="agregarUsuario()" class="p-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-xl">📋</button>
              <button onclick="editarUsuario()" class="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white">✏️</button>
              <button onclick="eliminarUsuario()" class="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white">🗑️</button>
            </div>
          </div>
          
          <div class="bg-white/5 rounded-xl overflow-hidden border border-white/10">
            <table class="w-full" id="tablaUsuarios">
              <thead class="bg-white/10">
                <tr class="${textColor} text-sm">
                  <th class="px-3 py-2 text-left">Nombre</th>
                  <th class="px-3 py-2 text-left">Tipo</th>
                  <th class="px-3 py-2 text-left">Usuario</th>
                  <th class="px-3 py-2 text-left">Fecha Venc.</th>
                  <th class="px-3 py-2 text-center">Stock</th>
                </tr>
              </thead>
              <tbody id="listaUsuarios" class="${textMuted} text-sm">
                <tr>
                  <td colspan="5" class="px-4 py-8 text-center">
                    No hay usuarios registrados. Haz clic en 📋 para agregar.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Panel de Datos y Configuración -->
        <div class="col-span-2 space-y-4">
          <!-- Panel Datos -->
          <div class="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 class="text-lg font-bold ${textColor} mb-4">Datos</h3>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-xs ${textMuted} mb-1">Vendedor</label>
                <input type="text" id="vendedor" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor} text-sm focus:border-blue-500 focus:outline-none">
              </div>
              <div>
                <label class="block text-xs ${textMuted} mb-1">Gerencia Existente</label>
                <input type="checkbox" id="gerenciaExistente" class="w-4 h-4">
              </div>
              <div>
                <label class="block text-xs ${textMuted} mb-1">Usuario</label>
                <select id="usuario" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor} text-sm focus:border-blue-500 focus:outline-none">
                  <option value="">Seleccionar...</option>
                </select>
              </div>
              <div>
                <label class="block text-xs ${textMuted} mb-1">Nick</label>
                <input type="text" id="nick" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor} text-sm focus:border-blue-500 focus:outline-none">
              </div>
              <div>
                <label class="block text-xs ${textMuted} mb-1">Password</label>
                <input type="password" id="password" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor} text-sm focus:border-blue-500 focus:outline-none">
              </div>
              <div>
                <label class="block text-xs ${textMuted} mb-1">Repetir Password</label>
                <input type="password" id="repetirPassword" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor} text-sm focus:border-blue-500 focus:outline-none">
              </div>
              <div class="col-span-2">
                <label class="block text-xs ${textMuted} mb-1">Permisos</label>
                <select id="permisos" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor} text-sm focus:border-blue-500 focus:outline-none">
                  <option value="ADMIN">Administrador</option>
                  <option value="VENDEDOR">Vendedor</option>
                  <option value="GERENTE">Gerente</option>
                </select>
              </div>
              <div class="col-span-2">
                <label class="block text-xs ${textMuted} mb-1">Imagen</label>
                <div class="flex space-x-2">
                  <input type="file" id="imagen" accept="image/*" class="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor} text-sm">
                  <button class="px-3 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm">Cargar</button>
                </div>
              </div>
              <div>
                <label class="block text-xs ${textMuted} mb-1">Días Fin de Activación</label>
                <input type="number" id="diasActivacion" value="0" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor} text-sm focus:border-blue-500 focus:outline-none">
              </div>
              <div>
                <label class="block text-xs ${textMuted} mb-1">Fecha Fin Activación</label>
                <input type="date" id="fechaActivacion" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor} text-sm focus:border-blue-500 focus:outline-none">
              </div>
            </div>
          </div>
          
          <!-- Panel Alertas -->
          <div class="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 class="text-lg font-bold ${textColor} mb-3">Alertas</h3>
            <div class="grid grid-cols-2 gap-2">
              <label class="flex items-center space-x-2 ${textColor} text-sm"><input type="checkbox" id="alertaEmail" class="w-4 h-4"><span>Email</span></label>
              <label class="flex items-center space-x-2 ${textColor} text-sm"><input type="checkbox" id="alertaCuadre" class="w-4 h-4"><span>Cuadre de Caja</span></label>
              <label class="flex items-center space-x-2 ${textColor} text-sm"><input type="checkbox" id="alertaControlStock" class="w-4 h-4"><span>Control de Stock</span></label>
              <label class="flex items-center space-x-2 ${textColor} text-sm"><input type="checkbox" id="alertaEliminarInv" class="w-4 h-4"><span>Eliminar Inventario</span></label>
              <label class="flex items-center space-x-2 ${textColor} text-sm"><input type="checkbox" id="alertaMovStock" class="w-4 h-4"><span>Movimiento de Stock</span></label>
              <label class="flex items-center space-x-2 ${textColor} text-sm"><input type="checkbox" id="alertaPonche" class="w-4 h-4"><span>Ponche</span></label>
              <label class="flex items-center space-x-2 ${textColor} text-sm"><input type="checkbox" id="alertaAnularTicket" class="w-4 h-4"><span>Anular Ticket</span></label>
            </div>
          </div>
          
          <!-- Panel Recargas -->
          <div class="bg-white/5 rounded-xl p-4 border border-white/10">
            <h3 class="text-lg font-bold ${textColor} mb-3">Recargas</h3>
            <div class="space-y-3">
              <div>
                <label class="block text-xs ${textMuted} mb-1">Password</label>
                <input type="password" id="recargaPassword" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor} text-sm focus:border-blue-500 focus:outline-none">
              </div>
              <div>
                <label class="block text-xs ${textMuted} mb-1">Tope diario</label>
                <input type="number" id="topeDiario" value="0" step="0.01" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor} text-sm focus:border-blue-500 focus:outline-none">
              </div>
              <div class="grid grid-cols-3 gap-2 items-center">
                <div>
                  <label class="block text-xs ${textMuted} mb-1">Desde</label>
                  <select id="horaDesde" class="w-full px-2 py-2 bg-white/5 border border-white/10 rounded ${textColor} text-sm">
                    ${[...Array(24)].map((_, i) => `<option value="${i.toString().padStart(2, '0')}">${i.toString().padStart(2, '0')}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block text-xs ${textMuted} mb-1">&nbsp;</label>
                  <select id="minutosDesde" class="w-full px-2 py-2 bg-white/5 border border-white/10 rounded ${textColor} text-sm">
                    ${[...Array(60)].map((_, i) => `<option value="${i.toString().padStart(2, '0')}">${i.toString().padStart(2, '0')}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="block text-xs ${textMuted} mb-1">Hasta</label>
                  <div class="flex space-x-1">
                    <select id="horaHasta" class="flex-1 px-2 py-2 bg-white/5 border border-white/10 rounded ${textColor} text-sm">
                      ${[...Array(24)].map((_, i) => `<option value="${i.toString().padStart(2, '0')}">${i.toString().padStart(2, '0')}</option>`).join('')}
                    </select>
                    <select id="minutosHasta" class="flex-1 px-2 py-2 bg-white/5 border border-white/10 rounded ${textColor} text-sm">
                      ${[...Array(60)].map((_, i) => `<option value="${i.toString().padStart(2, '0')}">${i.toString().padStart(2, '0')}</option>`).join('')}
                    </select>
                    <select id="segundosHasta" class="flex-1 px-2 py-2 bg-white/5 border border-white/10 rounded ${textColor} text-sm">
                      ${[...Array(60)].map((_, i) => `<option value="${i.toString().padStart(2, '0')}">${i.toString().padStart(2, '0')}</option>`).join('')}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Botones de Acción -->
          <div class="flex space-x-2">
            <button onclick="guardarUsuario()" class="flex-1 px-4 py-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white font-medium flex items-center justify-center space-x-2">
              <span>💾</span>
              <span>Guardar</span>
            </button>
            <button onclick="limpiarFormularioUsuario()" class="px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white">
              ❌
            </button>
          </div>
        </div>
      </div>
      
      <script>
        let usuarios = [];
        let usuarioSeleccionado = null;
        
        window.agregarUsuario = function() {
          limpiarFormularioUsuario();
          usuarioSeleccionado = null;
        }
        
        window.editarUsuario = function() {
          if (usuarioSeleccionado === null) {
            alert('Selecciona un usuario de la tabla primero');
            return;
          }
          const usuario = usuarios[usuarioSeleccionado];
          document.getElementById('vendedor').value = usuario.vendedor;
          document.getElementById('nick').value = usuario.nick;
          document.getElementById('permisos').value = usuario.permisos;
          // ... cargar demás campos
        }
        
        window.eliminarUsuario = function() {
          if (usuarioSeleccionado === null) {
            alert('Selecciona un usuario de la tabla primero');
            return;
          }
          if (confirm('¿Eliminar este usuario?')) {
            usuarios.splice(usuarioSeleccionado, 1);
            usuarioSeleccionado = null;
            renderizarTablaUsuarios();
            limpiarFormularioUsuario();
          }
        }
        
        window.guardarUsuario = function() {
          const vendedor = document.getElementById('vendedor').value.trim();
          const nick = document.getElementById('nick').value.trim();
          const password = document.getElementById('password').value;
          const repetirPassword = document.getElementById('repetirPassword').value;
          const permisos = document.getElementById('permisos').value;
          
          if (!vendedor || !nick) {
            alert('Vendedor y Nick son obligatorios');
            return;
          }
          
          if (password !== repetirPassword) {
            alert('Las contraseñas no coinciden');
            return;
          }
          
          const usuario = {
            vendedor,
            tipo: permisos,
            nick,
            fechaVenc: document.getElementById('fechaActivacion').value,
            verStock: document.getElementById('alertaControlStock').checked
          };
          
          if (usuarioSeleccionado !== null) {
            usuarios[usuarioSeleccionado] = usuario;
            usuarioSeleccionado = null;
          } else {
            usuarios.push(usuario);
          }
          
          renderizarTablaUsuarios();
          limpiarFormularioUsuario();
        }
        
        window.limpiarFormularioUsuario = function() {
          document.getElementById('vendedor').value = '';
          document.getElementById('nick').value = '';
          document.getElementById('password').value = '';
          document.getElementById('repetirPassword').value = '';
          document.getElementById('permisos').value = 'ADMIN';
          document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        }
        
        function renderizarTablaUsuarios() {
          const tbody = document.getElementById('listaUsuarios');
          if (usuarios.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="px-4 py-8 text-center">No hay usuarios registrados. Haz clic en 📋 para agregar.</td></tr>';
            return;
          }
          
          tbody.innerHTML = usuarios.map((u, idx) => \`
            <tr onclick="usuarioSeleccionado=\${idx}; this.parentElement.querySelectorAll('tr').forEach(r=>r.classList.remove('bg-blue-600/20')); this.classList.add('bg-blue-600/20');" 
                class="hover:bg-white/5 cursor-pointer transition-colors \${usuarioSeleccionado === idx ? 'bg-blue-600/20' : ''}">
              <td class="px-3 py-2">\${u.vendedor}</td>
              <td class="px-3 py-2">\${u.tipo}</td>
              <td class="px-3 py-2">\${u.nick}</td>
              <td class="px-3 py-2">\${u.fechaVenc || '-'}</td>
              <td class="px-3 py-2 text-center">\${u.verStock ? 'Sí' : 'No'}</td>
            </tr>
          \`).join('');
        }
      </script>
    `,
    planes: `
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold ${textColor}">📋 Gestión de Tipo de Plan</h2>
        <button onclick="location.reload()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center space-x-2">
          <span>⬅️</span>
          <span>Regresar</span>
        </button>
      </div>
      
      <div class="grid grid-cols-3 gap-6">
        <!-- Tabla izquierda -->
        <div class="col-span-2">
          <div class="flex space-x-2 mb-4">
            <button class="p-2 bg-white/5 hover:bg-white/10 rounded-lg" title="Descargar">☁️</button>
            <button class="p-2 bg-white/5 hover:bg-white/10 rounded-lg" title="Cargar">☁️</button>
            <button onclick="agregarPlan()" class="p-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-xl">✚</button>
            <button onclick="editarPlan()" class="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white">✏️</button>
            <button onclick="eliminarPlan()" class="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white">🗑️</button>
          </div>
          
          <div class="bg-white/5 rounded-xl overflow-hidden border border-white/10 max-h-96 overflow-y-auto">
            <table class="w-full text-sm" id="tablaPlanes">
              <thead class="bg-white/10 sticky top-0">
                <tr class="${textColor}">
                  <th class="px-3 py-2 text-left">Codigo Voz</th>
                  <th class="px-3 py-2 text-left">Codigo Data</th>
                  <th class="px-3 py-2 text-right">Rate</th>
                </tr>
              </thead>
              <tbody class="${textColor}" id="listaPlanes">
                <tr>
                  <td colspan="3" class="px-4 py-8 text-center">Sin planes registrados. Click ✚ para agregar.</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="mt-4">
            <button class="px-4 py-2 bg-white/5 hover:bg-white/10 rounded ${textColor}">Filtrar</button>
          </div>
        </div>
        
        <!-- Panel Datos derecha -->
        <div class="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 class="text-lg font-bold ${textColor} mb-6">Datos</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm ${textColor} mb-2">Codigo Voz</label>
              <input type="text" id="codigoVoz" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor}">
            </div>
            
            <div>
              <label class="block text-sm ${textColor} mb-2">Codigo Data</label>
              <input type="text" id="codigoData" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor}">
            </div>
            
            <div>
              <label class="block text-sm ${textColor} mb-2">Rate</label>
              <input type="number" id="rate" step="0.01" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor}">
            </div>
            
            <div>
              <label class="block text-sm ${textColor} mb-2">Nota</label>
              <textarea id="nota" rows="5" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor}"></textarea>
            </div>
            
            <div class="flex items-center space-x-2">
              <input type="checkbox" id="habilitado" class="w-4 h-4">
              <label class="text-sm ${textColor}">Habilitado</label>
            </div>
            
            <div class="flex space-x-2 pt-4">
              <button onclick="guardarPlan()" class="flex-1 p-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white text-2xl">💾</button>
              <button onclick="limpiarPlan()" class="p-3 bg-red-600 hover:bg-red-700 rounded-lg text-white text-2xl">❌</button>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        let planes = [];
        let planSeleccionado = null;
        
        window.agregarPlan = function() {
          limpiarPlan();
          planSeleccionado = null;
        };
        
        window.editarPlan = function() {
          if (planSeleccionado === null) {
            alert('Selecciona un plan de la tabla primero');
            return;
          }
          const plan = planes[planSeleccionado];
          document.getElementById('codigoVoz').value = plan.codigoVoz;
          document.getElementById('codigoData').value = plan.codigoData;
          document.getElementById('rate').value = plan.rate;
          document.getElementById('nota').value = plan.nota || '';
          document.getElementById('habilitado').checked = plan.habilitado;
        };
        
        window.eliminarPlan = function() {
          if (planSeleccionado === null) {
            alert('Selecciona un plan de la tabla primero');
            return;
          }
          if (confirm('¿Eliminar este plan?')) {
            planes.splice(planSeleccionado, 1);
            planSeleccionado = null;
            renderizarTablaPlanes();
            limpiarPlan();
          }
        };
        
        window.guardarPlan = function() {
          const nuevoPlan = {
            codigoVoz: document.getElementById('codigoVoz').value,
            codigoData: document.getElementById('codigoData').value,
            rate: parseFloat(document.getElementById('rate').value || '0'),
            nota: document.getElementById('nota').value,
            habilitado: document.getElementById('habilitado').checked
          };
          
          if (!nuevoPlan.codigoVoz) {
            alert('Codigo Voz es requerido');
            return;
          }
          
          if (planSeleccionado !== null) {
            planes[planSeleccionado] = nuevoPlan;
          } else {
            planes.push(nuevoPlan);
          }
          
          renderizarTablaPlanes();
          limpiarPlan();
        };
        
        window.limpiarPlan = function() {
          document.getElementById('codigoVoz').value = '';
          document.getElementById('codigoData').value = '';
          document.getElementById('rate').value = '';
          document.getElementById('nota').value = '';
          document.getElementById('habilitado').checked = false;
          planSeleccionado = null;
        };
        
        function renderizarTablaPlanes() {
          const tbody = document.getElementById('listaPlanes');
          if (planes.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" class="px-4 py-8 text-center">Sin planes registrados. Click ✚ para agregar.</td></tr>';
            return;
          }
          
          tbody.innerHTML = planes.map((p, idx) => \`
            <tr onclick="planSeleccionado=\${idx}; this.parentElement.querySelectorAll('tr').forEach(r=>r.classList.remove('bg-blue-600/20')); this.classList.add('bg-blue-600/20');" 
                class="hover:bg-white/5 cursor-pointer">
              <td class="px-3 py-2">\${p.codigoVoz}</td>
              <td class="px-3 py-2">\${p.codigoData}</td>
              <td class="px-3 py-2 text-right">\${p.rate.toFixed(2)}</td>
            </tr>
          \`).join('');
        }
      </script>
    `,
    ivu: `
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold ${textColor}">🧾 Gestión de IVU Nacional</h2>
        <button onclick="location.reload()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center space-x-2">
          <span>⬅️</span>
          <span>Regresar</span>
        </button>
      </div>
      
      <div class="grid grid-cols-2 gap-6">
        <!-- Tabla izquierda -->
        <div>
          <div class="flex space-x-2 mb-4">
            <button onclick="agregarIVU()" class="p-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-xl">✚</button>
            <button onclick="editarIVU()" class="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white">✏️</button>
            <button onclick="eliminarIVU()" class="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white">🗑️</button>
          </div>
          
          <div class="bg-white/5 rounded-xl overflow-hidden border border-white/10">
            <table class="w-full text-sm" id="tablaIVU">
              <thead class="bg-white/10">
                <tr class="${textColor}">
                  <th class="px-3 py-2 text-center">Mes Desde</th>
                  <th class="px-3 py-2 text-center">Año Desde</th>
                  <th class="px-3 py-2 text-center">Mes Hasta</th>
                  <th class="px-3 py-2 text-center">Año Hasta</th>
                  <th class="px-3 py-2 text-center">Impuesto</th>
                </tr>
              </thead>
              <tbody class="${textColor}" id="listaIVU">
                <tr>
                  <td colspan="5" class="px-4 py-8 text-center">Sin registros de IVU. Click ✚ para agregar.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Panel Datos derecha -->
        <div class="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 class="text-lg font-bold ${textColor} mb-6">Datos</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm ${textColor} mb-2">Mes Desde</label>
              <input type="number" id="ivuMesDesde" min="1" max="12" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor}">
            </div>
            
            <div>
              <label class="block text-sm ${textColor} mb-2">Año Desde</label>
              <input type="number" id="ivuAnoDesde" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor}">
            </div>
            
            <div>
              <label class="block text-sm ${textColor} mb-2">Mes Hasta</label>
              <input type="number" id="ivuMesHasta" min="1" max="12" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor}">
            </div>
            
            <div>
              <label class="block text-sm ${textColor} mb-2">Año Hasta</label>
              <input type="number" id="ivuAnoHasta" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor}">
            </div>
            
            <div>
              <label class="block text-sm ${textColor} mb-2">Impuesto</label>
              <input type="number" id="ivuImpuesto" step="0.1" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor}">
            </div>
            
            <div class="flex space-x-2 pt-4">
              <button onclick="guardarIVU()" class="flex-1 p-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white text-2xl">💾</button>
              <button onclick="limpiarIVU()" class="p-3 bg-red-600 hover:bg-red-700 rounded-lg text-white text-2xl">❌</button>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        let ivuRegistros = [];
        let ivuSeleccionado = null;
        
        window.agregarIVU = function() {
          limpiarIVU();
          ivuSeleccionado = null;
        };
        
        window.editarIVU = function() {
          if (ivuSeleccionado === null) {
            alert('Selecciona un registro de la tabla primero');
            return;
          }
          const ivu = ivuRegistros[ivuSeleccionado];
          document.getElementById('ivuMesDesde').value = ivu.mesDesde;
          document.getElementById('ivuAnoDesde').value = ivu.anoDesde;
          document.getElementById('ivuMesHasta').value = ivu.mesHasta;
          document.getElementById('ivuAnoHasta').value = ivu.anoHasta;
          document.getElementById('ivuImpuesto').value = ivu.impuesto;
        };
        
        window.eliminarIVU = function() {
          if (ivuSeleccionado === null) {
            alert('Selecciona un registro de la tabla primero');
            return;
          }
          if (confirm('¿Eliminar este registro de IVU?')) {
            ivuRegistros.splice(ivuSeleccionado, 1);
            ivuSeleccionado = null;
            renderizarTablaIVU();
            limpiarIVU();
          }
        };
        
        window.guardarIVU = function() {
          const nuevoIVU = {
            mesDesde: parseInt(document.getElementById('ivuMesDesde').value || '0'),
            anoDesde: parseInt(document.getElementById('ivuAnoDesde').value || '0'),
            mesHasta: parseInt(document.getElementById('ivuMesHasta').value || '0'),
            anoHasta: parseInt(document.getElementById('ivuAnoHasta').value || '0'),
            impuesto: parseFloat(document.getElementById('ivuImpuesto').value || '0')
          };
          
          if (!nuevoIVU.mesDesde || !nuevoIVU.anoDesde) {
            alert('Mes Desde y Año Desde son requeridos');
            return;
          }
          
          if (ivuSeleccionado !== null) {
            ivuRegistros[ivuSeleccionado] = nuevoIVU;
          } else {
            ivuRegistros.push(nuevoIVU);
          }
          
          renderizarTablaIVU();
          limpiarIVU();
        };
        
        window.limpiarIVU = function() {
          document.getElementById('ivuMesDesde').value = '';
          document.getElementById('ivuAnoDesde').value = '';
          document.getElementById('ivuMesHasta').value = '';
          document.getElementById('ivuAnoHasta').value = '';
          document.getElementById('ivuImpuesto').value = '';
          ivuSeleccionado = null;
        };
        
        function renderizarTablaIVU() {
          const tbody = document.getElementById('listaIVU');
          if (ivuRegistros.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="px-4 py-8 text-center">Sin registros de IVU. Click ✚ para agregar.</td></tr>';
            return;
          }
          
          tbody.innerHTML = ivuRegistros.map((ivu, idx) => \`
            <tr onclick="ivuSeleccionado=\${idx}; this.parentElement.querySelectorAll('tr').forEach(r=>r.classList.remove('bg-blue-600/20')); this.classList.add('bg-blue-600/20');" 
                class="hover:bg-white/5 cursor-pointer">
              <td class="px-3 py-2 text-center">\${ivu.mesDesde}</td>
              <td class="px-3 py-2 text-center">\${ivu.anoDesde}</td>
              <td class="px-3 py-2 text-center">\${ivu.mesHasta}</td>
              <td class="px-3 py-2 text-center">\${ivu.anoHasta}</td>
              <td class="px-3 py-2 text-center">\${ivu.impuesto}</td>
            </tr>
          \`).join('');
        }
      </script>
    `,
    contratos: `
      <h2 class="text-2xl font-bold mb-4 ${textColor}">${tab.icon} ${tab.label}</h2>
      <p class="${textMuted} mb-6">Módulo en desarrollo - SIN DATOS DE EJEMPLO</p>
    `,
    tiendas: `
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold ${textColor}">🏪 Gestión de Tiendas</h2>
        <button onclick="location.reload()" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white flex items-center space-x-2">
          <span>⬅️</span>
        </button>
      </div>
      
      <div class="grid grid-cols-2 gap-6">
        <!-- Tabla izquierda -->
        <div>
          <div class="flex space-x-2 mb-4">
            <button onclick="agregarTienda()" class="p-2 bg-green-600 hover:bg-green-700 rounded-lg text-white text-xl">✚</button>
            <button onclick="editarTienda()" class="p-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg text-white">✏️</button>
            <button onclick="eliminarTienda()" class="p-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white">🗑️</button>
          </div>
          
          <div class="bg-white/5 rounded-xl overflow-hidden border border-white/10">
            <table class="w-full text-sm" id="tablaTiendas">
              <thead class="bg-white/10">
                <tr class="${textColor}">
                  <th class="px-3 py-2 text-left">Nombre</th>
                  <th class="px-3 py-2 text-left">Tipo</th>
                </tr>
              </thead>
              <tbody class="${textColor}" id="listaTiendas">
                <tr>
                  <td colspan="2" class="px-4 py-8 text-center">Sin tiendas registradas. Click ✚ para agregar.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- Panel Datos derecha -->
        <div class="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 class="text-lg font-bold ${textColor} mb-6">Datos</h3>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm ${textColor} mb-2">Nombre</label>
              <input type="text" id="tiendaNombre" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor}">
            </div>
            
            <div>
              <label class="block text-sm ${textColor} mb-2">Petty Cash</label>
              <input type="number" id="tiendaPettyCash" step="0.01" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor}">
            </div>
            
            <div>
              <label class="block text-sm ${textColor} mb-2">Tipo</label>
              <select id="tiendaTipo" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor}">
                <option value="">Seleccionar...</option>
                <option value="De venta">De venta</option>
                <option value="De sistema">De sistema</option>
              </select>
            </div>
            
            <div class="border-t border-white/10 pt-4">
              <h4 class="text-sm font-bold ${textColor} mb-3">Datos Ticket</h4>
              
              <div class="mb-3">
                <label class="block text-sm ${textColor} mb-2">Tamaño</label>
                <select id="tiendaTamano" class="w-full px-3 py-2 bg-white/5 border border-white/10 rounded ${textColor}">
                  <option value="">Seleccionar...</option>
                  <option value="80mm">80mm</option>
                  <option value="58mm">58mm</option>
                </select>
              </div>
              
              <div class="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label class="block text-xs ${textColor} mb-1">Línea Superior 1</label>
                  <input type="text" id="tiendaLineaSup1" class="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-xs ${textColor}">
                </div>
                <div>
                  <label class="block text-xs ${textColor} mb-1">Línea Inferior 1</label>
                  <input type="text" id="tiendaLineaInf1" class="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-xs ${textColor}">
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label class="block text-xs ${textColor} mb-1">Línea Superior 2</label>
                  <input type="text" id="tiendaLineaSup2" class="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-xs ${textColor}">
                </div>
                <div>
                  <label class="block text-xs ${textColor} mb-1">Línea Inferior 2</label>
                  <input type="text" id="tiendaLineaInf2" class="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-xs ${textColor}">
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label class="block text-xs ${textColor} mb-1">Línea Superior 3</label>
                  <input type="text" id="tiendaLineaSup3" class="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-xs ${textColor}">
                </div>
                <div>
                  <label class="block text-xs ${textColor} mb-1">Línea Inferior 3</label>
                  <input type="text" id="tiendaLineaInf3" class="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-xs ${textColor}">
                </div>
              </div>
              
              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="block text-xs ${textColor} mb-1">Línea Superior 4</label>
                  <input type="text" id="tiendaLineaSup4" class="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-xs ${textColor}">
                </div>
                <div>
                  <label class="block text-xs ${textColor} mb-1">Línea Inferior 4</label>
                  <input type="text" id="tiendaLineaInf4" class="w-full px-2 py-1 bg-white/5 border border-white/10 rounded text-xs ${textColor}">
                </div>
              </div>
            </div>
            
            <div class="flex space-x-2 pt-4">
              <button onclick="guardarTienda()" class="flex-1 p-3 bg-yellow-500 hover:bg-yellow-600 rounded-lg text-white text-2xl">💾</button>
              <button onclick="limpiarTienda()" class="p-3 bg-red-600 hover:bg-red-700 rounded-lg text-white text-2xl">❌</button>
            </div>
          </div>
        </div>
      </div>
      
      <script>
        let tiendas = [];
        let tiendaSeleccionada = null;
        
        window.agregarTienda = function() {
          limpiarTienda();
          tiendaSeleccionada = null;
        };
        
        window.editarTienda = function() {
          if (tiendaSeleccionada === null) {
            alert('Selecciona una tienda de la tabla primero');
            return;
          }
          const t = tiendas[tiendaSeleccionada];
          document.getElementById('tiendaNombre').value = t.nombre;
          document.getElementById('tiendaPettyCash').value = t.pettyCash;
          document.getElementById('tiendaTipo').value = t.tipo;
          document.getElementById('tiendaTamano').value = t.tamano || '';
          document.getElementById('tiendaLineaSup1').value = t.lineaSup1 || '';
          document.getElementById('tiendaLineaSup2').value = t.lineaSup2 || '';
          document.getElementById('tiendaLineaSup3').value = t.lineaSup3 || '';
          document.getElementById('tiendaLineaSup4').value = t.lineaSup4 || '';
          document.getElementById('tiendaLineaInf1').value = t.lineaInf1 || '';
          document.getElementById('tiendaLineaInf2').value = t.lineaInf2 || '';
          document.getElementById('tiendaLineaInf3').value = t.lineaInf3 || '';
          document.getElementById('tiendaLineaInf4').value = t.lineaInf4 || '';
        };
        
        window.eliminarTienda = function() {
          if (tiendaSeleccionada === null) {
            alert('Selecciona una tienda de la tabla primero');
            return;
          }
          if (confirm('¿Eliminar esta tienda?')) {
            tiendas.splice(tiendaSeleccionada, 1);
            tiendaSeleccionada = null;
            renderizarTablaTiendas();
            limpiarTienda();
          }
        };
        
        window.guardarTienda = function() {
          const nuevaTienda = {
            nombre: document.getElementById('tiendaNombre').value,
            pettyCash: parseFloat(document.getElementById('tiendaPettyCash').value || '0'),
            tipo: document.getElementById('tiendaTipo').value,
            tamano: document.getElementById('tiendaTamano').value,
            lineaSup1: document.getElementById('tiendaLineaSup1').value,
            lineaSup2: document.getElementById('tiendaLineaSup2').value,
            lineaSup3: document.getElementById('tiendaLineaSup3').value,
            lineaSup4: document.getElementById('tiendaLineaSup4').value,
            lineaInf1: document.getElementById('tiendaLineaInf1').value,
            lineaInf2: document.getElementById('tiendaLineaInf2').value,
            lineaInf3: document.getElementById('tiendaLineaInf3').value,
            lineaInf4: document.getElementById('tiendaLineaInf4').value
          };
          
          if (!nuevaTienda.nombre) {
            alert('Nombre es requerido');
            return;
          }
          
          if (tiendaSeleccionada !== null) {
            tiendas[tiendaSeleccionada] = nuevaTienda;
          } else {
            tiendas.push(nuevaTienda);
          }
          
          renderizarTablaTiendas();
          limpiarTienda();
        };
        
        window.limpiarTienda = function() {
          document.getElementById('tiendaNombre').value = '';
          document.getElementById('tiendaPettyCash').value = '';
          document.getElementById('tiendaTipo').value = '';
          document.getElementById('tiendaTamano').value = '';
          document.getElementById('tiendaLineaSup1').value = '';
          document.getElementById('tiendaLineaSup2').value = '';
          document.getElementById('tiendaLineaSup3').value = '';
          document.getElementById('tiendaLineaSup4').value = '';
          document.getElementById('tiendaLineaInf1').value = '';
          document.getElementById('tiendaLineaInf2').value = '';
          document.getElementById('tiendaLineaInf3').value = '';
          document.getElementById('tiendaLineaInf4').value = '';
          tiendaSeleccionada = null;
        };
        
        function renderizarTablaTiendas() {
          const tbody = document.getElementById('listaTiendas');
          if (tiendas.length === 0) {
            tbody.innerHTML = '<tr><td colspan="2" class="px-4 py-8 text-center">Sin tiendas registradas. Click ✚ para agregar.</td></tr>';
            return;
          }
          
          tbody.innerHTML = tiendas.map((t, idx) => \`
            <tr onclick="tiendaSeleccionada=\${idx}; this.parentElement.querySelectorAll('tr').forEach(r=>r.classList.remove('bg-blue-600/20')); this.classList.add('bg-blue-600/20');" 
                class="hover:bg-white/5 cursor-pointer">
              <td class="px-3 py-2">\${t.nombre}</td>
              <td class="px-3 py-2">\${t.tipo}</td>
            </tr>
          \`).join('');
        }
      </script>
    `
  };

  return contents[currentCentroControlTab] || '<p>Contenido no disponible</p>';
}

// Inicializar
applyTheme();
renderMenu();
renderContent();
