import React, { useState } from "react";
import './TodoList.css';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      setTodos([...todos, { text: inputValue, id: Date.now() }]);
      setInputValue("");
    }
  };
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleEditButtonClick = (id) => {
    setEditingId(id);
  };

  const handleEditTodo = (id, newText) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todos, text: newText };
        }
        return todo;
      })
    );
    setEditingId(null);
  };

  return (
    <div className="todo-list-container">
      <h1>Todo List</h1>
      <div className="add-todo-container">
        <input
          type="text"
          value={inputValue}
          placeholder="Enter your Todo"
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul className="todo-items">
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          {editingId === todo.id ? (
            <input
              type="text"
              defaultValue={todo.text}
              onBlur={(e) => handleEditTodo(todo.id, e.target.value)}
            />
          ) : (
            <span>{todo.text}</span>
          )}
          <div className="buttons-container">
            <button className="edit-button" onClick={() => handleEditButtonClick(todo.id)}>Edit</button>
            <button className="delete-button" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </div>
        </li>
      ))}
      </ul>
    </div>
  );
};

export default TodoList;
