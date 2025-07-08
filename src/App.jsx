function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-center">Task Manager</h1>
      <div className="flex justify-center items-center h-full">
        <div className="bg-white p-4 rounded-lg shadow-md w-1/2 h-1/2">
          <h2 className="text-2xl font-bold mb-4">Add a New Task</h2>
          <input type="text" placeholder="Task Name" className="w-full p-2 border border-gray-300 rounded-md" />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Task</button>
        </div>
      </div>
    </div>
  )
}
export default App
