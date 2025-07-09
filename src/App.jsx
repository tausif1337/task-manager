import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Add a new task
  const addTask = () => {
    if (newTask.trim() === "") return;
    const task = {
      text: newTask,
      completed: false,
    };
    setTasks([...tasks, task]);
    setNewTask("");
  };

  // Toggle task completion
  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Delete a task
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center mb-4">📝 Task Manager</h1>

      {/* Add task section */}
      <div className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task..."
            className="flex-1 p-2 border rounded"
          />
          <button onClick={addTask} className="px-4 py-2 bg-blue-500 text-white rounded">
            Add Task
          </button>
        </div>
      </div>

      {/* Task list */}
      <div>
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks yet. Add your first task above!</p>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="flex justify-between items-center p-3 mb-2 bg-gray-100 rounded">
              <span
                onClick={() => toggleTask(index)}
                className={`flex-1 cursor-pointer ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => deleteTask(index)}
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;