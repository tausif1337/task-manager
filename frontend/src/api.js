const API_URL = "http://127.0.0.1:8000/api/tasks/";

async function request(url, errorMessage, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(errorMessage);
  }
  return response;
}

async function sendJson(url, method, data, errorMessage) {
  const response = await request(url, errorMessage, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getTasks() {
  const response = await request(API_URL, "Could not load tasks");
  return response.json();
}

export function addTask(task) {
  return sendJson(API_URL, "POST", task, "Could not add task");
}

export function editTask(id, changes) {
  return sendJson(API_URL + id + "/", "PATCH", changes, "Could not update task");
}

export async function removeTask(id) {
  await request(API_URL + id + "/", "Could not delete task", { method: "DELETE" });
}
