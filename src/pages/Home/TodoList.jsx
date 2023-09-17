import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Task from './Task';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null); // New state for error handling

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://blogs-server-seven.vercel.app/api/todos');
        // Ensure that response.data is an array
        if (Array.isArray(response.data)) {
          console.log(response.data);
          setTodos(response.data);
        } else {
          setError('Error: Data received is not an array');
        }
      } catch (error) {
        setError(`Error fetching Todos: ${error.message}`);
      }
    };

    fetchTodos();
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const onDelete = (deletedTodoId) => {
    setTodos(todos.filter((todo) => todo._id !== deletedTodoId));
  };

  return (
    <div className="mt-4">
      <Task addTodo={addTodo} />
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <TodoItem key={todo._id} todo={todo}  onDelete={onDelete} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
