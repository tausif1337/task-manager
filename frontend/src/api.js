const API_URL = "http://127.0.0.1:8000/api/tasks/";

export async function getTasks() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Could not load tasks");
  }
  return response.json();
}

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

export async function removeTask(id) {
  const response = await fetch(API_URL + id + "/", {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Could not delete task");
  }
}
