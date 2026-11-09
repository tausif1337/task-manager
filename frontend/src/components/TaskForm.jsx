import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event) {
    // Stop the browser from reloading the page.
    event.preventDefault();

    // Don't add a task with an empty title.
    if (title.trim() === "") {
      return;
    }

    // Send the new task to App, then empty the form.
    onAdd({ title, description, is_completed: false });

    setTitle("");
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 rounded bg-white p-4 shadow">
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
  );
}
