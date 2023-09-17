import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaTrash } from 'react-icons/fa';
import { BsPencil } from 'react-icons/bs';

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  const handleUpdateTodo = async () => {
    try {
      await axios.put(`https://blogs-server-seven.vercel.app/api/todos/${todo._id}?_=${Math.random()}`, {
        text,
        completed: todo.completed,
      });

      setIsEditing(false);
      Swal.fire({
        icon: 'success',
        title: 'Todo Updated',
        text: 'Your todo has been updated successfully!',
      });
      onUpdate(todo._id, text);
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
      await axios.delete(`https://blogs-server-seven.vercel.app/api/todos/${todo._id}`);
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
    <div className={`border rounded-lg overflow-hidden shadow-md mt-2 mb-2 ${isEditing ? 'bg-gray-100' : ''}`}>
      <div className="p-4 space-y-2">
        {/* Display user profile image */}
        <img src={todo.photoURL} alt="User Profile" className="h-10 w-10 rounded-full" />

        {isEditing ? (
          <>
            <textarea
              rows="3"
              className="border border-gray-300 rounded-lg px-2 py-1 resize-none w-full"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
            
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={handleUpdateTodo}
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <span
              className={`text-lg ${todo.completed ? 'line-through text-gray-400' : ''}`}
            >
              {todo.text}
            </span>
            <img src={todo.image} alt="Todo Image" className="w-full rounded-lg" />

            <div className="flex justify-end space-x-2">
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
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
