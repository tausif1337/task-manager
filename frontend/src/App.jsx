import { useEffect, useState } from "react";

import { addTask, editTask, getTasks, removeTask } from "./api.js";

export default function App() {
  // State is data React remembers. When it changes, React redraws the page.
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // Get all the tasks from the backend and show them on the page.
  async function loadTasks() {
    try {
      const loadedTasks = await getTasks();
      setTasks(loadedTasks);
      setError(""); // Everything worked, so remove any old error message.
    } catch (err) {
      setError(err.message);
    }
  }

  // Load the tasks once, when the page first opens.
  useEffect(() => {
    loadTasks();
  }, []);

  // Runs when the "Add Task" button is clicked.
  async function handleAdd(event) {
    // Stop the browser from reloading the page.
    event.preventDefault();

    // Don't add a task with an empty title.
    if (title.trim() === "") {
      return;
    }

    try {
      await addTask({ title, description });
      setTitle("");
      setDescription("");
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  // Runs when a "Done" or "Undo" button is clicked.
  async function handleToggle(task) {
    try {
      await editTask(task.id, { is_completed: !task.is_completed });
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  // Runs when a "Delete" button is clicked.
  async function handleDelete(id) {
    try {
      await removeTask(id);
      await loadTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  const doneTasks = tasks.filter((task) => task.is_completed);

  // Everything below is what you see on the page.
  return (
    <main className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto grid max-w-2xl gap-5">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Task Manager</h1>
          <p className="text-sm text-slate-600">
            {doneTasks.length} of {tasks.length} complete
          </p>
        </div>

        {/* value shows the state. onChange saves each key you type into the state. */}
        <form onSubmit={handleAdd} className="grid gap-3 rounded bg-white p-4 shadow">
          <input
            className="w-full rounded border border-slate-300 p-2"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Task title"
          />

          <textarea
            className="w-full rounded border border-slate-300 p-2"
            rows="2"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Description (optional)"
          />

          <button className="rounded bg-teal-700 p-2 font-semibold text-white">
            Add Task
          </button>
        </form>

        {/* A && B means: only show B when A is true. */}
        {error && (
          <p className="rounded bg-rose-100 p-3 text-sm text-rose-700">{error}</p>
        )}

        {tasks.length === 0 && (
          <p className="rounded bg-white p-6 text-center text-slate-500">
            No tasks yet.
          </p>
        )}

        {/* map makes one <li> for each task. */}
        <ul className="grid gap-3">
          {tasks.map((task) => {
            // A finished task gets a line through its title and an "Undo" button.
            let titleStyle = "font-semibold";
            let buttonText = "Done";

            if (task.is_completed) {
              titleStyle = "font-semibold line-through";
              buttonText = "Undo";
            }

            return (
              <li
                key={task.id}
                className="flex items-start justify-between gap-3 rounded bg-white p-4 shadow"
              >
                <div>
                  <h2 className={titleStyle}>{task.title}</h2>
                  <p className="text-sm text-slate-600">{task.description}</p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleToggle(task)}
                    className="rounded border px-3 py-1"
                  >
                    {buttonText}
                  </button>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="rounded border px-3 py-1 text-rose-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
