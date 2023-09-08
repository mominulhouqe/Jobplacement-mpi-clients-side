import React, { useState } from 'react';
import axios from 'axios';

const Task = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleAddTodo = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/todos', {
        text,
      });
      addTodo(response.data); // Update the UI with the newly created Todo
      setText('');
    } catch (error) {
      console.error('Error adding Todo:', error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        className="border border-gray-300 rounded px-2 py-1 w-full"
        placeholder="Add a new Todo..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded"
        onClick={handleAddTodo}
      >
        Add Todo
      </button>
    </div>
  );
};

export default Task;
