import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <h1 class="text-xl font-semibold text-gray-900">Sistema Claro</h1>
          </div>
          <nav class="hidden md:block">
            <div class="ml-10 flex items-baseline space-x-4">
              <a href="#" class="text-gray-900 hover:text-gray-600 px-3 py-2 rounded-md text-sm font-medium">Inicio</a>
              <a href="#" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Clientes</a>
              <a href="#" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Servicios</a>
              <a href="#" class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">Reportes</a>
            </div>
          </nav>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <!-- Dashboard Cards -->
      <div class="px-4 py-6 sm:px-0">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <!-- Card 1 -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm font-medium">C</span>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Total Clientes</dt>
                    <dd class="text-lg font-medium text-gray-900">1,247</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 2 -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm font-medium">S</span>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Servicios Activos</dt>
                    <dd class="text-lg font-medium text-gray-900">892</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 3 -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm font-medium">P</span>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Pendientes</dt>
                    <dd class="text-lg font-medium text-gray-900">23</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 4 -->
          <div class="bg-white overflow-hidden shadow rounded-lg">
            <div class="p-5">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span class="text-white text-sm font-medium">R</span>
                  </div>
                </div>
                <div class="ml-5 w-0 flex-1">
                  <dl>
                    <dt class="text-sm font-medium text-gray-500 truncate">Reportes</dt>
                    <dd class="text-lg font-medium text-gray-900">156</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">Bienvenido al Sistema Claro</h3>
            <p class="text-sm text-gray-500 mb-6">
              Gestiona tus clientes, servicios y reportes de manera eficiente desde este panel de control.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 class="text-md font-medium text-gray-900 mb-2">Acciones Rápidas</h4>
                <div class="space-y-2">
                  <button class="w-full text-left px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-md text-sm text-blue-700 transition-colors">
                    + Nuevo Cliente
                  </button>
                  <button class="w-full text-left px-4 py-2 bg-green-50 hover:bg-green-100 rounded-md text-sm text-green-700 transition-colors">
                    + Nuevo Servicio
                  </button>
                  <button class="w-full text-left px-4 py-2 bg-yellow-50 hover:bg-yellow-100 rounded-md text-sm text-yellow-700 transition-colors">
                    📊 Ver Reportes
                  </button>
                </div>
              </div>
              
              <div>
                <h4 class="text-md font-medium text-gray-900 mb-2">Actividad Reciente</h4>
                <div class="space-y-2 text-sm text-gray-600">
                  <div class="flex justify-between">
                    <span>Cliente nuevo registrado</span>
                    <span class="text-gray-400">Hace 2 min</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Servicio actualizado</span>
                    <span class="text-gray-400">Hace 15 min</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Reporte generado</span>
                    <span class="text-gray-400">Hace 1 hora</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
`
