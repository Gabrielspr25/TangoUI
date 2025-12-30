export function getModuloUnificadoVentasContent() {
  const container = document.createElement("div");
  container.className = "modulo-unificado-container";
  container.innerHTML = `
    <div class="modulo-header">
      <h2 class="modulo-titulo">📊 Centro de Ventas y Consultas</h2>
      <p class="modulo-descripcion">Módulo unificado para generación de ventas, consultas y activaciones</p>
    </div>
    
    <div class="pestanas-container">
      <button class="pestana-btn active" onclick="alert('Generar Venta')">
        🛒 Generar Venta
      </button>
      <button class="pestana-btn" onclick="alert('Base General')">
        💰 Base General
      </button>
      <button class="pestana-btn" onclick="alert('Base FIJO')">
        📞 Base FIJO
      </button>
      <button class="pestana-btn" onclick="alert('Base PYMES')">
        🏪 Base PYMES
      </button>
      <button class="pestana-btn" onclick="alert('Activaciones')">
        👥 Activaciones
      </button>
    </div>
    
    <div class="contenido-principal">
      <h3>Centro de Ventas y Consultas Funcionando</h3>
      <p>El módulo unificado está cargando correctamente.</p>
      <p>Las pestañas están disponibles arriba para navegar entre:</p>
      <ul>
        <li>🛒 Generar Venta</li>
        <li>💰 Consulta Base General</li>
        <li>📞 Consulta Base FIJO</li>
        <li>🏪 Consulta Base PYMES</li>
        <li>👥 Activaciones</li>
      </ul>
    </div>

    <style>
      .modulo-unificado-container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
        background: #1f2937;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        color: white;
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
      
      .contenido-principal {
        background: #374151;
        border-radius: 8px;
        padding: 24px;
        min-height: 400px;
      }
      
      .contenido-principal h3 {
        color: #10b981;
        margin-bottom: 16px;
      }
      
      .contenido-principal p {
        color: #d1d5db;
        margin-bottom: 12px;
      }
      
      .contenido-principal ul {
        color: #9ca3af;
      }
      
      .contenido-principal li {
        margin-bottom: 8px;
        padding: 4px 0;
      }
    </style>
  `;

  return container;
}