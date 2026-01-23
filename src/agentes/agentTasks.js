import { AGENTES_CONFIG, AGENT_TASK_STORAGE_KEY } from "./agentsConfig.js";

const createId = () => `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;

const normalizeTask = (task) => {
  if (!task) return null;
  if (typeof task === "string") {
    return { id: createId(), text: task, done: false };
  }
  const text = String(task.text || "").trim();
  if (!text) return null;
  return {
    id: task.id || createId(),
    text,
    done: Boolean(task.done),
  };
};

export const ensureTaskList = (tasks = []) => tasks.map(normalizeTask).filter(Boolean);

export const buildDefaultTaskMap = () =>
  AGENTES_CONFIG.reduce((acc, agente) => {
    acc[agente.id] = ensureTaskList(agente.tareas || []);
    return acc;
  }, {});

export const loadTaskMap = () => {
  let stored = {};
  try {
    stored = JSON.parse(localStorage.getItem(AGENT_TASK_STORAGE_KEY) || "{}");
  } catch {
    stored = {};
  }
  const defaults = buildDefaultTaskMap();
  const merged = { ...defaults };
  Object.keys(stored || {}).forEach((agentId) => {
    merged[agentId] = ensureTaskList(stored[agentId]);
  });
  return merged;
};

export const saveTaskMap = (taskMap) => {
  localStorage.setItem(AGENT_TASK_STORAGE_KEY, JSON.stringify(taskMap));
};

export const createTask = (text) => normalizeTask(text);
