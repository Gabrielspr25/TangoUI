export const AGENTES_CONFIG = [
  {
    id: "equipos",
    nombre: "Agente Equipos",
    descripcion: "Inventario real y sincronizacion de modelos.",
    reglas: [
      "Fuente de verdad: tabla dispositivos en PostgreSQL.",
      "Validar IMEI/SIM (15/20 digitos) antes de guardar.",
      "No exponer funciones del agente a dealers.",
      "Sincronizar desde Claro PR hacia Control360, nunca al reves.",
    ],
    tareas: [
      "Sincronizar modelos desde Claro PR",
      "Validar IMEI/SIM (15/20 digitos)",
      "Importar / Exportar CSV",
      "Control de inventario y estado",
      "Mapeo de tablas legacy -> Control360",
      "Auditoria de inconsistencias",
    ],
  },
  {
    id: "analisis_bd",
    nombre: "Agente Analisis BD",
    descripcion: "Mapeo, normalizacion y control de calidad de datos.",
    reglas: [
      "Mantener paridad con Equipos.xls.",
      "Documentar cambios en la base legacy antes de replicar.",
      "Validar consistencia de codigos y costos.",
    ],
    tareas: [
      "Mapeo de base de datos real",
      "Normalizacion de modelos",
      "Comparativa de formularios CRM vs POS",
    ],
  },
];

export const AGENT_TASK_STORAGE_KEY = "control360_agent_tasks_v1";
