const KEY = "skillcraft_todo_v1";

export function loadTasks() {
  const raw = localStorage.getItem(KEY);
  try {
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveTasks(tasks) {
  localStorage.setItem(KEY, JSON.stringify(tasks));
}
