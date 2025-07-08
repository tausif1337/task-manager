import { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const addTask = () => {
    if (!newTask.trim()) return;
    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex].text = newTask;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: newTask, completed: false }]);
    }
    setNewTask('');
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const startEdit = (index) => {
    setNewTask(tasks[index].text);
    setEditIndex(index);
  };

  const handleChange = (e) => {
    setNewTask(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">📝 Task Manager</h1>
        <div className="flex mb-4">
          <input type="text" className="flex-grow p-2 border rounded-l-md" value={newTask} onChange={handleChange} placeholder="Enter a task" />
          <button className="bg-blue-500 text-white px-4 rounded-r-md hover:bg-blue-600" onClick={addTask}>{editIndex !== null ? 'Update' : 'Add'}</button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded mb-2">
              <span onClick={() => toggleComplete(index)} className={`flex-1 cursor-pointer ${task.completed ? 'line-through text-gray-400' : ''}`}>
                {task.text}
              </span>
              <div className="flex gap-2">
                <button onClick={() => startEdit(index)} className="text-blue-500 hover:underline">Edit</button>
                <button onClick={() => deleteTask(index)} className="text-red-500 hover:underline">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;