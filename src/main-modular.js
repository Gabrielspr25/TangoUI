// Sistema Claro - TangoUI v2.4.0
// MAIN ORQUESTADOR - Módulos separados

import { applyTheme, userConfig, colorPalettes, getTextColor, getTextMuted } from './temas.js';
import { renderCentroControl } from './centroControl.js';
import { renderAgentesIA } from './agentesIA.js';

const APP_VERSION = '2.4.0';
const currentUser = { nombre: 'Gabriel', rol: 'CREATOR', email: 'gabriel@tangoui.com' };

// Módulos del sistema
const modules = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', roles: ['CREATOR', 'ADMIN', 'AGENT'] },
    { id: 'centroControl', icon: '🎛️', label: 'Centro de Control', roles: ['CREATOR', 'ADMIN'] },
    { id: 'agentesIA', icon: '🤖', label: 'Agentes IA', roles: ['CREATOR'], badge: '🔒' },
    { id: 'personalizacion', icon: '🎨', label: 'Personalización', roles: ['CREATOR', 'ADMIN', 'AGENT'] },
    { id: 'inventario', icon: '📦', label: 'Inventario', roles: ['CREATOR', 'ADMIN'] },
    { id: 'reportes', icon: '📈', label: 'Reportes', roles: ['CREATOR', 'ADMIN'] }
];

let currentModule = 'agentesIA';

// Renderizar menú
function renderMenu() {
    const menu = document.getElementById('menu');
    const textColor = getTextColor(userConfig.bgIntensity);
    const palette = colorPalettes[userConfig.colorPalette];
    const textMuted = getTextMuted(userConfig.bgIntensity);

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
    `).join('') + `
    <div class="mt-auto border-t border-${userConfig.bgIntensity <= 500 ? 'gray-300' : 'gray-800'} pt-4">
      <div class="px-4 mb-3">
        <div class="text-xs ${textMuted} mb-2">Tema</div>
        <button onclick="toggleTheme()" 
                class="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/10 ${textColor}">
          <span>${userConfig.theme === 'dark' ? '🌙 Oscuro' : '☀️ Claro'}</span>
        </button>
      </div>
      <div class="px-4">
        <div class="text-xs ${textMuted} mb-2">Intensidad: ${userConfig.bgIntensity}</div>
        <div class="flex gap-2">
          <button onclick="adjustIntensity(-50)" class="flex-1 px-2 py-1 rounded hover:bg-white/10 text-xs ${textColor}">-</button>
          <button onclick="adjustIntensity(50)" class="flex-1 px-2 py-1 rounded hover:bg-white/10 text-xs ${textColor}">+</button>
        </div>
      </div>
    </div>
  `;
}

// Renderizar contenido
function renderContent() {
    const content = document.getElementById('content');
    const textColor = getTextColor(userConfig.bgIntensity);
    const textMuted = getTextMuted(userConfig.bgIntensity);
    const palette = colorPalettes[userConfig.colorPalette];

    switch (currentModule) {
        case 'centroControl':
            content.innerHTML = renderCentroControl(textColor, textMuted, palette, APP_VERSION);
            break;

        case 'agentesIA':
            content.innerHTML = renderAgentesIA(textColor, textMuted, palette, APP_VERSION);
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

// Navegación
window.navigate = function (module) {
    currentModule = module;
    renderMenu();
    renderContent();
};

window.adjustIntensity = function (delta) {
    userConfig.bgIntensity = Math.max(50, Math.min(950, userConfig.bgIntensity + delta));
    applyTheme();
    renderMenu();
    renderContent();
};

// Exponer funciones globalmente
window.renderMenu = renderMenu;
window.renderContent = renderContent;

// Inicializar
applyTheme();
renderMenu();
renderContent();
