import { useEffect, useState } from "react";

import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { addTask, editTask, getTasks, removeTask } from "./api.js";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  async function reportErrors(action) {
    try {
      await action();
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    reportErrors(async () => setTasks(await getTasks()));
  }, []);

  function handleAdd(newTask) {
    return reportErrors(async () => {
      const savedTask = await addTask(newTask);
      setTasks([savedTask, ...tasks]);
    });
  }

  function handleToggle(task) {
    return reportErrors(async () => {
      const updatedTask = await editTask(task.id, {
        is_completed: !task.is_completed,
      });
      setTasks(tasks.map((oldTask) => (oldTask.id === task.id ? updatedTask : oldTask)));
    });
  }

  function handleDelete(id) {
    return reportErrors(async () => {
      await removeTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    });
  }

  const doneTasks = tasks.filter((task) => task.is_completed);

  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto grid max-w-2xl gap-5">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Task Manager</h1>
          <p className="text-sm text-slate-600">
            {doneTasks.length} of {tasks.length} complete
          </p>
        </div>

        <TaskForm onAdd={handleAdd} />

        {error ? (
          <p className="rounded bg-rose-100 p-3 text-sm text-rose-700">{error}</p>
        ) : null}

        <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
      </div>
    </main>
  );
}
