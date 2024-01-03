import React, { useContext } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { AuthContext } from "../../provider/AuthProvider";

const DashboardHome = () => {
  const { loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
      <div className="w-1/2 mx-auto text-center text-white">
        <Slide>
          <h1 className="text-4xl font-bold">Welcome Back</h1>
        </Slide>
        <Fade delay={1000} cascade damping={0.3}>
          <p className="mt-4 text-lg">
            Explore the world of languages with our interactive courses,
            immersive experiences, and expert tutors.
          </p>
          <button className="mt-8 bg-white text-blue-500 hover:bg-blue-500 hover:text-white py-2 px-4 rounded-full">
            <AiOutlinePlayCircle className="inline-block mr-2" size={20} />
            Get Started
          </button>
        </Fade>
      </div>
    </div>
  );
};

export default DashboardHome;
