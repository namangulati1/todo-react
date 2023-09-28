import React, { useState, useEffect } from 'react';
import '../App.css';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  // Load TODO items from local storage when the component mounts
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  // Save TODO items to local storage whenever the state changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo = {
        text: inputText,
        completed: false,
        id: Date.now(),
      };
      setTodos([newTodo, ...todos]);
      setInputText('');
    }
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  const resetTodos = () => {
    setTodos([]);
  };

  return (
    <div className="todo-app">
      <div className="header">
        <h1>TODO App</h1>
        <button onClick={resetTodos} className="reset-button">
          Reset
        </button>
      </div>
      <input
        type="text"
        placeholder="Add a new TODO"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') addTodo();
        }}
      />
      <div className="todo-list">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`todo-card ${todo.completed ? 'completed' : ''}`}
          >
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            <span>{todo.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoApp;
