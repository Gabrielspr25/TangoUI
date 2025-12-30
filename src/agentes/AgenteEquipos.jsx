// src/agentes/AgenteEquipos.jsx
// Agente especializado para gestión de equipos con validaciones avanzadas

function AgenteEquipos() {
  // Estado del formulario (simulado con variables)
  let formData = {
    codigo: "",
    modelo: "",
    marca: "",
    costo: "",
    tipoIngreso: "externo",
    fechaCompra: new Date().toISOString().split('T')[0],
    factura: "",
    tienda: "",
    imei: "",
    historial: ""
  };

  // Función para validar IMEI
  function validarIMEI(imei) {
    if (!imei || (imei.length !== 15 && imei.length !== 20)) {
      return "El IMEI debe tener exactamente 15 o 20 dígitos.";
    }
    if (!/^\d{15}$|^\d{20}$/.test(imei)) {
      return "El IMEI solo debe contener números.";
    }
    return null;
  }

  // Función para manejar el registro
  function manejarRegistro() {
    const form = document.getElementById('form-agente-equipos');
    const formDataObj = new FormData(form);

    const imei = formDataObj.get('imei');
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

  // Función para validar IMEI en tiempo real
  function validarIMEITiempoReal() {
    const imeiInput = document.querySelector('input[name="imei"]');
    const imei = imeiInput.value;
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

  return `
    <div class="space-y-6 max-w-4xl mx-auto">
      <div class="flex items-center space-x-4">
        <button onclick="navegarA('gestion')" class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">
          ← Volver a Gestión
        </button>
        <h2 class="text-2xl font-bold text-white">📱 Gestión de Equipos</h2>
        <span class="px-3 py-1 bg-green-600 text-white rounded-full text-sm">FORMULARIO ✅</span>
      </div>
      
      <div class="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h3 class="text-lg font-medium text-white mb-4">📋 Registro de Equipos</h3>
        <p class="text-gray-400 mb-6">Formulario para registro manual o importación masiva</p>
        
        <form id="form-agente-equipos" class="space-y-4" onsubmit="event.preventDefault(); manejarRegistro();">
          <!-- Nombre Modelo -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Nombre Modelo *</label>
            <input 
              type="text" 
              name="nombreModelo" 
              placeholder="Ej: AIRPODS 3RD GEN WHITE" 
              class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <!-- Código -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Código *</label>
            <input 
              type="text" 
              name="codigo" 
              placeholder="Ej: 7009429" 
              class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <!-- Costo -->
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Costo *</label>
            <div class="relative">
              <span class="absolute left-3 top-2 text-gray-400">$</span>
              <input 
                type="number" 
                name="costo" 
                placeholder="0.00" 
                step="0.01"
                min="0"
                class="w-full pl-8 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>

          <!-- Externo (Checkbox) -->
          <div class="flex items-center space-x-3">
            <input 
              type="checkbox" 
              name="externo" 
              id="externo-checkbox"
              class="w-4 h-4 bg-gray-800 border-gray-600 rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <label for="externo-checkbox" class="text-sm font-medium text-gray-300">
              Externo
            </label>
            <span class="text-xs text-gray-500">(Marcar si el equipo es externo)</span>
          </div>

          <!-- Botones -->
          <div class="flex gap-4 pt-4">
            <button 
              type="submit"
              class="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              💾 Guardar Equipo
            </button>
            <button 
              type="button"
              onclick="limpiarFormulario()"
              class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-medium transition-colors"
            >
              🔄 Limpiar
            </button>
          </div>
        </form>

        <!-- Alerta -->
        <div id="alerta-agente-equipos" style="display: none;" class="mt-4"></div>
      </div>

      <!-- Panel de información -->
      <div class="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h4 class="text-sm font-medium text-white mb-2">ℹ️ Información</h4>
        <ul class="text-sm text-gray-400 space-y-1">
          <li>• <strong>Nombre Modelo:</strong> Descripción completa del equipo</li>
          <li>• <strong>Código:</strong> Identificador único del producto</li>
          <li>• <strong>Costo:</strong> Precio del equipo en dólares</li>
          <li>• <strong>Externo:</strong> Marcar si el equipo no pertenece al inventario interno</li>
        </ul>
      </div>

      <!-- Opciones de importación -->
      <div class="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <h4 class="text-sm font-medium text-white mb-2">📥 Importación Masiva</h4>
        <p class="text-sm text-gray-400 mb-3">Para cargar múltiples equipos desde un archivo CSV</p>
        <button 
          onclick="navegarA('gestion', 'importacionEquipos')"
          class="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-md text-sm font-medium transition-colors"
        >
          📂 Ir a Importación Masiva
        </button>
      </div>
    </div>
  `;
}

// Hacer función disponible globalmente
window.manejarRegistro = function () {
  const form = document.getElementById('form-agente-equipos');
  const formDataObj = new FormData(form);
  const alertaDiv = document.getElementById('alerta-agente-equipos');

  // Obtener valores
  const nombreModelo = formDataObj.get('nombreModelo');
  const codigo = formDataObj.get('codigo');
  const costo = formDataObj.get('costo');
  const externo = formDataObj.get('externo') === 'on';

  // Validar campos requeridos
  if (!nombreModelo || !codigo || !costo) {
    alertaDiv.className = 'p-4 border-l-4 rounded-md bg-yellow-900 border-yellow-500 text-yellow-200';
    alertaDiv.textContent = 'Por favor completa todos los campos requeridos';
    alertaDiv.style.display = 'block';
    return;
  }

  // Aquí iría la lógica para guardar en la base de datos
  // Por ahora solo mostramos mensaje de éxito
  alertaDiv.className = 'p-4 border-l-4 rounded-md bg-green-900 border-green-500 text-green-200';
  alertaDiv.innerHTML = `
    ✅ Equipo registrado correctamente<br>
    <small>Nombre: ${nombreModelo} | Código: ${codigo} | Costo: $${costo} | Externo: ${externo ? 'Sí' : 'No'}</small>
  `;
  alertaDiv.style.display = 'block';

  // Limpiar formulario después de 2 segundos
  setTimeout(() => {
    form.reset();
    alertaDiv.style.display = 'none';
  }, 3000);
};

window.limpiarFormulario = function () {
  const form = document.getElementById('form-agente-equipos');
  const alertaDiv = document.getElementById('alerta-agente-equipos');
  form.reset();
  alertaDiv.style.display = 'none';
};

export default AgenteEquipos;