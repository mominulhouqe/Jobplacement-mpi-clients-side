import React, { useState } from 'react';
import axios from 'axios';

const TodoItem = ({ todo, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleUpdateTodo = async () => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${todo._id}`, {
        text,
        completed: todo.completed,
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating Todo:', error);
    }
  };

  const handleDeleteTodo = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${todo._id}`);
      onDelete(todo._id); // Remove the deleted Todo from the UI
    } catch (error) {
      console.error('Error deleting Todo:', error);
    }
  };

  return (
    <li className="flex items-center space-x-2">
      {isEditing ? (
        <>
          <input
            type="text"
            className="border border-gray-300 rounded px-2 py-1"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-3 py-1 rounded"
            onClick={handleUpdateTodo}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            className="form-checkbox text-blue-500 h-5 w-5"
          />
          <span
            className={`${
              todo.completed ? 'line-through text-gray-400' : ''
            }`}
          >
            {todo.text}
          </span>
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="text-red-500 hover:underline"
            onClick={handleDeleteTodo}
          >
            Delete
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
