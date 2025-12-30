// src/agentes/AgentePersonal.jsx
// Agente unificado para gestión de Vendedores y Usuarios del sistema

export default function AgentePersonal() {

    return `
    <div class="space-y-6 max-w-6xl mx-auto">
      <!-- Header -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <button onclick="navegarA('gestion')" 
                  class="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition-colors text-sm">
            ← Volver a Gestión
          </button>
          <h2 class="text-2xl font-bold text-white">👥 Gestión de Personal</h2>
          <span class="px-3 py-1 bg-purple-600 text-white rounded-full text-sm">VENDEDORES + USUARIOS</span>
        </div>
        <button onclick="mostrarFormularioNuevo()" 
                class="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium">
          ➕ Nuevo Personal
        </button>
      </div>

      <!-- Filtros y búsqueda -->
      <div class="bg-gray-800 rounded-lg p-4 border border-gray-700">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Buscar</label>
            <input 
              type="text" 
              id="buscar-personal"
              placeholder="Nombre, usuario, nick..."
              onkeyup="filtrarPersonal()"
              class="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white placeholder-gray-400"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Tipo</label>
            <select 
              id="filtro-tipo"
              onchange="filtrarPersonal()"
              class="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white">
              <option value="">Todos</option>
              <option value="A Comision">A Comisión</option>
              <option value="Empleado">Empleado</option>
              <option value="Empleado a Comision">Empleado a Comisión</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Tienda</label>
            <select 
              id="filtro-tienda"
              onchange="filtrarPersonal()"
              class="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white">
              <option value="">Todas</option>
              <option value="Plaza Dorada">Plaza Dorada</option>
              <option value="Corporativo">Corporativo</option>
              <option value="Kingdom Wireless">Kingdom Wireless</option>
            </select>
          </div>
          <div class="flex items-end">
            <label class="flex items-center space-x-2 text-sm text-gray-300">
              <input 
                type="checkbox" 
                id="ver-eliminados"
                onchange="filtrarPersonal()"
                class="w-4 h-4 bg-gray-900 border-gray-600 rounded"
              />
              <span>Ver eliminados</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Tabla de Personal -->
      <div class="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-sm text-left text-gray-300">
            <thead class="text-xs uppercase bg-gray-700 text-gray-300">
              <tr>
                <th class="px-4 py-3">Nombre</th>
                <th class="px-4 py-3">Tipo</th>
                <th class="px-4 py-3">Usuario/Nick</th>
                <th class="px-4 py-3">Comisión %</th>
                <th class="px-4 py-3">Tienda</th>
                <th class="px-4 py-3">Permisos</th>
                <th class="px-4 py-3">Estado</th>
                <th class="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody id="tabla-personal">
              <!-- Se llena dinámicamente -->
            </tbody>
          </table>
        </div>
      </div>

      <!-- Modal de Formulario -->
      <div id="modal-personal" class="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-gray-700">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold text-white" id="modal-titulo">Nuevo Personal</h3>
            <button onclick="cerrarModal()" class="text-gray-400 hover:text-white">
              <span class="text-2xl">×</span>
            </button>
          </div>

          <form id="form-personal" class="space-y-4">
            <!-- Información Básica -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Nombre *</label>
                <input 
                  type="text" 
                  name="nombre" 
                  placeholder="Nombre completo"
                  class="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white placeholder-gray-400"
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Tipo *</label>
                <select 
                  name="tipo" 
                  class="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white"
                  required>
                  <option value="">Seleccionar...</option>
                  <option value="A Comision">A Comisión</option>
                  <option value="Empleado">Empleado</option>
                  <option value="Empleado a Comision">Empleado a Comisión</option>
                </select>
              </div>
            </div>

            <!-- Datos de Vendedor -->
            <div class="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h4 class="text-sm font-medium text-white mb-3">📊 Datos de Vendedor</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Comisión %</label>
                  <input 
                    type="number" 
                    name="comision" 
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    max="100"
                    class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Tienda</label>
                  <select 
                    name="tienda" 
                    class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white">
                    <option value="">Seleccionar...</option>
                    <option value="Plaza Dorada">Plaza Dorada</option>
                    <option value="Corporativo">Corporativo</option>
                    <option value="Kingdom Wireless">Kingdom Wireless</option>
                  </select>
                </div>
              </div>
              <div class="mt-3 flex items-center space-x-4">
                <label class="flex items-center space-x-2 text-sm text-gray-300">
                  <input 
                    type="checkbox" 
                    name="comisionProductos"
                    class="w-4 h-4 bg-gray-800 border-gray-600 rounded"
                  />
                  <span>Comisión de Productos</span>
                </label>
                <label class="flex items-center space-x-2 text-sm text-gray-300">
                  <input 
                    type="checkbox" 
                    name="habilitado"
                    checked
                    class="w-4 h-4 bg-gray-800 border-gray-600 rounded"
                  />
                  <span>Habilitado</span>
                </label>
              </div>
            </div>

            <!-- Datos de Usuario del Sistema -->
            <div class="bg-gray-900 rounded-lg p-4 border border-gray-700">
              <h4 class="text-sm font-medium text-white mb-3">🔐 Acceso al Sistema</h4>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Usuario</label>
                  <input 
                    type="text" 
                    name="usuario" 
                    placeholder="usuario.sistema"
                    class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Nick</label>
                  <input 
                    type="text" 
                    name="nick" 
                    placeholder="Nickname"
                    class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <input 
                    type="password" 
                    name="password" 
                    placeholder="••••••••"
                    class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Repetir Password</label>
                  <input 
                    type="password" 
                    name="repetirPassword" 
                    placeholder="••••••••"
                    class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Permisos</label>
                  <select 
                    name="permisos" 
                    class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white">
                    <option value="">Seleccionar...</option>
                    <option value="CREATOR">CREATOR (Acceso Total)</option>
                    <option value="ADMIN">ADMIN (Administrador)</option>
                    <option value="AGENT">AGENT (Agente/Vendedor)</option>
                    <option value="BASIC">BASIC (Básico)</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-300 mb-2">Ver Stock</label>
                  <select 
                    name="verStock" 
                    class="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white">
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Imagen de Perfil -->
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Imagen de Perfil</label>
              <input 
                type="file" 
                name="imagen" 
                accept="image/*"
                class="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
            </div>

            <!-- Activación -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Días Fin de Activación</label>
                <input 
                  type="number" 
                  name="diasFinActivacion" 
                  placeholder="30"
                  class="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white placeholder-gray-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-300 mb-2">Fecha Fin Activación</label>
                <input 
                  type="date" 
                  name="fechaFinActivacion" 
                  class="w-full px-3 py-2 bg-gray-900 border border-gray-600 rounded-md text-white"
                />
              </div>
            </div>

            <!-- Botones -->
            <div class="flex gap-4 pt-4">
              <button 
                type="submit"
                class="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium">
                💾 Guardar Personal
              </button>
              <button 
                type="button"
                onclick="cerrarModal()"
                class="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-medium">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Alerta -->
      <div id="alerta-personal" style="display: none;" class="fixed bottom-4 right-4 max-w-md"></div>
    </div>
  `;
}

