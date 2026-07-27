import { Check, Trash2, Undo2 } from "lucide-react";

export default function TaskItem({ task, onToggleTask, onDeleteTask }) {
  return (
    <li className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <h2
            className={`text-base font-semibold ${
              task.is_completed
                ? "text-slate-500 line-through"
                : "text-slate-900"
            }`}
          >
            {task.title}
          </h2>

          {task.description ? (
            <p className="mt-1 break-words text-sm leading-6 text-slate-600">
              {task.description}
            </p>
          ) : null}

          <p className="mt-3 text-xs text-slate-400">
            Created {new Date(task.created_at).toLocaleString()}
          </p>
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() =>
              onToggleTask(task.id, { is_completed: !task.is_completed })
            }
            title={task.is_completed ? "Mark incomplete" : "Mark complete"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition hover:border-teal-700 hover:text-teal-700"
          >
            {task.is_completed ? <Undo2 size={18} /> : <Check size={18} />}
          </button>

          <button
            type="button"
            onClick={() => onDeleteTask(task.id)}
            title="Delete task"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition hover:border-rose-600 hover:text-rose-600"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </li>
  );
}
