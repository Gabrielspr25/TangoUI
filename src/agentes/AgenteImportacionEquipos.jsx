// src/agentes/AgenteImportacionEquipos.jsx
// Agente para importación masiva de equipos desde CSV o imagen

export default function AgenteImportacionEquipos() {

    // Función para procesar archivo CSV
    async function procesarCSV(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target.result;
            const lines = text.split('\n');
            const equipos = [];

            // Saltar la primera línea (headers)
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;

                const [nombreModelo, codigo, costo, externo] = line.split(',');
                equipos.push({
                    nombreModelo: nombreModelo?.trim(),
                    codigo: codigo?.trim(),
                    costo: parseFloat(costo?.trim() || 0),
                    externo: externo?.trim() === 'Si'
                });
            }

            mostrarVistaPrevia(equipos);
        };
        reader.readAsText(file);
    }

    // Función para mostrar vista previa
    function mostrarVistaPrevia(equipos) {
        const container = document.getElementById('vista-previa-equipos');
        const totalEquipos = equipos.length;
        const totalCosto = equipos.reduce((sum, eq) => sum + eq.costo, 0);

        let html = `
      <div class="bg-blue-900 border-l-4 border-blue-500 p-4 mb-4">
        <p class="text-blue-200">
          ✅ Se encontraron <strong>${totalEquipos} equipos</strong> 
          con un valor total de <strong>$${totalCosto.toFixed(2)}</strong>
        </p>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-300">
          <thead class="text-xs uppercase bg-gray-700 text-gray-300">
            <tr>
              <th class="px-4 py-3">#</th>
              <th class="px-4 py-3">Nombre/Modelo</th>
              <th class="px-4 py-3">Código</th>
              <th class="px-4 py-3">Costo</th>
              <th class="px-4 py-3">Externo</th>
            </tr>
          </thead>
          <tbody>
    `;

        equipos.forEach((eq, index) => {
            html += `
        <tr class="border-b border-gray-700 hover:bg-gray-700">
          <td class="px-4 py-3">${index + 1}</td>
          <td class="px-4 py-3 font-medium">${eq.nombreModelo}</td>
          <td class="px-4 py-3">${eq.codigo}</td>
          <td class="px-4 py-3">$${eq.costo.toFixed(2)}</td>
          <td class="px-4 py-3">
            <span class="px-2 py-1 rounded text-xs ${eq.externo ? 'bg-yellow-600' : 'bg-green-600'}">
              ${eq.externo ? 'Sí' : 'No'}
            </span>
          </td>
        </tr>
      `;
        });

        html += `
          </tbody>
        </table>
      </div>
      
      <div class="mt-6 flex gap-4">
        <button onclick="importarEquipos()" 
                class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium">
          📥 Importar ${totalEquipos} Equipos
        </button>
        <button onclick="cancelarImportacion()" 
                class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-md">
          ❌ Cancelar
        </button>
      </div>
    `;

        container.innerHTML = html;

        // Guardar equipos en variable global para importación
        window.equiposParaImportar = equipos;
    }

    return `
    <div class="space-y-6 max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" 
                class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">
          ← Volver a Gestión
        </button>
        <h2 class="text-2xl font-bold text-white">📥 Importación Masiva de Equipos</h2>
        <span class="px-3 py-1 bg-purple-600 text-white rounded-full text-sm">IA POWERED ✨</span>
      </div>
      
      <!-- Instrucciones -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 class="text-lg font-medium text-white mb-4">📋 Cómo Importar Equipos</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
          <div class="flex items-start space-x-3">
            <span class="text-2xl">1️⃣</span>
            <div>
              <h4 class="font-medium text-white">Preparar Archivo</h4>
              <p class="text-sm">Formato CSV con columnas: Nombre Modelo, Codigo, Costo, Externo</p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <span class="text-2xl">2️⃣</span>
            <div>
              <h4 class="font-medium text-white">Subir Archivo</h4>
              <p class="text-sm">Selecciona tu archivo CSV o arrastra aquí</p>
            </div>
          </div>
          <div class="flex items-start space-x-3">
            <span class="text-2xl">3️⃣</span>
            <div>
              <h4 class="font-medium text-white">Revisar e Importar</h4>
              <p class="text-sm">Verifica los datos y confirma la importación</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Área de carga -->
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 class="text-lg font-medium text-white mb-4">📂 Seleccionar Archivo CSV</h3>
        
        <div class="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
          <input type="file" 
                 id="csv-file-input" 
                 accept=".csv,.txt"
                 onchange="procesarCSV(event)"
                 class="hidden" />
          
          <label for="csv-file-input" class="cursor-pointer">
            <div class="text-6xl mb-4">📄</div>
            <p class="text-white font-medium mb-2">Click para seleccionar archivo CSV</p>
            <p class="text-gray-400 text-sm">o arrastra el archivo aquí</p>
            <p class="text-gray-500 text-xs mt-2">Formatos soportados: .csv, .txt</p>
          </label>
        </div>
        
        <!-- Ejemplo de formato -->
        <div class="mt-4 p-4 bg-gray-900 rounded border border-gray-700">
          <p class="text-xs text-gray-400 mb-2">📝 Ejemplo de formato CSV:</p>
          <pre class="text-xs text-green-400 font-mono">Nombre Modelo,Codigo,Costo,Externo
AIRPODS 3RD GEN WHITE,7009429,219.99,No
APPLE AIRPODS PRO 2GEN,7010960,249.99,No</pre>
        </div>
      </div>
      
      <!-- Vista previa de equipos -->
      <div id="vista-previa-equipos" class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <div class="text-center text-gray-400 py-8">
          <div class="text-4xl mb-2">⏳</div>
          <p>Esperando archivo CSV...</p>
        </div>
      </div>
      
      <!-- Alertas -->
      <div id="alerta-importacion" style="display: none;"></div>
    </div>
  `;
}

