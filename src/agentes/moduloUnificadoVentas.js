export function getModuloUnificadoVentasContent() {
  // Estado para manejar la pestaña activa
  let pestanaActiva = 'generar-venta';

  function cambiarPestana(nuevaPestana) {
    pestanaActiva = nuevaPestana;
    // Re-renderizar el contenido
    const contenedor = document.querySelector('.modulo-unificado-content');
    if (contenedor) {
      contenedor.innerHTML = getContenidoPestana();
      configurarEventos();
    }
    // Actualizar estilos de pestañas
    actualizarEstilosPestanas();
  }

  function actualizarEstilosPestanas() {
    document.querySelectorAll('.pestana-btn').forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.pestana === pestanaActiva) {
        btn.classList.add('active');
      }
    });
  }

  function getContenidoPestana() {
    switch (pestanaActiva) {
      case 'generar-venta':
        return getGenerarVentaContent();
      case 'consulta-general':
        return getConsultaGeneralContent();
      case 'consulta-fijo':
        return getConsultaFijoContent();
      case 'consulta-pymes':
        return getConsultaPymesContent();
      case 'activaciones':
        return getActivacionesContent();
      default:
        return getGenerarVentaContent();
    }
  }

  function getGenerarVentaContent() {
    return `
      <div class="seccion-contenido">
        <div class="seccion-header">
          <h3 class="text-xl font-bold text-white mb-2">🛒 Generar Nueva Venta</h3>
          <p class="text-gray-400 text-sm">Complete los datos para generar una nueva venta</p>
        </div>
        
        <form id="form-generar-venta" class="form-grid">
          <div class="form-group">
            <label>Cliente *</label>
            <input type="text" name="cliente" placeholder="Nombre del cliente" required />
          </div>
          
          <div class="form-group">
            <label>Documento *</label>
            <input type="text" name="documento" placeholder="Documento de identidad" required />
          </div>
          
          <div class="form-group">
            <label>Teléfono *</label>
            <input type="tel" name="telefono" placeholder="Número de teléfono" required />
          </div>
          
          <div class="form-group">
            <label>Plan *</label>
            <select name="plan" required>
              <option value="">Seleccionar plan</option>
              <option value="basico">Plan Básico - $15.000</option>
              <option value="premium">Plan Premium - $25.000</option>
              <option value="empresarial">Plan Empresarial - $45.000</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Vendedor *</label>
            <select name="vendedor" required>
              <option value="">Seleccionar vendedor</option>
              <option value="juan">Juan Pérez</option>
              <option value="maria">María García</option>
              <option value="carlos">Carlos López</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Fecha de venta</label>
            <input type="date" name="fecha" value="${new Date().toISOString().split('T')[0]}" />
          </div>
          
          <div class="form-group form-group-full">
            <label>Observaciones</label>
            <textarea name="observaciones" placeholder="Comentarios adicionales..." rows="3"></textarea>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">Generar Venta</button>
            <button type="reset" class="btn-secondary">Limpiar</button>
          </div>
        </form>
        
        <div id="mensaje-venta" class="mensaje" style="display: none;"></div>
      </div>
    `;
  }

  function getConsultaGeneralContent() {
    return `
      <div class="seccion-contenido">
        <div class="seccion-header">
          <h3 class="text-xl font-bold text-white mb-2">💰 Consultar Base General</h3>
          <p class="text-gray-400 text-sm">Consulta de base de datos general de clientes</p>
        </div>
        
        <form id="form-consulta-general" class="form-grid">
          <div class="form-group">
            <label>Filtrar por Cliente</label>
            <input type="text" name="filtro-cliente" placeholder="Nombre del cliente" />
          </div>
          
          <div class="form-group">
            <label>Filtrar por Documento</label>
            <input type="text" name="filtro-documento" placeholder="Documento de identidad" />
          </div>
          
          <div class="form-group">
            <label>Fecha desde</label>
            <input type="date" name="fecha-desde" />
          </div>
          
          <div class="form-group">
            <label>Fecha hasta</label>
            <input type="date" name="fecha-hasta" />
          </div>
          
          <div class="form-group">
            <label>Estado</label>
            <select name="estado">
              <option value="">Todos los estados</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="suspendido">Suspendido</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Vendedor</label>
            <select name="vendedor">
              <option value="">Todos los vendedores</option>
              <option value="juan">Juan Pérez</option>
              <option value="maria">María García</option>
              <option value="carlos">Carlos López</option>
            </select>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">Consultar</button>
            <button type="button" class="btn-secondary" onclick="exportarExcel('general')">Exportar Excel</button>
          </div>
        </form>
        
        <div id="resultados-general" class="resultados-tabla" style="display: none;">
          <div class="tabla-header">
            <h4 class="text-white font-medium">Resultados de la consulta</h4>
          </div>
          <div class="tabla-contenido">
            <!-- Los resultados se cargarán aquí -->
          </div>
        </div>
      </div>
    `;
  }

  function getConsultaFijoContent() {
    return `
      <div class="seccion-contenido">
        <div class="seccion-header">
          <h3 class="text-xl font-bold text-white mb-2">📞 Consultar Base FIJO</h3>
          <p class="text-gray-400 text-sm">Consulta específica para servicios de telefonía fija</p>
        </div>
        
        <form id="form-consulta-fijo" class="form-grid">
          <div class="form-group">
            <label>Número Fijo</label>
            <input type="tel" name="numero-fijo" placeholder="Número de teléfono fijo" />
          </div>
          
          <div class="form-group">
            <label>Dirección</label>
            <input type="text" name="direccion" placeholder="Dirección del servicio" />
          </div>
          
          <div class="form-group">
            <label>Zona</label>
            <select name="zona">
              <option value="">Todas las zonas</option>
              <option value="centro">Centro</option>
              <option value="norte">Norte</option>
              <option value="sur">Sur</option>
              <option value="este">Este</option>
              <option value="oeste">Oeste</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Plan FIJO</label>
            <select name="plan-fijo">
              <option value="">Todos los planes</option>
              <option value="basico-fijo">Básico Fijo</option>
              <option value="plus-fijo">Plus Fijo</option>
              <option value="premium-fijo">Premium Fijo</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Estado Técnico</label>
            <select name="estado-tecnico">
              <option value="">Todos</option>
              <option value="operativo">Operativo</option>
              <option value="falla">Con falla</option>
              <option value="mantenimiento">En mantenimiento</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Fecha Instalación</label>
            <input type="date" name="fecha-instalacion" />
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">Consultar FIJO</button>
            <button type="button" class="btn-secondary" onclick="exportarExcel('fijo')">Exportar Excel</button>
          </div>
        </form>
        
        <div id="resultados-fijo" class="resultados-tabla" style="display: none;">
          <div class="tabla-header">
            <h4 class="text-white font-medium">Resultados FIJO</h4>
          </div>
          <div class="tabla-contenido">
            <!-- Los resultados se cargarán aquí -->
          </div>
        </div>
      </div>
    `;
  }

  function getConsultaPymesContent() {
    return `
      <div class="seccion-contenido">
        <div class="seccion-header">
          <h3 class="text-xl font-bold text-white mb-2">🏪 Consultar Base PYMES</h3>
          <p class="text-gray-400 text-sm">Consulta específica para pequeñas y medianas empresas</p>
        </div>
        
        <form id="form-consulta-pymes" class="form-grid">
          <div class="form-group">
            <label>Empresa</label>
            <input type="text" name="empresa" placeholder="Nombre de la empresa" />
          </div>
          
          <div class="form-group">
            <label>NIT/RUT</label>
            <input type="text" name="nit" placeholder="Número de identificación tributaria" />
          </div>
          
          <div class="form-group">
            <label>Sector Económico</label>
            <select name="sector">
              <option value="">Todos los sectores</option>
              <option value="comercio">Comercio</option>
              <option value="servicios">Servicios</option>
              <option value="manufactura">Manufactura</option>
              <option value="tecnologia">Tecnología</option>
              <option value="construccion">Construcción</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Tamaño Empresa</label>
            <select name="tamano">
              <option value="">Todos los tamaños</option>
              <option value="micro">Microempresa</option>
              <option value="pequena">Pequeña</option>
              <option value="mediana">Mediana</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Plan Empresarial</label>
            <select name="plan-empresa">
              <option value="">Todos los planes</option>
              <option value="starter">Starter</option>
              <option value="business">Business</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Ejecutivo Comercial</label>
            <select name="ejecutivo">
              <option value="">Todos los ejecutivos</option>
              <option value="ana">Ana Rodríguez</option>
              <option value="pedro">Pedro Martínez</option>
              <option value="lucia">Lucía Fernández</option>
            </select>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">Consultar PYMES</button>
            <button type="button" class="btn-secondary" onclick="exportarExcel('pymes')">Exportar Excel</button>
          </div>
        </form>
        
        <div id="resultados-pymes" class="resultados-tabla" style="display: none;">
          <div class="tabla-header">
            <h4 class="text-white font-medium">Resultados PYMES</h4>
          </div>
          <div class="tabla-contenido">
            <!-- Los resultados se cargarán aquí -->
          </div>
        </div>
      </div>
    `;
  }

  function getActivacionesContent() {
    return `
      <div class="seccion-contenido">
        <div class="seccion-header">
          <h3 class="text-xl font-bold text-white mb-2">👥 Gestión de Activaciones</h3>
          <p class="text-gray-400 text-sm">Control de activaciones de líneas y servicios</p>
        </div>
        
        <form id="form-activaciones" class="form-grid">
          <div class="form-group">
            <label>Número de Línea</label>
            <input type="tel" name="numero-linea" placeholder="Número de línea a activar" />
          </div>
          
          <div class="form-group">
            <label>IMEI del Equipo</label>
            <input type="text" name="imei-activacion" placeholder="IMEI del dispositivo" />
          </div>
          
          <div class="form-group">
            <label>SIM Card</label>
            <input type="text" name="sim-activacion" placeholder="Número de SIM" />
          </div>
          
          <div class="form-group">
            <label>Plan Asignado</label>
            <select name="plan-activacion">
              <option value="">Seleccionar plan</option>
              <option value="prepago">Prepago</option>
              <option value="postpago-basico">Postpago Básico</option>
              <option value="postpago-premium">Postpago Premium</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Tipo de Activación</label>
            <select name="tipo-activacion">
              <option value="">Seleccionar tipo</option>
              <option value="nueva">Nueva Línea</option>
              <option value="cambio-equipo">Cambio de Equipo</option>
              <option value="portabilidad">Portabilidad</option>
            </select>
          </div>
          
          <div class="form-group">
            <label>Estado</label>
            <select name="estado-activacion">
              <option value="">Filtrar por estado</option>
              <option value="pendiente">Pendiente</option>
              <option value="activada">Activada</option>
              <option value="fallida">Fallida</option>
            </select>
          </div>
          
          <div class="form-actions">
            <button type="submit" class="btn-primary">Procesar Activación</button>
            <button type="button" class="btn-secondary" onclick="consultarActivaciones()">Consultar Activaciones</button>
          </div>
        </form>
        
        <div id="resultados-activaciones" class="resultados-tabla" style="display: none;">
          <div class="tabla-header">
            <h4 class="text-white font-medium">Estado de Activaciones</h4>
          </div>
          <div class="tabla-contenido">
            <!-- Los resultados se cargarán aquí -->
          </div>
        </div>
      </div>
    `;
  }

  function configurarEventos() {
    // Configurar eventos para cada formulario según la pestaña activa
    const formularios = {
      'generar-venta': configurarGenerarVenta,
      'consulta-general': configurarConsultaGeneral,
      'consulta-fijo': configurarConsultaFijo,
      'consulta-pymes': configurarConsultaPymes,
      'activaciones': configurarActivaciones
    };

    if (formularios[pestanaActiva]) {
      formularios[pestanaActiva]();
    }
  }

  function configurarGenerarVenta() {
    const form = document.getElementById('form-generar-venta');
    if (form) {
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const mensaje = document.getElementById('mensaje-venta');
        
        try {
          // Simular envío a API
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          mensaje.className = 'mensaje exito';
          mensaje.textContent = '✅ Venta generada exitosamente';
          mensaje.style.display = 'block';
          
          form.reset();
        } catch (error) {
          mensaje.className = 'mensaje error';
          mensaje.textContent = '❌ Error al generar la venta';
          mensaje.style.display = 'block';
        }
      });
    }
  }

  function configurarConsultaGeneral() {
    const form = document.getElementById('form-consulta-general');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        mostrarResultados('general');
      });
    }
  }

  function configurarConsultaFijo() {
    const form = document.getElementById('form-consulta-fijo');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        mostrarResultados('fijo');
      });
    }
  }

  function configurarConsultaPymes() {
    const form = document.getElementById('form-consulta-pymes');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        mostrarResultados('pymes');
      });
    }
  }

  function configurarActivaciones() {
    const form = document.getElementById('form-activaciones');
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        procesarActivacion();
      });
    }
  }

  function mostrarResultados(tipo) {
    const resultadosDiv = document.getElementById(`resultados-${tipo}`);
    if (resultadosDiv) {
      resultadosDiv.style.display = 'block';
      const contenido = resultadosDiv.querySelector('.tabla-contenido');
      contenido.innerHTML = `
        <div class="loading">
          <p class="text-gray-400">Consultando datos...</p>
        </div>
      `;
      
      // Simular carga de datos
      setTimeout(() => {
        contenido.innerHTML = `
          <table class="tabla-resultados">
            <thead>
              <tr>
                <th>Cliente</th>
                <th>Documento</th>
                <th>Teléfono</th>
                <th>Plan</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Juan Ejemplo</td>
                <td>12345678</td>
                <td>555-0123</td>
                <td>Premium</td>
                <td><span class="estado activo">Activo</span></td>
                <td><button class="btn-accion">Ver</button></td>
              </tr>
            </tbody>
          </table>
        `;
      }, 1500);
    }
  }

  function procesarActivacion() {
    const resultadosDiv = document.getElementById('resultados-activaciones');
    if (resultadosDiv) {
      resultadosDiv.style.display = 'block';
      const contenido = resultadosDiv.querySelector('.tabla-contenido');
      contenido.innerHTML = `
        <div class="activacion-proceso">
          <p class="text-green-400">✅ Procesando activación...</p>
          <p class="text-gray-400">Validando datos y activando línea</p>
        </div>
      `;
    }
  }

  // Funciones globales
  window.exportarExcel = function(tipo) {
    const mensaje = document.createElement('div');
    mensaje.className = 'mensaje exito';
    mensaje.textContent = `📊 Exportando datos de ${tipo} a Excel...`;
    mensaje.style.display = 'block';
    document.querySelector('.seccion-contenido').appendChild(mensaje);
    
    setTimeout(() => mensaje.remove(), 3000);
  };

  window.consultarActivaciones = function() {
    mostrarResultados('activaciones');
  };

  const container = document.createElement("div");
  container.className = "modulo-unificado-container";
  container.innerHTML = `
    <div class="modulo-header">
      <h2 class="modulo-titulo">📊 Centro de Ventas y Consultas</h2>
      <p class="modulo-descripcion">Módulo unificado para generación de ventas, consultas y activaciones</p>
    </div>
    
    <div class="pestanas-container">
      <button class="pestana-btn active" data-pestana="generar-venta" onclick="cambiarPestanaUnificada('generar-venta')">
        🛒 Generar Venta
      </button>
      <button class="pestana-btn" data-pestana="consulta-general" onclick="cambiarPestanaUnificada('consulta-general')">
        💰 Base General
      </button>
      <button class="pestana-btn" data-pestana="consulta-fijo" onclick="cambiarPestanaUnificada('consulta-fijo')">
        📞 Base FIJO
      </button>
      <button class="pestana-btn" data-pestana="consulta-pymes" onclick="cambiarPestanaUnificada('consulta-pymes')">
        🏪 Base PYMES
      </button>
      <button class="pestana-btn" data-pestana="activaciones" onclick="cambiarPestanaUnificada('activaciones')">
        👥 Activaciones
      </button>
    </div>
    
    <div class="modulo-unificado-content">
      ${getContenidoPestana()}
    </div>

    <style>
      .modulo-unificado-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        background: #1f2937;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      
      .modulo-header {
        margin-bottom: 24px;
        text-align: center;
      }
      
      .modulo-titulo {
        font-size: 28px;
        font-weight: bold;
        color: #f9fafb;
        margin: 0 0 8px 0;
      }
      
      .modulo-descripcion {
        color: #9ca3af;
        margin: 0;
      }
      
      .pestanas-container {
        display: flex;
        gap: 8px;
        margin-bottom: 24px;
        background: #374151;
        padding: 4px;
        border-radius: 8px;
        overflow-x: auto;
      }
      
      .pestana-btn {
        flex: 1;
        min-width: 140px;
        padding: 12px 16px;
        background: transparent;
        color: #9ca3af;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        font-size: 14px;
        transition: all 0.2s;
        white-space: nowrap;
      }
      
      .pestana-btn:hover {
        background: #4b5563;
        color: #f9fafb;
      }
      
      .pestana-btn.active {
        background: #3b82f6;
        color: white;
      }
      
      .seccion-contenido {
        background: #374151;
        border-radius: 8px;
        padding: 24px;
        min-height: 500px;
      }
      
      .seccion-header {
        margin-bottom: 24px;
        padding-bottom: 16px;
        border-bottom: 1px solid #4b5563;
      }
      
      .form-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 16px;
        margin-bottom: 20px;
      }
      
      .form-group {
        display: flex;
        flex-direction: column;
      }
      
      .form-group-full {
        grid-column: 1 / -1;
      }
      
      .form-group label {
        color: #f9fafb;
        font-weight: 500;
        margin-bottom: 4px;
        font-size: 14px;
      }
      
      .form-group input,
      .form-group select,
      .form-group textarea {
        padding: 10px 12px;
        border: 1px solid #6b7280;
        border-radius: 6px;
        background: #1f2937;
        color: #f9fafb;
        font-size: 14px;
        transition: border-color 0.2s;
      }
      
      .form-group input:focus,
      .form-group select:focus,
      .form-group textarea:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
      }
      
      .form-actions {
        grid-column: 1 / -1;
        display: flex;
        gap: 12px;
        justify-content: flex-end;
        margin-top: 20px;
      }
      
      .btn-primary {
        padding: 12px 24px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: background 0.2s;
      }
      
      .btn-primary:hover {
        background: #2563eb;
      }
      
      .btn-secondary {
        padding: 12px 24px;
        background: #6b7280;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: 500;
        transition: background 0.2s;
      }
      
      .btn-secondary:hover {
        background: #4b5563;
      }
      
      .mensaje {
        padding: 12px;
        border-radius: 6px;
        margin-top: 16px;
        font-weight: 500;
      }
      
      .mensaje.exito {
        background: #065f46;
        color: #d1fae5;
        border: 1px solid #047857;
      }
      
      .mensaje.error {
        background: #7f1d1d;
        color: #fecaca;
        border: 1px solid #dc2626;
      }
      
      .resultados-tabla {
        margin-top: 24px;
        background: #1f2937;
        border-radius: 8px;
        padding: 16px;
      }
      
      .tabla-header {
        margin-bottom: 16px;
        padding-bottom: 8px;
        border-bottom: 1px solid #4b5563;
      }
      
      .tabla-resultados {
        width: 100%;
        border-collapse: collapse;
      }
      
      .tabla-resultados th,
      .tabla-resultados td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #4b5563;
        color: #f9fafb;
      }
      
      .tabla-resultados th {
        background: #374151;
        font-weight: 600;
      }
      
      .estado.activo {
        color: #10b981;
        font-weight: 500;
      }
      
      .btn-accion {
        padding: 6px 12px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
      }
      
      .loading {
        text-align: center;
        padding: 40px;
      }
      
      .activacion-proceso {
        text-align: center;
        padding: 40px;
      }
    </style>
  `;

  // Función global para cambiar pestañas
  window.cambiarPestanaUnificada = function(nuevaPestana) {
    cambiarPestana(nuevaPestana);
  };

  // Configurar eventos iniciales
  setTimeout(() => configurarEventos(), 100);

  return container;
}