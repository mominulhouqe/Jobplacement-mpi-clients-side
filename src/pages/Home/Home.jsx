import React from "react";
import Navbar from "../shared/Navbar";
import Footer from "../shared/Footer";
import { Outlet } from "react-router-dom";
import Task from "./Task";
import TodoList from "./TodoList";

const Home = () => {
  return (
    <div className="mt-16 flex flex-col md:flex-row container mx-auto">
      <div className="container w-full md:w-3/4 mx-auto mt-8 md:mr-4">
        <TodoList />
      </div>
      <div className="hidden md:block w-full md:w-1/4 mt-4 md:mt-0">Comming Soon</div>
    </div>
  );
};

export default Home;
