import React, { useContext, useState } from "react";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import "./LoginForm.css";
const LoginPage = () => {
  const { signIn, signInGoogle } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!/(?=.*[a-z])/.test(password)) {
      Swal.fire(
        "Oops",
        "Try to include at least one lowercase letter in your password.",
        "error"
      );
      return;
    }
    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        Swal.fire("You Logged In Successfully!", "success");
        form.reset("");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        let errorMessage = "Login failed. Please try again.";
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
        Swal.fire("You Logged In Successfully!", "success");
        setUser(loggedUser);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        let errorMessage = "Login failed. Please try again.";
        if (error.message) {
          errorMessage = error.message;
        }
        Swal.fire("Error!", errorMessage, "error");
      });
  };

  return (
    <div className=" my-6 bg-base-100 flex justify-center items-center ">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8 login-form">
        <h2 className="text-4xl font-bold mb-6 text-center text-blue-700">
          Login
        </h2>
        <form onSubmit={handleLogin}>
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
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Enter your email address"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-semibold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
              />
              <span
                className="absolute right-2 top-2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <button
                type="submit"
                className="btn btn-primary hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={handleGooglePopup}
                className="btn btn-secondary"
              >
                <FaGoogle></FaGoogle>
                Sign In with Google
              </button>
            </div>
            <p className="text-gray-600 text-center">
              New here? Please{" "}
              <Link
                className="text-blue-500 underline font-semibold"
                to="/register"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