// Datos de ejemplo
const personalData = [
    { id: 1, nombre: 'Dayane', tipo: 'A Comision', usuario: 'DAYANA', nick: 'Dayane', comision: 0.00, tienda: 'Plaza Dorada', permisos: 'AGENT', habilitado: true, fechaVenc: '04/05/2025', verStock: 'No' },
    { id: 2, nombre: 'Gabriel', tipo: 'A Comision', usuario: 'Gabriel', nick: 'Gabriel', comision: 0.00, tienda: 'Plaza Dorada', permisos: 'CREATOR', habilitado: true, fechaVenc: '05/14/2909', verStock: 'Si' },
    { id: 3, nombre: 'Gabriel Sanchez', tipo: 'A Comision', usuario: 'Gabriel', nick: 'GSanchez', comision: 0.00, tienda: 'Corporativo', permisos: 'ADMIN', habilitado: true, fechaVenc: '05/14/2909', verStock: 'Si' },
    { id: 4, nombre: 'Hernan Corp', tipo: 'Empleado a Comision', usuario: 'Hernan', nick: 'HCorp', comision: 0.00, tienda: 'Corporativo', permisos: 'AGENT', habilitado: true, fechaVenc: '12/31/2998', verStock: 'Si' },
    { id: 5, nombre: 'Kenia Kingdom', tipo: 'Empleado', usuario: 'Kingdom', nick: 'Kenia', comision: 0.00, tienda: 'Kingdom Wireless', permisos: 'AGENT', habilitado: true, fechaVenc: '12/01/2025', verStock: 'Si' },
    { id: 6, nombre: 'Maira Dorado', tipo: 'A Comision', usuario: 'Maira Errecalde', nick: 'MDorado', comision: 0.00, tienda: 'Plaza Dorada', permisos: 'AGENT', habilitado: true, fechaVenc: '12/13/2025', verStock: 'Si' },
    { id: 7, nombre: 'Maira Errecalde', tipo: 'Empleado', usuario: 'Maira Errecalde', nick: 'MErrecalde', comision: 0.00, tienda: 'Corporativo', permisos: 'AGENT', habilitado: true, fechaVenc: '12/13/2026', verStock: 'Si' },
    { id: 8, nombre: 'Mayda Salas', tipo: 'Empleado', usuario: 'Mayda', nick: 'MSalas', comision: 0.00, tienda: 'Plaza Dorada', permisos: 'AGENT', habilitado: true, fechaVenc: '12/13/2026', verStock: 'Si' },
    { id: 9, nombre: 'Randy', tipo: 'Empleado', usuario: 'Randy', nick: 'Randy', comision: 0.00, tienda: 'Plaza Dorada', permisos: 'AGENT', habilitado: true, fechaVenc: '12/13/2026', verStock: 'No' },
    { id: 10, nombre: 'Rocio', tipo: 'Empleado', usuario: 'Rocio', nick: 'Rocio', comision: 0.00, tienda: 'Plaza Dorada', permisos: 'AGENT', habilitado: true, fechaVenc: '12/13/2026', verStock: 'Si' },
    { id: 11, nombre: 'Xavier Kingdom', tipo: 'Empleado', usuario: 'Xavier', nick: 'XKingdom', comision: 0.00, tienda: 'Kingdom Wireless', permisos: 'AGENT', habilitado: true, fechaVenc: '', verStock: 'Si' }
];

