import React, { useContext, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { getAuth } from "firebase/auth";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import app from "../../firebase.config";

const Register = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { createUser, signInGoogle } = useContext(AuthContext);

  const handleRegister = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;

    if (!/(?=.*[a-z])/.test(password)) {
      swal(
        "Oops",
        "Try to include at least one lowercase letter in your password.",
        "error"
      );
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        Swal.fire("You Register Successfully!", "success");
        form.reset();
        navigate("/login");
        return updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURL,
        });
      })
      .catch((error) => {
        let errorMessage = "Registration failed. Please try again.";
        if (error.message) {
          errorMessage = error.message;
        }
        Swal.fire("Error!", errorMessage, "error");
      });
  };

  const handleGooglePopup = () => {
    signInGoogle()
      .then((result) => {
        const loggedUser = result.user;
        Swal.fire("You Login Successfully!", "success");
        setUser(loggedUser);
        navigate("/");
      })
      .catch((error) => {
        let errorMessage = "Registration failed. Please try again.";
        if (error.message) {
          errorMessage = error.message;
        }
        Swal.fire("Error!", errorMessage, "error");
      });
  };

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-md rounded-lg">
        <h2 className="text-4xl font-bold text-center">Please Register !!!</h2>
        <form onSubmit={handleRegister}>
          <div className="lg:flex justify-center items-center gap-2">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Name
              </label>
              <input
                type="name"
                id="name"
                name="name"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="photoURL"
                className="block text-gray-700 font-semibold mb-2"
              >
                Photo URL
              </label>
              <input
                type="url"
                id="photoURL"
                name="photoURL"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your photo URL"
              />
            </div>
          </div>
        
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your email address"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-semibold mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
              />
            </div>
        

          <div className="flex items-center space-x-2 justify-between">
            <button
              type="submit"
              className="w-1/2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={handleGooglePopup}
              className="w-1/2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              <FaGoogle className="inline-block mr-2" />
              Sign Up with Google
            </button>
          </div>
          <p className="text-center">
            Already have an account? Please{" "}
            <Link className="text-blue-500 underline font-semibold" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
