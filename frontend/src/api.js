// The address of our Django backend.
const API_URL = "http://127.0.0.1:8000/api/tasks/";

// Get all the tasks.
export async function getTasks() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Could not load tasks");
  }

  return response.json();
}

// Create a new task.
export async function addTask(task) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error("Could not add task");
  }

  return response.json();
}

// Change part of an existing task.
export async function editTask(id, changes) {
  const response = await fetch(API_URL + id + "/", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  });

  if (!response.ok) {
    throw new Error("Could not update task");
  }

  return response.json();
}

// Delete a task.
export async function removeTask(id) {
  const response = await fetch(API_URL + id + "/", {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Could not delete task");
  }
}
