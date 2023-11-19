import React, { useState, useEffect } from "react";
import axios from "axios";

import Task from "./Task";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://blogs-server-seven.vercel.app/api/todos"
      );
      if (Array.isArray(response.data)) {
        console.log(response.data);
        setTodos(response.data);
      } else {
        setError("Error: Data received is not an array");
      }
    } catch (error) {
      setError(`Error fetching : ${error.message}`);
    }
  };

  // Fetch todos initially when the component mounts
  useEffect(() => {
    fetchTodos();

    // Set up polling to fetch todos every 5 seconds (adjust as needed)
    const pollInterval = setInterval(fetchTodos, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(pollInterval);
  }, []);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const onDelete = (deletedTodoId) => {
    setTodos(todos.filter((todo) => todo._id !== deletedTodoId));
  };

  const handleUpdate = async (todoId, updatedText) => {
    try {
      await axios.put(
        `https://blogs-server-seven.vercel.app/api/todos/${todoId}`,
        { text: updatedText }
      );
      // Fetch todos again to get the latest updates
      fetchTodos();
    } catch (error) {
      console.error("Error updating Todo:", error);
    }
  };

  return (
    <div className="mt-4">
      <Task addTodo={addTodo} />
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo._id}
              todo={todo}
              onDelete={onDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
