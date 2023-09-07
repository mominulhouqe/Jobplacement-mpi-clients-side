import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const menuItems = (
    <>
    
        <Link
          to="/"
          className="text-white flex justify-center items-center hover:text-green-500 "
        >
          Home
        </Link>
   

      {user && (
        <div className="flex items-center">
          {user.photoURL ? (
            <div
              className="tooltip text-center w-10 h-10  tooltip-bottom"
              data-tip={user.displayName}
            >
              <img
                src={user.photoURL}
                alt={user.displayName}
                className="w-10 h-10 rounded-full mr-2"
              />
            </div>
          ) : (
            <div
              className="tooltip text-center w-10 h-10  tooltip-bottom"
              data-tip={user.displayName}
            >
              <img
                src="https://example.com/placeholder-image.jpg"
                alt="Default"
                className="w-10 h-10 rounded-full bg-white mr-2"
              />
            </div>
          )}
        </div>
      )}

      {user ? (
        <button
          onClick={handleLogout}
          className="py-3 px-4 rounded-lg ml-6 bg-red-500 hover:bg-red-600 text-white"
        >
          <FaSignOutAlt className="text-2xl"></FaSignOutAlt>
        </button>
      ) : (
        <>
          <Link to="/login">
            <button className="py-3 px-4 rounded-lg ml-6 bg-blue-500 hover:bg-blue-600 text-white">
              Sign In
            </button>
          </Link>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 text-white font-mono">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-2xl text-green-500 hover:text-green-700"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <Link to="/" className="text-xl font-semibold hover:text-green-500">
          <img
            src="https://images-platform.99static.com//qJ3u8FABhDvDacTrJfkMzHvVFCM=/378x266:1622x1510/fit-in/500x500/99designs-contests-attachments/138/138432/attachment_138432570"
            alt="Logo"
            className="w-12 h-12 rounded-full"
          />
        </Link>

        <div className={`lg:flex space-x-4 ${menuOpen ? "block" : "hidden"}`}>
          <ul className="menu menu-horizontal bg-black text-white  font-semibold">{menuItems}</ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
