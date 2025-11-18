import React from "react";
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, onToggleComplete, onEdit, onDelete, title }) {
  if (!tasks.length) return <div className="empty">No tasks in {title}</div>;
  return (
    <div className="task-list">
      {tasks.map(t => <TaskItem key={t.id} task={t} onToggleComplete={onToggleComplete} onEdit={onEdit} onDelete={onDelete} />)}
    </div>
  );
}
