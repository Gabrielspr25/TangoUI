// Módulo: Centro de Control
// Gestión de equipos, usuarios, comisiones, planes, IVU, contratos

export const centroControlTabs = [
    { id: 'equipos', icon: '📱', label: 'Gestión de Equipos', color: 'blue' },
    { id: 'comisiones', icon: '💰', label: 'Gestión de Comisiones', color: 'green' },
    { id: 'equipo', icon: '👥', label: 'Gestión de Usuarios', color: 'purple' },
    { id: 'planes', icon: '📋', label: 'Gestión de Planes', color: 'orange' },
    { id: 'ivu', icon: '🧾', label: 'Gestión de IVU', color: 'red' },
    { id: 'contratos', icon: '📄', label: 'Tipos de Contratos', color: 'cyan' }
];

export let currentCentroControlTab = 'equipos';

export function renderCentroControl(textColor, textMuted, palette, APP_VERSION) {
    return `
    <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-${palette.accent}-400 to-${palette.accent}-600 bg-clip-text text-transparent">
      🎛️ Centro de Control
    </h1>
    <p class="${textMuted} mb-8">Sistema Claro - TangoUI | Versión ${APP_VERSION}</p>
    
    <!-- Tabs de Gestión -->
    <div class="flex space-x-2 mb-6 overflow-x-auto pb-2">
      ${centroControlTabs.map(tab => `
        <button onclick="window.cambiarTabCentroControl('${tab.id}')"
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
}

function getCentroControlTabContent(textColor, textMuted) {
    const tab = centroControlTabs.find(t => t.id === currentCentroControlTab);

    // Aquí se importarían los contenidos de cada tab
    // Por ahora placeholder básico
    return `
    <h2 class="text-2xl font-bold mb-4 ${textColor}">${tab.icon} ${tab.label}</h2>
    <p class="${textMuted} mb-6">Módulo en desarrollo...</p>
  `;
}

window.cambiarTabCentroControl = function (tabId) {
    currentCentroControlTab = tabId;
    if (window.renderContent) window.renderContent();
};
