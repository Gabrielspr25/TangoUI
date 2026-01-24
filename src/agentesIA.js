// Módulo: Panel de Agentes IA
// 17 agentes con reglas, tareas, progreso
// CONFIDENCIAL - Solo CREATOR

import { agentesData } from './agentesData.js';

export function renderAgentesIA(textColor, textMuted, palette, APP_VERSION) {
    const agentes = agentesData;

    return `
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
      ${agentes.map((a, idx) => `
        <div onclick="window.abrirModalAgente(${idx})" class="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 cursor-pointer hover:scale-105 transition-transform border border-gray-700 hover:border-${a.estado === 'activo' ? 'green' : 'yellow'}-500">
          <div class="text-4xl mb-4">${a.icon}</div>
          <h3 class="${textColor} font-bold text-lg mb-2">${a.nombre}</h3>
          <div class="text-xs ${textMuted} mb-3">${a.fase} | ${a.reglas.length} reglas | ${a.tareas.length} tareas</div>
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
    
    <!-- Modal -->
    ${renderModalAgente(textColor, textMuted)}
    
    <script type="module">
      import { inicializarModalAgentes } from './modalAgentes.js';
      import { agentesData } from './agentesData.js';
      inicializarModalAgentes(agentesData, '${textColor}', '${textMuted}');
    </script>
  `;
}

function renderModalAgente(textColor, textMuted) {
    return `
    <div id="modalAgente" class="hidden fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onclick="if(event.target.id==='modalAgente') window.cerrarModalAgente()">
      <div class="bg-gray-900 rounded-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl" onclick="event.stopPropagation()">
        <div class="flex justify-between items-start mb-6">
          <div class="flex items-center space-x-4">
            <span id="modalIcon" class="text-6xl"></span>
            <div>
              <h2 id="modalTitulo" class="text-4xl font-bold ${textColor}"></h2>
              <div class="flex items-center space-x-3 mt-2">
                <span id="modalFase" class="text-sm ${textMuted}"></span>
                <span id="modalEstado" class="px-3 py-1 rounded-full text-xs font-bold"></span>
              </div>
            </div>
          </div>
          <button onclick="window.cerrarModalAgente()" class="text-4xl ${textColor} hover:text-red-500">×</button>
        </div>
        
        <div id="modalProgreso" class="mb-6"></div>
        
        <div class="grid grid-cols-2 gap-8">
          <div>
            <h3 class="text-2xl font-bold ${textColor} mb-4">📋 Reglas</h3>
            <div id="modalReglas"></div>
          </div>
          <div>
            <h3 class="text-2xl font-bold ${textColor} mb-4">✅ Tareas</h3>
            <div id="modalTareas"></div>
          </div>
        </div>
        
        <div class="flex space-x-3 mt-8">
          <button onclick="window.guardarCambiosAgente()" class="flex-1 px-6 py-4 bg-green-600 hover:bg-green-700 rounded-lg text-white font-bold">
            💾 Guardar
          </button>
          <button onclick="window.cerrarModalAgente()" class="px-6 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg text-white">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  `;
}
