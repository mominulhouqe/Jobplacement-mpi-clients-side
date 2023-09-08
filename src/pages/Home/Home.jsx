import React from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Outlet } from "react-router-dom";
import Task from "./Task";
import TodoList from "./TodoList";

const Home = () => {
  return (
    <div>
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Todo List</h1>
        <TodoList />
      </div>
    </div>
  );
};

export default Home;