// Funciones globales
window.mostrarFormularioNuevo = function () {
    document.getElementById('modal-titulo').textContent = 'Nuevo Personal';
    document.getElementById('form-personal').reset();
    document.getElementById('modal-personal').classList.remove('hidden');
};

window.cerrarModal = function () {
    document.getElementById('modal-personal').classList.add('hidden');
};

window.filtrarPersonal = function () {
    const buscar = document.getElementById('buscar-personal').value.toLowerCase();
    const filtroTipo = document.getElementById('filtro-tipo').value;
    const filtroTienda = document.getElementById('filtro-tienda').value;

    const filtrados = personalData.filter(p => {
        const matchBuscar = !buscar ||
            p.nombre.toLowerCase().includes(buscar) ||
            p.usuario.toLowerCase().includes(buscar) ||
            p.nick.toLowerCase().includes(buscar);
        const matchTipo = !filtroTipo || p.tipo === filtroTipo;
        const matchTienda = !filtroTienda || p.tienda === filtroTienda;

        return matchBuscar && matchTipo && matchTienda;
    });

    cargarTablaPersonal(filtrados);
};

function cargarTablaPersonal(data = personalData) {
    const tbody = document.getElementById('tabla-personal');
    tbody.innerHTML = data.map(p => `
    <tr class="border-b border-gray-700 hover:bg-gray-700">
      <td class="px-4 py-3 font-medium text-white">${p.nombre}</td>
      <td class="px-4 py-3">${p.tipo}</td>
      <td class="px-4 py-3">${p.usuario} / ${p.nick}</td>
      <td class="px-4 py-3">${p.comision.toFixed(2)}%</td>
      <td class="px-4 py-3">${p.tienda}</td>
      <td class="px-4 py-3">
        <span class="px-2 py-1 rounded text-xs ${p.permisos === 'CREATOR' ? 'bg-purple-600' :
            p.permisos === 'ADMIN' ? 'bg-blue-600' :
                p.permisos === 'AGENT' ? 'bg-green-600' : 'bg-gray-600'
        }">${p.permisos}</span>
      </td>
      <td class="px-4 py-3">
        <span class="px-2 py-1 rounded text-xs ${p.habilitado ? 'bg-green-600' : 'bg-red-600'}">
          ${p.habilitado ? 'Activo' : 'Inactivo'}
        </span>
      </td>
      <td class="px-4 py-3">
        <div class="flex gap-2">
          <button onclick="editarPersonal(${p.id})" 
                  class="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs">
            ✏️
          </button>
          <button onclick="eliminarPersonal(${p.id})" 
                  class="px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs">
            🗑️
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

window.editarPersonal = function (id) {
    const persona = personalData.find(p => p.id === id);
    if (!persona) return;

    document.getElementById('modal-titulo').textContent = `Editar: ${persona.nombre}`;
    // Aquí cargarías los datos en el formulario
    document.getElementById('modal-personal').classList.remove('hidden');
};

window.eliminarPersonal = function (id) {
    if (confirm('¿Estás seguro de eliminar este personal?')) {
        // Aquí iría la lógica de eliminación
        mostrarAlerta('Personal eliminado correctamente', 'success');
    }
};

function mostrarAlerta(mensaje, tipo = 'info') {
    const alerta = document.getElementById('alerta-personal');
    const colores = {
        success: 'bg-green-900 border-green-500 text-green-200',
        error: 'bg-red-900 border-red-500 text-red-200',
        info: 'bg-blue-900 border-blue-500 text-blue-200'
    };

    alerta.className = `p-4 border-l-4 rounded-md ${colores[tipo]}`;
    alerta.textContent = mensaje;
    alerta.style.display = 'block';

    setTimeout(() => {
        alerta.style.display = 'none';
    }, 3000);
}

// Cargar tabla al inicio
setTimeout(() => {
    if (document.getElementById('tabla-personal')) {
        cargarTablaPersonal();
    }
}, 100);