// Funciones globales
window.procesarCSV = function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
        const text = e.target.result;
        const lines = text.split('\n');
        const equipos = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) continue;

            const [nombreModelo, codigo, costo, externo] = line.split(',');
            equipos.push({
                nombreModelo: nombreModelo?.trim(),
                codigo: codigo?.trim(),
                costo: parseFloat(costo?.trim() || 0),
                externo: externo?.trim() === 'Si'
            });
        }

        mostrarVistaPrevia(equipos);
    };
    reader.readAsText(file);
};

function mostrarVistaPrevia(equipos) {
    const container = document.getElementById('vista-previa-equipos');
    const totalEquipos = equipos.length;
    const totalCosto = equipos.reduce((sum, eq) => sum + eq.costo, 0);

    let html = `
    <div class="bg-blue-900 border-l-4 border-blue-500 p-4 mb-4">
      <p class="text-blue-200">
        ✅ Se encontraron <strong>${totalEquipos} equipos</strong> 
        con un valor total de <strong>$${totalCosto.toFixed(2)}</strong>
      </p>
    </div>
    
    <div class="overflow-x-auto max-h-96">
      <table class="w-full text-sm text-left text-gray-300">
        <thead class="text-xs uppercase bg-gray-700 text-gray-300 sticky top-0">
          <tr>
            <th class="px-4 py-3">#</th>
            <th class="px-4 py-3">Nombre/Modelo</th>
            <th class="px-4 py-3">Código</th>
            <th class="px-4 py-3">Costo</th>
            <th class="px-4 py-3">Externo</th>
          </tr>
        </thead>
        <tbody>
  `;

    equipos.forEach((eq, index) => {
        html += `
      <tr class="border-b border-gray-700 hover:bg-gray-700">
        <td class="px-4 py-3">${index + 1}</td>
        <td class="px-4 py-3 font-medium">${eq.nombreModelo}</td>
        <td class="px-4 py-3">${eq.codigo}</td>
        <td class="px-4 py-3">$${eq.costo.toFixed(2)}</td>
        <td class="px-4 py-3">
          <span class="px-2 py-1 rounded text-xs ${eq.externo ? 'bg-yellow-600' : 'bg-green-600'}">
            ${eq.externo ? 'Sí' : 'No'}
          </span>
        </td>
      </tr>
    `;
    });

    html += `
        </tbody>
      </table>
    </div>
    
    <div class="mt-6 flex gap-4">
      <button onclick="importarEquipos()" 
              class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium">
        📥 Importar ${totalEquipos} Equipos
      </button>
      <button onclick="cancelarImportacion()" 
              class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-md">
        ❌ Cancelar
      </button>
    </div>
  `;

    container.innerHTML = html;
    window.equiposParaImportar = equipos;
}

window.importarEquipos = async function () {
    const equipos = window.equiposParaImportar;
    if (!equipos || equipos.length === 0) return;

    const alerta = document.getElementById('alerta-importacion');
    alerta.className = 'p-4 border-l-4 rounded-md bg-blue-900 border-blue-500 text-blue-200';
    alerta.textContent = `⏳ Importando ${equipos.length} equipos...`;
    alerta.style.display = 'block';

    try {
        // Llamada real al backend
        const response = await fetch('http://localhost:3000/api/equipos/importar', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ equipos })
        });

        const data = await response.json();

        if (data.success) {
            alerta.className = 'p-4 border-l-4 rounded-md bg-green-900 border-green-500 text-green-200';
            alerta.innerHTML = `
        ✅ Importación completada!<br>
        <strong>Exitosos:</strong> ${data.data.exitosos}<br>
        <strong>Fallidos:</strong> ${data.data.fallidos}
      `;

            setTimeout(() => {
                navegarA('gestion', 'equipos');
            }, 3000);
        } else {
            throw new Error(data.message);
        }

    } catch (error) {
        alerta.className = 'p-4 border-l-4 rounded-md bg-red-900 border-red-500 text-red-200';
        alerta.innerHTML = `
      ❌ Error al importar: ${error.message}<br>
      <small>Asegúrate de que el backend esté corriendo en http://localhost:3000</small>
    `;
    }
};

window.cancelarImportacion = function () {
    document.getElementById('vista-previa-equipos').innerHTML = `
    <div class="text-center text-gray-400 py-8">
      <div class="text-4xl mb-2">⏳</div>
      <p>Esperando archivo CSV...</p>
    </div>
  `;
    window.equiposParaImportar = null;
    document.getElementById('csv-file-input').value = '';
};
