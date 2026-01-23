// 🔒 CENTRO DE CONTROL DE AGENTES IA - CLARO PR
// CONFIDENCIAL - SOLO CREATOR (Gabriel)
// NO VISIBLE PARA DEALERS

import { useState, useEffect } from 'react'

const CentroControlAgentes = () => {
    const [selectedAgent, setSelectedAgent] = useState(null)
    const [agentStats, setAgentStats] = useState({})
    const [systemMode, setSystemMode] = useState('production') // 'production' | 'development' | 'testing'

    // 🤖 Definición de todos los agentes del sistema
    const agentes = {
        criticos: [
            {
                id: 'equipos',
                nombre: 'Agente de Equipos',
                icon: '📱',
                color: 'emerald',
                estado: 'activo',
                progreso: 75,
                tablas: ['dispositivos', 'equipos'],
                funciones: ['CRUD equipos', 'Validación IMEI', 'Asignación vendedores', 'Sync Excel'],
                reglas: [
                    'IMEI único obligatorio (15-20 dígitos)',
                    'Validar equipo no asignado previamente',
                    'Registrar fechas de adquisición y asignación',
                    'Diferenciar equipos externos vs empresa',
                    'Calcular costos automáticamente'
                ],
                archivo: 'AgenteEquipos.jsx',
                ultimaActualizacion: '2026-01-23'
            },
            {
                id: 'ventas',
                nombre: 'Agente de Ventas',
                icon: '🛒',
                color: 'blue',
                estado: 'desarrollo',
                progreso: 45,
                tablas: ['ventas', 'productos', 'clientes', 'comisiones'],
                funciones: ['Crear ventas', 'Validar stock', 'Calcular precios', 'Generar comisiones'],
                reglas: [
                    'Validar stock disponible antes de vender',
                    'Cálculo automático de comisiones por tipo',
                    'Número de venta único generado',
                    'Estados: pendiente, completada, cancelada',
                    'Registrar vendedor y tienda obligatorio'
                ],
                archivo: 'AgenteVentas.jsx',
                ultimaActualizacion: '2026-01-20'
            },
            {
                id: 'comisiones',
                nombre: 'Agente de Comisiones',
                icon: '💰',
                color: 'yellow',
                estado: 'planificado',
                progreso: 20,
                tablas: ['comisiones', 'ventas', 'vendedores', 'metas'],
                funciones: ['Calcular comisiones', 'Validar metas', 'Generar reportes', 'Conciliar pagos'],
                reglas: [
                    'Comisión varía según producto (fijo/móvil/accesorios)',
                    'Bonos por cumplimiento de metas',
                    'Penalizaciones por cancelaciones',
                    'Diferenciar comisión empresa vs vendedor',
                    'Corte mensual automatizado'
                ],
                archivo: 'AgenteComisiones.jsx',
                ultimaActualizacion: null
            },
            {
                id: 'inventario',
                nombre: 'Agente de Inventario',
                icon: '📦',
                color: 'purple',
                estado: 'activo',
                progreso: 60,
                tablas: ['inventario', 'productos', 'dispositivos', 'tiendas'],
                funciones: ['Control stock', 'Alertas bajo stock', 'Transferencias', 'Valorización'],
                reglas: [
                    'Stock mínimo configurable por producto',
                    'Restricción de venta sin stock',
                    'Trazabilidad completa de movimientos',
                    'Inventario separado por tienda',
                    'Auditoría automática de diferencias'
                ],
                archivo: 'AgenteInventario.jsx',
                ultimaActualizacion: '2026-01-22'
            }
        ],
        importantes: [
            {
                id: 'activaciones',
                nombre: 'Agente de Activaciones',
                icon: '📱',
                color: 'cyan',
                estado: 'activo',
                progreso: 55,
                tablas: ['activaciones', 'ventas', 'clientes'],
                funciones: ['Registrar activaciones', 'Validar docs', 'Seguimiento', 'Integración Claro'],
                reglas: [
                    'Requiere venta aprobada',
                    'Validación de identidad obligatoria',
                    'Estados: pendiente, proceso, activado, rechazado',
                    'Tiempo límite: 48-72 horas',
                    'Notificación automática de cambios'
                ],
                archivo: 'AgenteActivaciones.jsx',
                ultimaActualizacion: '2026-01-18'
            },
            {
                id: 'vendedores',
                nombre: 'Agente de Vendedores',
                icon: '👥',
                color: 'indigo',
                estado: 'desarrollo',
                progreso: 40,
                tablas: ['vendedores', 'usuarios', 'tiendas', 'metas'],
                funciones: ['CRUD vendedores', 'Asignar tiendas', 'Configurar metas', 'Historial'],
                reglas: [
                    'Un vendedor por usuario único',
                    'Asignación a tienda principal',
                    'Metas mensuales configurables',
                    'Control de activos/inactivos',
                    'Foto de perfil obligatoria'
                ],
                archivo: 'AgenteVendedores.jsx',
                ultimaActualizacion: '2026-01-15'
            },
            {
                id: 'subsidios',
                nombre: 'Agente de Subsidios',
                icon: '💵',
                color: 'green',
                estado: 'activo',
                progreso: 50,
                tablas: ['subsidios', 'ventas', 'productos'],
                funciones: ['Aplicar subsidios', 'Validar elegibilidad', 'Calcular descuentos', 'Reportes'],
                reglas: [
                    'Subsidio según tipo de plan',
                    'Limitaciones por cliente',
                    'Vigencia del subsidio validada',
                    'Aprobación para montos altos',
                    'Registro de subsidios aplicados'
                ],
                archivo: 'AgenteSubsidios.jsx',
                ultimaActualizacion: '2026-01-20'
            },
            {
                id: 'metas',
                nombre: 'Agente de Metas',
                icon: '🎯',
                color: 'rose',
                estado: 'desarrollo',
                progreso: 35,
                tablas: ['metas', 'vendedores', 'ventas'],
                funciones: ['Crear metas', 'Seguimiento', 'Alertas', 'Dashboard'],
                reglas: [
                    'Metas por vendedor y/o tienda',
                    'Métricas: cantidad, valor, activaciones',
                    'Revisión mensual automática',
                    'Bonos por sobre-cumplimiento',
                    'Alertas de progreso (50%, 75%, 100%)'
                ],
                archivo: 'AgenteMetas.jsx',
                ultimaActualizacion: '2026-01-12'
            }
        ],
        complementarios: [
            {
                id: 'reportes',
                nombre: 'Agente de Reportes',
                icon: '📊',
                color: 'orange',
                estado: 'planificado',
                progreso: 10,
                tablas: ['TODAS (lectura)'],
                funciones: ['Generar reportes', 'Análisis datos', 'Dashboard', 'Exportar'],
                reglas: [
                    'Permisos por nivel de usuario',
                    'Datos en tiempo real',
                    'Filtros personalizables',
                    'Formatos: PDF, Excel, CSV',
                    'Programación de reportes automáticos'
                ],
                archivo: 'AgenteReportes.jsx',
                ultimaActualizacion: null
            },
            {
                id: 'cambios',
                nombre: 'Agente de Cambios',
                icon: '🔄',
                color: 'amber',
                estado: 'activo',
                progreso: 65,
                tablas: ['cambios', 'ventas', 'inventario'],
                funciones: ['Registrar cambios', 'Devoluciones', 'Ajustar inventario', 'Ajustar comisiones'],
                reglas: [
                    'Plazo de cambio: 7-14 días',
                    'Motivo obligatorio',
                    'Afecta comisión del vendedor',
                    'Reingreso automático a inventario',
                    'Aprobación de supervisor requerida'
                ],
                archivo: 'AgenteCambios.jsx',
                ultimaActualizacion: '2026-01-19'
            },
            {
                id: 'clientes',
                nombre: 'Agente de Clientes',
                icon: '👤',
                color: 'teal',
                estado: 'planificado',
                progreso: 15,
                tablas: ['clientes', 'ventas', 'activaciones'],
                funciones: ['CRUD clientes', 'Historial', 'Validar docs', 'Segmentación'],
                reglas: [
                    'Documento único (SSN/TaxID)',
                    'Datos obligatorios por ley PR',
                    'Privacidad según GDPR/CCPA',
                    'Consentimiento de datos',
                    'Historial de interacciones completo'
                ],
                archivo: 'AgenteClientes.jsx',
                ultimaActualizacion: null
            },
            {
                id: 'validacion',
                nombre: 'Agente de Validación',
                icon: '✅',
                color: 'lime',
                estado: 'desarrollo',
                progreso: 30,
                tablas: ['TODAS'],
                funciones: ['Validar forms', 'Check reglas', 'Prevenir duplicados', 'Integridad'],
                reglas: [
                    'Validar antes de guardar siempre',
                    'Mensajes de error claros y específicos',
                    'Sugerencias de corrección',
                    'Log de validaciones fallidas',
                    'Validación en tiempo real'
                ],
                archivo: 'AgenteValidacion.jsx',
                ultimaActualizacion: '2026-01-16'
            },
            {
                id: 'productos',
                nombre: 'Agente de Productos',
                icon: '📦',
                color: 'violet',
                estado: 'desarrollo',
                progreso: 25,
                tablas: ['productos', 'planes', 'precios'],
                funciones: ['CRUD productos', 'Gestión precios', 'Categorización', 'Disponibilidad'],
                reglas: [
                    'Productos activos/inactivos',
                    'Precio incluye IVU (11.5% PR)',
                    'Vigencia de precios',
                    'Disponibilidad por región',
                    'Categorías jerárquicas'
                ],
                archivo: 'AgenteProductos.jsx',
                ultimaActualizacion: '2026-01-14'
            }
        ],
        avanzados: [
            {
                id: 'personal',
                nombre: 'Agente Personal IA',
                icon: '🤖',
                color: 'fuchsia',
                estado: 'experimental',
                progreso: 5,
                tablas: ['TODAS (IA-powered)'],
                funciones: ['Consultas IA', 'Sugerencias', 'Automatización', 'Predicciones'],
                reglas: [
                    'Acceso a todos los datos del sistema',
                    'Respuestas contextuales inteligentes',
                    'Aprendizaje de patrones',
                    'Sugerencias proactivas',
                    'Solo disponible para CREATOR'
                ],
                archivo: 'AgentePersonal.jsx',
                ultimaActualizacion: null
            }
        ]
    }

    // Calcular estadísticas del sistema
    useEffect(() => {
        const allAgents = [
            ...agentes.criticos,
            ...agentes.importantes,
            ...agentes.complementarios,
            ...agentes.avanzados
        ]

        const stats = {
            total: allAgents.length,
            activos: allAgents.filter(a => a.estado === 'activo').length,
            desarrollo: allAgents.filter(a => a.estado === 'desarrollo').length,
            planificados: allAgents.filter(a => a.estado === 'planificado').length,
            progresoPromedio: Math.round(
                allAgents.reduce((sum, a) => sum + a.progreso, 0) / allAgents.length
            )
        }

        setAgentStats(stats)
    }, [])

    // Colores por estado
    const estadoColors = {
        activo: 'bg-green-500',
        desarrollo: 'bg-yellow-500',
        planificado: 'bg-gray-500',
        experimental: 'bg-purple-500'
    }

    const AgentCard = ({ agent, categoria }) => {
        const colorClasses = {
            emerald: 'from-emerald-500 to-emerald-700',
            blue: 'from-blue-500 to-blue-700',
            yellow: 'from-yellow-500 to-yellow-700',
            purple: 'from-purple-500 to-purple-700',
            cyan: 'from-cyan-500 to-cyan-700',
            indigo: 'from-indigo-500 to-indigo-700',
            green: 'from-green-500 to-green-700',
            rose: 'from-rose-500 to-rose-700',
            orange: 'from-orange-500 to-orange-700',
            amber: 'from-amber-500 to-amber-700',
            teal: 'from-teal-500 to-teal-700',
            lime: 'from-lime-500 to-lime-700',
            violet: 'from-violet-500 to-violet-700',
            fuchsia: 'from-fuchsia-500 to-fuchsia-700'
        }

        return (
            <div
                onClick={() => setSelectedAgent({ ...agent, categoria })}
                className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 cursor-pointer hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-gray-500 group"
            >
                {/* Badge de estado */}
                <div className="absolute top-3 right-3">
                    <div className={`w-3 h-3 rounded-full ${estadoColors[agent.estado]} animate-pulse`}></div>
                </div>

                {/* Icono y nombre */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colorClasses[agent.color]} flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                    {agent.icon}
                </div>

                <h3 className="text-white font-bold text-lg mb-2">{agent.nombre}</h3>
                <p className="text-gray-400 text-sm mb-4">{agent.archivo}</p>

                {/* Barra de progreso */}
                <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Progreso</span>
                        <span>{agent.progreso}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full bg-gradient-to-r ${colorClasses[agent.color]} transition-all duration-500`}
                            style={{ width: `${agent.progreso}%` }}
                        ></div>
                    </div>
                </div>

                {/* Tablas */}
                <div className="flex flex-wrap gap-1">
                    {agent.tablas.slice(0, 3).map((tabla, idx) => (
                        <span key={idx} className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                            {tabla}
                        </span>
                    ))}
                    {agent.tablas.length > 3 && (
                        <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-400">
                            +{agent.tablas.length - 3}
                        </span>
                    )}
                </div>
            </div>
        )
    }

    const AgentDetailModal = ({ agent, onClose }) => {
        if (!agent) return null

        const colorClasses = {
            emerald: 'from-emerald-500 to-emerald-700',
            blue: 'from-blue-500 to-blue-700',
            yellow: 'from-yellow-500 to-yellow-700',
            purple: 'from-purple-500 to-purple-700',
            cyan: 'from-cyan-500 to-cyan-700',
            indigo: 'from-indigo-500 to-indigo-700',
            green: 'from-green-500 to-green-700',
            rose: 'from-rose-500 to-rose-700',
            orange: 'from-orange-500 to-orange-700',
            amber: 'from-amber-500 to-amber-700',
            teal: 'from-teal-500 to-teal-700',
            lime: 'from-lime-500 to-lime-700',
            violet: 'from-violet-500 to-violet-700',
            fuchsia: 'from-fuchsia-500 to-fuchsia-700'
        }

        return (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700" onClick={e => e.stopPropagation()}>
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${colorClasses[agent.color]} p-6 rounded-t-2xl`}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <div className="text-5xl">{agent.icon}</div>
                                <div>
                                    <h2 className="text-white text-2xl font-bold">{agent.nombre}</h2>
                                    <p className="text-white/80">{agent.archivo}</p>
                                </div>
                            </div>
                            <button onClick={onClose} className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Estado y stats */}
                        <div className="grid grid-cols-3 gap-4">
                            <div className="bg-gray-800 rounded-lg p-4">
                                <div className="text-gray-400 text-sm mb-1">Estado</div>
                                <div className="text-white font-bold capitalize">{agent.estado}</div>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-4">
                                <div className="text-gray-400 text-sm mb-1">Progreso</div>
                                <div className="text-white font-bold">{agent.progreso}%</div>
                            </div>
                            <div className="bg-gray-800 rounded-lg p-4">
                                <div className="text-gray-400 text-sm mb-1">Categoría</div>
                                <div className="text-white font-bold capitalize">{agent.categoria}</div>
                            </div>
                        </div>

                        {/* Tablas */}
                        <div>
                            <h3 className="text-white font-bold mb-3">📊 Tablas de Base de Datos</h3>
                            <div className="flex flex-wrap gap-2">
                                {agent.tablas.map((tabla, idx) => (
                                    <span key={idx} className="bg-gray-800 px-3 py-2 rounded-lg text-white border border-gray-700">
                                        {tabla}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Funciones */}
                        <div>
                            <h3 className="text-white font-bold mb-3">⚡ Funciones Principales</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {agent.funciones.map((func, idx) => (
                                    <div key={idx} className="bg-gray-800 px-4 py-3 rounded-lg text-gray-300 flex items-center space-x-2 border border-gray-700">
                                        <span className="text-green-400">✓</span>
                                        <span>{func}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Reglas de Negocio */}
                        <div>
                            <h3 className="text-white font-bold mb-3">📋 Reglas de Negocio</h3>
                            <div className="space-y-2">
                                {agent.reglas.map((regla, idx) => (
                                    <div key={idx} className="bg-gray-800 px-4 py-3 rounded-lg text-gray-300 flex items-start space-x-3 border border-gray-700">
                                        <span className={`text-${agent.color}-400 font-bold`}>{idx + 1}.</span>
                                        <span>{regla}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Última actualización */}
                        {agent.ultimaActualizacion && (
                            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                                <div className="text-gray-400 text-sm">Última actualización:</div>
                                <div className="text-white font-mono">{agent.ultimaActualizacion}</div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white p-8">
            {/* Header con advertencia de confidencialidad */}
            <div className="mb-8">
                <div className="bg-red-900/30 border-2 border-red-500 rounded-xl p-4 mb-6 flex items-center space-x-3">
                    <div className="text-3xl">🔒</div>
                    <div>
                        <div className="text-red-400 font-bold text-lg">PANEL CONFIDENCIAL - SOLO CREATOR</div>
                        <div className="text-red-300 text-sm">Este panel NO es visible para dealers, vendedores ni personal operativo</div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                            🤖 Centro de Control de Agentes IA
                        </h1>
                        <p className="text-gray-400">Sistema Claro - TangoUI | Arquitectura Modular de Agentes</p>
                    </div>

                    {/* Mode selector */}
                    <div className="flex space-x-2">
                        {['production', 'development', 'testing'].map(mode => (
                            <button
                                key={mode}
                                onClick={() => setSystemMode(mode)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${systemMode === mode
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                    }`}
                            >
                                {mode.charAt(0).toUpperCase() + mode.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Stats Dashboard */}
            <div className="grid grid-cols-5 gap-4 mb-8">
                <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl p-6">
                    <div className="text-blue-200 text-sm mb-1">Total Agentes</div>
                    <div className="text-4xl font-bold">{agentStats.total}</div>
                </div>
                <div className="bg-gradient-to-br from-green-600 to-green-800 rounded-xl p-6">
                    <div className="text-green-200 text-sm mb-1">Activos</div>
                    <div className="text-4xl font-bold">{agentStats.activos}</div>
                </div>
                <div className="bg-gradient-to-br from-yellow-600 to-yellow-800 rounded-xl p-6">
                    <div className="text-yellow-200 text-sm mb-1">En Desarrollo</div>
                    <div className="text-4xl font-bold">{agentStats.desarrollo}</div>
                </div>
                <div className="bg-gradient-to-br from-gray-600 to-gray-800 rounded-xl p-6">
                    <div className="text-gray-200 text-sm mb-1">Planificados</div>
                    <div className="text-4xl font-bold">{agentStats.planificados}</div>
                </div>
                <div className="bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl p-6">
                    <div className="text-purple-200 text-sm mb-1">Progreso Gral.</div>
                    <div className="text-4xl font-bold">{agentStats.progresoPromedio}%</div>
                </div>
            </div>

            {/* Agentes Críticos */}
            <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-1 h-8 bg-red-500 rounded"></div>
                    <h2 className="text-2xl font-bold">🔴 Agentes Críticos (Fase 1)</h2>
                    <span className="bg-red-500/20 text-red-400 px-3 py-1 rounded-full text-sm font-medium">
                        {agentes.criticos.length} agentes
                    </span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {agentes.criticos.map(agent => (
                        <AgentCard key={agent.id} agent={agent} categoria="críticos" />
                    ))}
                </div>
            </div>

            {/* Agentes Importantes */}
            <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-1 h-8 bg-yellow-500 rounded"></div>
                    <h2 className="text-2xl font-bold">🟡 Agentes Importantes (Fase 2)</h2>
                    <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-medium">
                        {agentes.importantes.length} agentes
                    </span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {agentes.importantes.map(agent => (
                        <AgentCard key={agent.id} agent={agent} categoria="importantes" />
                    ))}
                </div>
            </div>

            {/* Agentes Complementarios */}
            <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-1 h-8 bg-green-500 rounded"></div>
                    <h2 className="text-2xl font-bold">🟢 Agentes Complementarios (Fase 3)</h2>
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-medium">
                        {agentes.complementarios.length} agentes
                    </span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {agentes.complementarios.map(agent => (
                        <AgentCard key={agent.id} agent={agent} categoria="complementarios" />
                    ))}
                </div>
            </div>

            {/* Agentes Avanzados */}
            <div className="mb-8">
                <div className="flex items-center space-x-3 mb-4">
                    <div className="w-1 h-8 bg-purple-500 rounded"></div>
                    <h2 className="text-2xl font-bold">🔵 Agentes Avanzados (Fase 4)</h2>
                    <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                        {agentes.avanzados.length} agentes
                    </span>
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {agentes.avanzados.map(agent => (
                        <AgentCard key={agent.id} agent={agent} categoria="avanzados" />
                    ))}
                </div>
            </div>

            {/* Modal de detalles */}
            {selectedAgent && (
                <AgentDetailModal agent={selectedAgent} onClose={() => setSelectedAgent(null)} />
            )}
        </div>
    )
}

export default CentroControlAgentes
