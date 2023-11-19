import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import LoginForm from "./pages/shared/LoginPage.jsx";
import AuthProvider from "./provider/AuthProvider.jsx";
import Register from "./pages/shared/Register.jsx";
import Main from "./Layout/Main.jsx";
import ErrorPage from "./pages/Error/ErrorPage.jsx";
import JobPlacement from "./pages/JobPlacement/JobPlacement.jsx";
import DisplayData from "./pages/JobPlacement/DisplayData.jsx";
import Gallary from "./pages/Gallary/Gallary.jsx";
import UserInfo from "./pages/Users/UserInfo.jsx";


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/userprofile',
        element: <UserInfo />
      },
      {
        path: '/forms',
        element: <JobPlacement />
      },
      {
        path: '/info-details',
        element: <DisplayData />
      },
      {
        path: '/gallary',
        element: <Gallary />
      },
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      
    ]
  }
])


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
