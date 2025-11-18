import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { loadTasks, saveTasks } from "./utils/storage";
import "./styles/index.css";
import { v4 as uuidv4 } from "uuid";

const DEFAULT_LISTS = ["General", "Work", "Personal"];

function filterByList(tasks, list) {
  return tasks.filter(t => (t.list || "General") === list);
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [lists, setLists] = useState(DEFAULT_LISTS);
  const [editing, setEditing] = useState(null);
  const [activeList, setActiveList] = useState(lists[0]);

  useEffect(() => {
    const loaded = loadTasks();
    setTasks(loaded);
    const extra = Array.from(new Set(loaded.map(t => t.list).filter(Boolean)));
    setLists(prev => Array.from(new Set([...prev, ...extra])));
  }, []);

  useEffect(() => saveTasks(tasks), [tasks]);

  function addOrUpdate(task) {
    if (task.id) {
      setTasks(prev => prev.map(t => t.id === task.id ? {...t, ...task} : t));
      setEditing(null);
    } else {
      const newT = {
        id: uuidv4(),
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        dueTime: task.dueTime,
        completed: false,
        list: task.list || "General",
        createdAt: new Date().toISOString()
      };
      setTasks(prev => [newT, ...prev]);
      if (!lists.includes(newT.list)) setLists(prev => [...prev, newT.list]);
      setActiveList(newT.list);
    }
  }

  function toggleComplete(id) {
    setTasks(prev => prev.map(t => t.id === id ? {...t, completed: !t.completed} : t));
  }

  function removeTask(id) {
    if (!window.confirm("Delete task?")) return;
    setTasks(prev => prev.filter(t => t.id !== id));
    if (editing && editing.id === id) setEditing(null);
  }

  function editTask(t) {
    setEditing(t);
  }

  function addList() {
    const name = prompt("New list name:");
    if (!name) return;
    if (!lists.includes(name)) setLists(prev => [...prev, name]);
    setActiveList(name);
  }

  const visible = filterByList(tasks, activeList).sort((a,b)=> new Date(b.createdAt)-new Date(a.createdAt));

  return (
    <div className="app">
      <header>
        <h1>To-Do Web App</h1>
        <p>Organize tasks into lists, set date/time, edit, and mark complete.</p>
      </header>
      <aside className="sidebar">
        <div className="lists">
          {lists.map(l => (
            <div key={l} className={`list-item ${l===activeList ? 'active':''}`} onClick={()=>setActiveList(l)}>
              {l}
            </div>
          ))}
          <button className="add-list" onClick={addList}>+ New List</button>
        </div>
      </aside>
      <main>
        <TaskForm onSave={addOrUpdate} editingTask={editing} onCancel={()=>setEditing(null)} lists={lists} />
        <h2>{activeList} ({visible.length})</h2>
        <TaskList tasks={visible} onToggleComplete={toggleComplete} onEdit={editTask} onDelete={removeTask} title={activeList} />
      </main>
    </div>
  );
}
