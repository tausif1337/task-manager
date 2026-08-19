import { useEffect, useState } from "react";

import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import { addTask, editTask, getTasks, removeTask } from "./api.js";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  async function loadTasks() {
    try {
      const tasksFromServer = await getTasks();
      setTasks(tasksFromServer);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleAdd(newTask) {
    try {
      const savedTask = await addTask(newTask);
      setTasks([savedTask, ...tasks]);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleToggle(task) {
    try {
      const updatedTask = await editTask(task.id, {
        is_completed: !task.is_completed,
      });
      const newTasks = tasks.map((oldTask) => {
        if (oldTask.id === task.id) {
          return updatedTask;
        }
        return oldTask;
      });
      setTasks(newTasks);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await removeTask(id);
      const newTasks = tasks.filter((task) => task.id !== id);
      setTasks(newTasks);
    } catch (err) {
      setError(err.message);
    }
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
