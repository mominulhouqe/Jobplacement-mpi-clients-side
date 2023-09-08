import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';

const TodoItem = ({ todo, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleUpdateTodo = async () => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${todo._id}?_=${Math.random()}`, {
        text,
        completed: todo.completed,
      });

      setIsEditing(false);
      Swal.fire({
        icon: 'success',
        title: 'Todo Updated',
        text: 'Your todo has been updated successfully!',
      });
    } catch (error) {
      console.error('Error updating Todo:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the todo.',
      });
    }
  };

  const handleDeleteTodo = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${todo._id}`);
      onDelete(todo._id);
      Swal.fire({
        icon: 'success',
        title: 'Todo Deleted',
        text: 'Your todo has been deleted successfully!',
      });
    } catch (error) {
      console.error('Error deleting Todo:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while deleting the todo.',
      });
    }
  };

  return (
    <li className={`flex border rounded-md p-2 bg-slate-200 mt-2 mb-2 items-center space-x-2 ${isEditing ? 'bg-gray-100' : ''}`}>
      {isEditing ? (
        <>
          <textarea
            rows="3" // You can adjust the number of rows as needed
            className="border border-gray-300 rounded px-2 py-1 resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
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
            className={`text-lg ${todo.completed ? 'line-through text-gray-400' : ''}`}
          >
            {todo.text}
          </span>
          <button
            className="text-blue-500 hover:underline"
            onClick={() => setIsEditing(true)}
          >
            <BsPencil /> Edit
          </button>
          <button
            className="text-red-500 hover:underline"
            onClick={handleDeleteTodo}
          >
            <FaTrash /> Delete
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
