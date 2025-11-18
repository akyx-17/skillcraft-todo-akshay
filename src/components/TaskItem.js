import React from "react";

export default function TaskItem({ task, onToggleComplete, onEdit, onDelete }) {
  const due = task.dueDate ? `${task.dueDate}${task.dueTime?(" "+task.dueTime):""}` : "";
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <div className="left">
        <input type="checkbox" checked={task.completed} onChange={() => onToggleComplete(task.id)} />
        <div className="meta">
          <div className="title">{task.title}</div>
          {task.description && <div className="desc">{task.description}</div>}
          <div className="small">
            {task.list && <span className="tag">{task.list}</span>}
            {due && <span className="due">Due: {due}</span>}
          </div>
        </div>
      </div>
      <div className="actions">
        <button onClick={() => onEdit(task)}>Edit</button>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}
