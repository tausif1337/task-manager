export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="rounded bg-white p-6 text-center text-slate-500">
        No tasks yet.
      </p>
    );
  }

  return (
    <ul className="grid gap-3">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-start justify-between gap-3 rounded bg-white p-4 shadow"
        >
          <div>
            <h2 className={task.is_completed ? "font-semibold line-through" : "font-semibold"}>
              {task.title}
            </h2>
            <p className="text-sm text-slate-600">{task.description}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onToggle(task)}
              className="rounded border px-3 py-1"
            >
              {task.is_completed ? "Undo" : "Done"}
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="rounded border px-3 py-1 text-rose-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
