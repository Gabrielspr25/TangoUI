// Modal editable para gestión de agentes IA
// Se integra con agentesData.js

export function crearModalAgentes(textColor, textMuted) {
    return `
    <!-- Modal Agente -->
    <div id="modalAgente" class="hidden fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onclick="if(event.target.id==='modalAgente') window.cerrarModalAgente()">
      <div class="bg-gray-900 rounded-2xl p-8 max-w-5xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl" onclick="event.stopPropagation()">
        <!-- Header -->
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
          <button onclick="window.cerrarModalAgente()" class="text-4xl ${textColor} hover:text-red-500 transition-colors">×</button>
        </div>
        
        <!-- Barra de Progreso -->
        <div class="mb-8">
          <div class="flex justify-between items-center mb-2">
            <span class="text-sm ${textMuted}">Progreso del Agente</span>
            <span id="modalProgreso" class="text-2xl font-bold ${textColor}"></span>
          </div>
          <div class="w-full bg-gray-700 rounded-full h-4">
            <div id="modalProgresoBar" class="h-4 rounded-full bg-gradient-to-r from-green-500 to-green-700 transition-all duration-300"></div>
          </div>
        </div>
        
        <div class="grid grid-cols-2 gap-8">
          <!-- Reglas de Negocio -->
          <div>
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-2xl font-bold ${textColor}">📋 Reglas de Negocio</h3>
              <button onclick="window.agregarRegla()" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm">+ Agregar</button>
            </div>
            <div id="modalReglas" class="space-y-2 max-h-96 overflow-y-auto pr-2"></div>
          </div>
          
          <!-- Tareas -->
          <div>
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-2xl font-bold ${textColor}">✅ Tareas</h3>
              <button onclick="window.agregarTarea()" class="px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-white text-sm">+ Agregar</button>
            </div>
            <div id="modalTareas" class="space-y-2 max-h-96 overflow-y-auto pr-2"></div>
          </div>
        </div>
        
        <!-- Botones de Acción -->
        <div class="flex space-x-3 mt-8 pt-6 border-t border-gray-700">
          <button onclick="window.guardarCambiosAgente()" class="flex-1 px-6 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-lg ${textColor} font-bold text-lg shadow-lg hover:shadow-xl transition-all">
            💾 Guardar Cambios
          </button>
          <button onclick="window.cerrarModalAgente()" class="px-6 py-4 bg-gray-700 hover:bg-gray-600 rounded-lg ${textColor} font-bold transition-all">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  `;
}

export function inicializarModalAgentes(agentesData, textColor, textMuted) {
    let agenteActual = null;

    window.abrirModalAgente = function (idx) {
        agenteActual = idx;
        const agente = agentesData[idx];

        // Actualizar header
        document.getElementById('modalIcon').textContent = agente.icon;
        document.getElementById('modalTitulo').textContent = agente.nombre;
        document.getElementById('modalFase').textContent = `Fase: ${agente.fase}`;

        // Estado badge
        const estadoBadge = document.getElementById('modalEstado');
        estadoBadge.textContent = agente.estado.toUpperCase();
        estadoBadge.className = `px-3 py-1 rounded-full text-xs font-bold ${agente.estado === 'activo' ? 'bg-green-500/20 text-green-400' :
                agente.estado === 'desarrollo' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-gray-500/20 text-gray-400'
            }`;

        // Progreso
        document.getElementById('modalProgreso').textContent = `${agente.progreso}%`;
        document.getElementById('modalProgresoBar').style.width = `${agente.progreso}%`;

        // Renderizar reglas
        renderizarReglas();

        // Renderizar tareas
        renderizarTareas();

        // Mostrar modal
        document.getElementById('modalAgente').classList.remove('hidden');
    };

    window.cerrarModalAgente = function () {
        document.getElementById('modalAgente').classList.add('hidden');
        agenteActual = null;
    };

    window.agregarRegla = function () {
        if (agenteActual === null) return;
        agentesData[agenteActual].reglas.push('Nueva regla');
        renderizarReglas();
    };

    window.agregarTarea = function () {
        if (agenteActual === null) return;
        agentesData[agenteActual].tareas.push('Nueva tarea');
        renderizarTareas();
    };

    window.eliminarRegla = function (idx) {
        if (agenteActual === null) return;
        if (confirm('¿Eliminar esta regla?')) {
            agentesData[agenteActual].reglas.splice(idx, 1);
            renderizarReglas();
        }
    };

    window.eliminarTarea = function (idx) {
        if (agenteActual === null) return;
        if (confirm('¿Eliminar esta tarea?')) {
            agentesData[agenteActual].tareas.splice(idx, 1);
            renderizarTareas();
        }
    };

    window.toggleTarea = function (idx) {
        if (agenteActual === null) return;
        const checkbox = document.getElementById(`tarea_${idx}`);
        console.log(`Tarea ${idx} marcada: ${checkbox.checked}`);
    };

    window.guardarCambiosAgente = function () {
        if (agenteActual === null) return;
        alert('✅ Cambios guardados correctamente en memoria.\n\n(En producción se guardaría en la base de datos)');
        window.cerrarModalAgente();
        // Recargar vista de agentes
        if (window.renderContent) window.renderContent();
    };

    function renderizarReglas() {
        if (agenteActual === null) return;
        const agente = agentesData[agenteActual];
        const container = document.getElementById('modalReglas');

        container.innerHTML = agente.reglas.map((r, i) => `
      <div class="flex items-start space-x-2 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
        <span class="${textMuted} text-xs mt-1">${i + 1}.</span>
        <input type="text" value="${r}" 
               onchange="agentesData[${agenteActual}].reglas[${i}]=this.value"
               class="flex-1 bg-transparent border-none ${textColor} focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2 py-1">
        <button onclick="eliminarRegla(${i})" 
                class="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition-opacity">
          🗑️
        </button>
      </div>
    `).join('');
    }

    function renderizarTareas() {
        if (agenteActual === null) return;
        const agente = agentesData[agenteActual];
        const container = document.getElementById('modalTareas');

        container.innerHTML = agente.tareas.map((t, i) => `
      <div class="flex items-start space-x-2 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group">
        <input type="checkbox" id="tarea_${i}" onchange="toggleTarea(${i})" 
               class="mt-1 w-4 h-4 cursor-pointer">
        <input type="text" value="${t}" 
               onchange="agentesData[${agenteActual}].tareas[${i}]=this.value"
               class="flex-1 bg-transparent border-none ${textColor} focus:outline-none focus:ring-2 focus:ring-green-500 rounded px-2 py-1">
        <button onclick="eliminarTarea(${i})" 
                class="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-400 transition-opacity">
          🗑️
        </button>
      </div>
    `).join('');
    }
}
