// Datos de los 17 agentes IA con reglas y tareas completas
export const agentesData = [
    {
        nombre: 'Equipos', icon: '📱', progreso: 75, estado: 'activo', fase: 'Crítico',
        reglas: [
            'IMEI único obligatorio',
            'Validar equipo no asignado',
            'Registrar fecha de adquisición',
            'Control externo vs empresa',
            'Cálculo automático de costos'
        ],
        tareas: [
            'CRUD equipos', 'Validación IMEI', 'Asignación vendedores', 'Control estados',
            'Sync Excel', 'Tracking historial', 'Validar duplicados', 'Generar reportes',
            'Control costos', 'Alertas vencimiento', 'Auditoría cambios', 'Dashboard equipos'
        ]
    },
    {
        nombre: 'Ventas', icon: '🛒', progreso: 45, estado: 'desarrollo', fase: 'Crítico',
        reglas: [
            'Validar stock antes venta', 'Cálculo comisiones', 'Registro vendedor y tienda',
            'Generación número único', 'Estados (pendiente/completada/cancelada)',
            'Aplicar subsidios', 'Validar cliente', 'IVU incluido'
        ],
        tareas: [
            'Crear venta', 'Selección productos', 'Validar disponibilidad', 'Calcular precios',
            'Generar comisiones', 'Enviar activación', 'Registro cliente', 'Documentación',
            'Seguimiento estado', 'Cancelar venta', 'Reportes ventas', 'Dashboard ventas',
            'Integración pagos', 'Validación crédito', 'Alertas pendientes'
        ]
    },
    {
        nombre: 'Comisiones', icon: '💰', progreso: 20, estado: 'planificado', fase: 'Crítico',
        reglas: [
            'Comisión según tipo producto', 'Bonos por metas', 'Penalizaciones cancelaciones',
            'Comisión empresa vs vendedor', 'Corte mensual', 'Validar cumplimiento metas'
        ],
        tareas: [
            'Cálculo automático', 'Tipos comisión', 'Validación metas', 'Reportes comisiones',
            'Conciliación', 'Dashboard vendedor', 'Alertas corte', 'Exportar a nómina',
            'Historial', 'Ajustes manuales'
        ]
    },
    {
        nombre: 'Inventario', icon: '📦', progreso: 60, estado: 'activo', fase: 'Crítico',
        reglas: [
            'Stock mínimo por producto', 'Restricción venta sin stock',
            'Trazabilidad movimientos', 'Inventario por tienda'
        ],
        tareas: [
            'Control entradas/salidas', 'Alertas stock bajo', 'Transferencias tiendas',
            'Reportes inventario', 'Valorización stock', 'Auditoría diferencias',
            'Dashboard stock', 'Integración compras'
        ]
    },
    {
        nombre: 'Activaciones', icon: '📱', progreso: 55, estado: 'desarrollo', fase: 'Importante',
        reglas: [
            'Requiere venta aprobada', 'Validación identidad', 'Estados múltiples',
            'Tiempo límite 48-72h', 'Documentos obligatorios'
        ],
        tareas: [
            'Registro activaciones', 'Validar docs', 'Seguimiento estado',
            'Integración Claro', 'Alertas pendientes', 'Reportes', 'Dashboard activaciones',
            'Generación contratos', 'Validación crédito'
        ]
    },
    {
        nombre: 'Vendedores', icon: '👥', progreso: 30, estado: 'desarrollo', fase: 'Importante',
        reglas: [
            'Vendedor único por usuario', 'Asignación tienda principal',
            'Metas mensuales', 'Control activos/inactivos'
        ],
        tareas: [
            'CRUD vendedores', 'Asignación tiendas', 'Config metas', 'Perfiles permisos',
            'Historial desempeño', 'Dashboard vendedor', 'Reportes'
        ]
    },
    {
        nombre: 'Subsidios', icon: '💵', progreso: 40, estado: 'desarrollo', fase: 'Importante',
        reglas: [
            'Subsidio según plan', 'Limitaciones por cliente', 'Fecha vigencia',
            'Aprobación montos altos', 'Validar elegibilidad'
        ],
        tareas: [
            'Aplicar subsidios', 'Validación elegibilidad', 'Calcular descuentos',
            'Reportes subsidios', 'Dashboard programas', 'Auditoría'
        ]
    },
    {
        nombre: 'Metas', icon: '🎯', progreso: 25, estado: 'planificado', fase: 'Importante',
        reglas: [
            'Metas por vendedor/tienda', 'Métricas múltiples',
            'Revisión mensual', 'Bonos sobrecumplimiento'
        ],
        tareas: [
            'Crear metas', 'Seguimiento progreso', 'Alertas cumplimiento', 'Dashboard metas',
            'Reportes', 'Bonificaciones', 'Historiales', 'Proyecciones'
        ]
    },
    {
        nombre: 'Reportes', icon: '📊', progreso: 15, estado: 'planificado', fase: 'Complementario',
        reglas: [
            'Permisos por nivel', 'Datos tiempo real', 'Filtros personalizables'
        ],
        tareas: [
            'Reportes ventas', 'Análisis comisiones', 'Dashboard ejecutivo', 'Export PDF/Excel',
            'Reportes custom', 'Gráficos', 'Indicadores KPI', 'Comparativas', 'Tendencias', 'Alertas'
        ]
    },
    {
        nombre: 'Cambios', icon: '🔄', progreso: 35, estado: 'desarrollo', fase: 'Complementario',
        reglas: [
            'Plazo 7-14 días', 'Motivo obligatorio', 'Afecta comisión', 'Reingreso inventario'
        ],
        tareas: [
            'Registro cambios', 'Devoluciones', 'Ajuste inventario',
            'Ajuste comisiones', 'Validaciones', 'Reportes'
        ]
    },
    {
        nombre: 'Clientes', icon: '👤', progreso: 10, estado: 'planificado', fase: 'Complementario',
        reglas: [
            'Documento único', 'Datos obligatorios ley', 'Privacidad información',
            'Consentimiento datos', 'Validación identidad'
        ],
        tareas: [
            'CRUD clientes', 'Historial compras', 'Validar docs', 'Segmentación',
            'Dashboard clientes', 'Exportar', 'Búsqueda avanzada', 'Alertas'
        ]
    },
    {
        nombre: 'Validación', icon: '✅', progreso: 50, estado: 'desarrollo', fase: 'Complementario',
        reglas: [
            'Validar antes guardar', 'Mensajes error claros', 'Sugerencias corrección',
            'Log validaciones fallidas', 'Prevención duplicados', 'Integridad datos', 'Reglas negocio'
        ],
        tareas: [
            'Validar formularios', 'Check reglas', 'Prevenir duplicados',
            'Validar integridad', 'Logs'
        ]
    },
    {
        nombre: 'Productos', icon: '📦', progreso: 20, estado: 'planificado', fase: 'Complementario',
        reglas: [
            'Activos/inactivos', 'Precio con IVU', 'Vigencia precios', 'Productos por región'
        ],
        tareas: [
            'CRUD productos', 'Gestión precios', 'Categorización',
            'Disponibilidad regional', 'Dashboard productos', 'Sincronización'
        ]
    },
    {
        nombre: 'Documentos', icon: '📄', progreso: 5, estado: 'planificado', fase: 'Avanzado',
        reglas: [
            'Tipos doc permitidos', 'Tamaño máximo', 'Encriptación', 'Retención legal'
        ],
        tareas: [
            'Upload docs', 'Validación', 'Archivo digital', 'Búsqueda',
            'OCR', 'Versiones', 'Auditoría'
        ]
    },
    {
        nombre: 'Administración', icon: '⚙️', progreso: 10, estado: 'planificado', fase: 'Avanzado',
        reglas: [
            'Solo CREATOR', 'Backup diario', 'Logs eventos',
            'Configuraciones críticas', 'Auditoría completa'
        ],
        tareas: [
            'Parámetros sistema', 'Configs generales', 'Mantenimiento', 'Auditoría',
            'Backup', 'Restore', 'Logs', 'Monitoreo', 'Alertas'
        ]
    },
    {
        nombre: 'Permisos', icon: '🔐', progreso: 15, estado: 'planificado', fase: 'Avanzado',
        reglas: [
            'Roles predefinidos', 'Permisos granulares', 'Auditoría accesos',
            'Cambios requieren aprobación', 'Sesiones limitadas', '2FA obligatorio'
        ],
        tareas: [
            'Gestión roles', 'Asignar permisos', 'Control acceso', 'Auditoría accesos',
            'Dashboard permisos', 'Logs', 'Alertas acceso', 'Sesiones'
        ]
    },
    {
        nombre: 'Personal', icon: '🤖', progreso: 30, estado: 'desarrollo', fase: 'Avanzado',
        reglas: [
            'IA conversacional', 'Acceso según permisos', 'Aprendizaje continuo',
            'Respuestas basadas en datos', 'Sugerencias inteligentes', 'Privacidad datos',
            'Auditoría consultas', 'Mejora continua', 'Integración módulos', 'Alertas proactivas'
        ],
        tareas: [
            'Responder consultas', 'Sugerencias IA', 'Automatización tareas', 'Predicciones',
            'Alertas inteligentes', 'Chat interface', 'Integración BD', 'NLP procesamiento',
            'Análisis sentimiento', 'Reportes IA', 'Dashboard insights', 'Optimizaciones',
            'Recomendaciones', 'Detección anomalías', 'Forecasting', 'Entrenamiento modelo',
            'Feedback loop', 'API integration', 'Voice commands', 'Multilingual'
        ]
    }
];
