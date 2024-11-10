
import { useState } from 'react';
import { PlusCircle, Trash2, Check, X } from 'lucide-react';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      setTodos([...todos, { text: input.trim(), completed: false, id: Date.now() }]);
      setInput('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Todo List</h1>
          
          <form onSubmit={addTodo} className="flex gap-2 mb-6">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200 flex items-center gap-2"
            >
              <PlusCircle size={20} />
              Add
            </button>
          </form>

          <div className="space-y-3">
            {todos.map(todo => (
              <div
                key={todo.id}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  todo.completed ? 'bg-gray-50' : 'bg-white'
                } border border-gray-200 shadow-sm`}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`rounded-full p-1 ${
                      todo.completed ? 'bg-green-500 text-white' : 'border-2 border-gray-300'
                    }`}
                  >
                    {todo.completed ? <Check size={16} /> : <X size={16} className="text-transparent" />}
                  </button>
                  <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                    {todo.text}
                  </span>
                </div>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-600 transition-colors duration-200"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {todos.length === 0 && (
            <div className="text-center text-gray-500 mt-6">
              No todos yet. Add some tasks to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;