import React, { useState, useEffect } from "react";

export default function TaskForm({ onSave, editingTask, onCancel, lists }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [list, setList] = useState(lists?.[0] ?? "General");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || "");
      setDueDate(editingTask.dueDate || "");
      setDueTime(editingTask.dueTime || "");
      setList(editingTask.list || lists?.[0] ?? "General");
    }
  }, [editingTask, lists]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return alert("Enter a title");
    onSave({
      ...editingTask,
      title: title.trim(),
      description: description.trim(),
      dueDate,
      dueTime,
      list
    });
    if (!editingTask) {
      setTitle("");
      setDescription("");
      setDueDate("");
      setDueTime("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        placeholder="Task title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Optional description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <div className="row">
        <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} />
        <input type="time" value={dueTime} onChange={e=>setDueTime(e.target.value)} />
        <select value={list} onChange={e=>setList(e.target.value)}>
          {lists.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>
      <div className="row">
        <button type="submit">{editingTask ? "Save" : "Add Task"}</button>
        {editingTask && <button type="button" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
