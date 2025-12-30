export function getAgenteEquiposContent() {
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

  // Función para validar SIM
  function validarSIM(sim) {
    if (!sim || sim.length !== 20) {
      return "La SIM debe tener exactamente 20 dígitos.";
    }
    if (!/^\d{20}$/.test(sim)) {
      return "La SIM solo debe contener números.";
    }
    return null;
  }

  // Función para manejar el envío del formulario
  async function manejarSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    // Validaciones
    const imei = formData.get('imei');
    const sim = formData.get('sim');
    
    const errorIMEI = validarIMEI(imei);
    const errorSIM = validarSIM(sim);
    
    const mensaje = document.getElementById('mensajeEquipo');
    
    if (errorIMEI || errorSIM) {
      mensaje.className = 'mensaje error';
      mensaje.textContent = errorIMEI || errorSIM;
      return;
    }

    // Preparar datos para envío
    const equipoData = {
      codigo: formData.get('codigo'),
      modelo: formData.get('modelo'),
      marca: formData.get('marca'),
      costo: parseFloat(formData.get('costo')),
      origen: formData.get('origen'),
      imei: formData.get('imei'),
      sim: formData.get('sim'),
      fechaCompra: formData.get('fechaCompra') || null,
      factura: formData.get('factura') || null,
      tienda: formData.get('tienda') || null,
      historial: formData.get('historial') || null
    };

    try {
      const response = await fetch('http://localhost:9999/api/equipos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(equipoData)
      });

      if (response.ok) {
        mensaje.className = 'mensaje exito';
        mensaje.textContent = 'Equipo registrado exitosamente';
        form.reset();
      } else {
        const error = await response.text();
        mensaje.className = 'mensaje error';
        mensaje.textContent = `Error al registrar equipo: ${error}`;
      }
    } catch (error) {
      mensaje.className = 'mensaje error';
      mensaje.textContent = `Error de conexión: ${error.message}`;
    }
  }

  // Función para validación en tiempo real
  function configurarValidacionTiempoReal(container) {
    const imeiInput = container.querySelector('input[name="imei"]');
    const simInput = container.querySelector('input[name="sim"]');

    imeiInput?.addEventListener('input', function() {
      const error = validarIMEI(this.value);
      const errorDiv = container.querySelector('#errorIMEI');
      
      if (error && this.value.length > 0) {
        if (!errorDiv) {
          const newError = document.createElement('div');
          newError.id = 'errorIMEI';
          newError.className = 'error-validacion';
          newError.textContent = error;
          this.parentNode.appendChild(newError);
        } else {
          errorDiv.textContent = error;
        }
        this.style.borderColor = '#ef4444';
      } else {
        errorDiv?.remove();
        this.style.borderColor = '#6b7280';
      }
    });

    simInput?.addEventListener('input', function() {
      const error = validarSIM(this.value);
      const errorDiv = container.querySelector('#errorSIM');
      
      if (error && this.value.length > 0) {
        if (!errorDiv) {
          const newError = document.createElement('div');
          newError.id = 'errorSIM';
          newError.className = 'error-validacion';
          newError.textContent = error;
          this.parentNode.appendChild(newError);
        } else {
          errorDiv.textContent = error;
        }
        this.style.borderColor = '#ef4444';
      } else {
        errorDiv?.remove();
        this.style.borderColor = '#6b7280';
      }
    });
  }

  const container = document.createElement("div");
  container.className = "agente-container";
  container.innerHTML = `
    <div class="agente-header">
      <h2 class="agente-titulo">Registro de Equipos</h2>
      <p class="agente-descripcion">Gestión y registro de dispositivos móviles</p>
    </div>
    
    <form id="formEquipos" class="form-grid">
      <div class="form-group">
        <label for="codigo">Código del equipo *</label>
        <input type="text" name="codigo" id="codigo" placeholder="Código del equipo" required />
      </div>
      
      <div class="form-group">
        <label for="modelo">Modelo *</label>
        <input type="text" name="modelo" id="modelo" placeholder="Modelo" required />
      </div>
      
      <div class="form-group">
        <label for="marca">Marca *</label>
        <input type="text" name="marca" id="marca" placeholder="Marca" required />
      </div>
      
      <div class="form-group">
        <label for="costo">Costo *</label>
        <input type="number" name="costo" id="costo" placeholder="Costo" required step="0.01" />
      </div>
      
      <div class="form-group">
        <label for="origen">Origen</label>
        <select name="origen" id="origen">
          <option value="">Seleccionar origen</option>
          <option value="interno">Interno</option>
          <option value="externo">Externo</option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="imei">IMEI (15 o 20 dígitos) *</label>
        <input type="text" name="imei" id="imei" placeholder="IMEI" required />
      </div>
      
      <div class="form-group">
        <label for="sim">SIM Card (20 dígitos) *</label>
        <input type="text" name="sim" id="sim" placeholder="SIM Card" required />
      </div>
      
      <div class="form-group">
        <label for="fechaCompra">Fecha de compra</label>
        <input type="date" name="fechaCompra" id="fechaCompra" />
      </div>
      
      <div class="form-group">
        <label for="factura">N° Factura</label>
        <input type="text" name="factura" id="factura" placeholder="N° Factura" />
      </div>
      
      <div class="form-group">
        <label for="tienda">Tienda de ingreso</label>
        <input type="text" name="tienda" id="tienda" placeholder="Tienda de ingreso" />
      </div>
      
      <div class="form-group form-group-full">
        <label for="historial">Historial del equipo</label>
        <textarea name="historial" id="historial" placeholder="Historial del equipo" rows="4"></textarea>
      </div>
      
      <div class="form-actions">
        <button type="submit" class="btn-primary">Guardar Equipo</button>
        <button type="reset" class="btn-secondary">Limpiar</button>
      </div>
    </form>
    
    <div id="mensajeEquipo" class="mensaje" style="display: none;"></div>

    <style>
      .agente-container {
        max-width: 800px;
        margin: 0 auto;
        padding: 20px;
        background: #1f2937;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      
      .agente-header {
        margin-bottom: 24px;
        text-align: center;
      }
      
      .agente-titulo {
        font-size: 24px;
        font-weight: bold;
        color: #f9fafb;
        margin: 0 0 8px 0;
      }
      
      .agente-descripcion {
        color: #9ca3af;
        margin: 0;
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
        padding: 8px 12px;
        border: 1px solid #6b7280;
        border-radius: 4px;
        background: #374151;
        color: #f9fafb;
        font-size: 14px;
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
        padding: 10px 20px;
        background: #3b82f6;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background 0.2s;
      }
      
      .btn-primary:hover {
        background: #2563eb;
      }
      
      .btn-secondary {
        padding: 10px 20px;
        background: #6b7280;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background 0.2s;
      }
      
      .btn-secondary:hover {
        background: #4b5563;
      }
      
      .mensaje {
        padding: 12px;
        border-radius: 4px;
        margin-top: 16px;
        font-weight: 500;
      }
      
      .mensaje.exito {
        background: #065f46;
        color: #d1fae5;
        border: 1px solid #047857;
        display: block;
      }
      
      .mensaje.error {
        background: #7f1d1d;
        color: #fecaca;
        border: 1px solid #dc2626;
        display: block;
      }
      
      .error-validacion {
        color: #fecaca;
        font-size: 12px;
        margin-top: 4px;
      }
    </style>
  `;

  // Configurar evento del formulario
  const form = container.querySelector('#formEquipos');
  form.addEventListener('submit', manejarSubmit);

  // Configurar validación en tiempo real
  configurarValidacionTiempoReal(container);

  return container;
}