import { ClipboardList } from "lucide-react";
import { useEffect, useState } from "react";

import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import {
  createTask,
  deleteTask,
  getAllTasks,
  patchTask,
} from "./services/taskApi.js";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setError("");
      const data = await getAllTasks();
      setTasks(data);
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddTask(newTask) {
    try {
      setIsSaving(true);
      setError("");
      const savedTask = await createTask(newTask);
      setTasks((currentTasks) => [savedTask, ...currentTasks]);
    } catch (apiError) {
      setError(apiError.message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleToggleTask(id, changes) {
    try {
      setError("");
      const updatedTask = await patchTask(id, changes);
      setTasks((currentTasks) =>
        currentTasks.map((task) => (task.id === id ? updatedTask : task)),
      );
    } catch (apiError) {
      setError(apiError.message);
    }
  }

  async function handleDeleteTask(id) {
    try {
      setError("");
      await deleteTask(id);
      setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
    } catch (apiError) {
      setError(apiError.message);
    }
  }

  const completedCount = tasks.filter((task) => task.is_completed).length;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8">
      <section className="mx-auto grid max-w-3xl gap-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-teal-700 text-white">
              <ClipboardList size={26} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-950">
                Task Manager
              </h1>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
            <span className="font-semibold text-slate-900">
              {completedCount}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-slate-900">{tasks.length}</span>{" "}
            complete
          </div>
        </header>

        <TaskForm onAddTask={handleAddTask} isSaving={isSaving} />

        {error ? (
          <p className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
            {error}
          </p>
        ) : null}

        {isLoading ? (
          <p className="rounded-lg border border-slate-200 bg-white p-6 text-center text-slate-500">
            Loading tasks...
          </p>
        ) : (
          <TaskList
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </section>
    </main>
  );
}
