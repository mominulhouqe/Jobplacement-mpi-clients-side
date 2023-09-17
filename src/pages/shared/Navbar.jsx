import React, { useContext, useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import Zoom from "react-awesome-reveal";
import { FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import "./Navbar.css";
const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleItemClick = () => {
    setOpen(false);
  };

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

  return (
    <div>
      <div className="shadow-xl fixed w-full top-0 left-0 z-10 ">
        <div className="md:flex items-center justify-between bg-white">
          <Zoom direction="down" duration={500} triggerOnce>
            <div className="font-bold text-xl cursor-pointer flex items-center font-[Poppins] text-gray-800">
              <Link to="/" className="text-2xl">
              My Blogs
              </Link>
            </div>
          </Zoom>

          <div
            onClick={() => setOpen(!open)}
            className=" absolute right-8 top-3 cursor-pointer md:hidden"
          >
            {open ? <IoClose /> : <IoMenu />}
          </div>

          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-11 " : "top-[-490px]"
            }
              }`}
          >
            <Zoom direction="down" duration={500} triggerOnce>
              <li className="md:ml-8 text-xl md:my-0 my-7">
                <Link
                  to="/about"
                  className="text-[#005F00] hover:bg-[#005F00] hover:text-white px-4 py-2 rounded-lg duration-500"
                  onClick={handleItemClick}
                >
                  ABOUT US
                </Link>
              </li>
            </Zoom>
            <Zoom direction="down" duration={500} triggerOnce>
              <li className="md:ml-8 text-xl md:my-0 my-7">
                <Link
                  to="/services"
                  className="text-[#005F00] hover:bg-[#005F00] hover:text-white px-4 py-2 rounded-lg duration-500"
                  onClick={handleItemClick}
                >
                  SERVICES
                </Link>
              </li>
            </Zoom>

            <Zoom direction="down" duration={500} triggerOnce>
              <li className="md:ml-8 text-xl md:my-0 my-7">
                <Link
                  to="/indurstry"
                  className="text-[#005F00] hover:bg-[#005F00] hover:text-white px-4 py-2 rounded-lg duration-500"
                  onClick={handleItemClick}
                >
                  INDUSTRIES
                </Link>
              </li>
            </Zoom>
            <Zoom direction="down" duration={500} triggerOnce>
              <li className="md:ml-8 text-xl md:my-0 my-7">
                <Link
                  to="/contact"
                  className="text-[#005F00] hover:bg-[#005F00] hover:text-white px-4 py-2 rounded-lg duration-500"
                  onClick={handleItemClick}
                >
                  CONTACT
                </Link>
              </li>
            </Zoom>
            <Zoom direction="down" duration={500} triggerOnce>
              <div className="md:ml-8 text-xl md:my-0 my-7">
                {user && (
                  <div className="flex items-center">
                    {user.photoURL ? (
                      <div
                        className="tooltip text-center w-10 h-10 tooltip-bottom"
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
                        className="tooltip text-center w-10 h-10 tooltip-bottom"
                        data-tip={user.displayName}
                      >
                        <img
                          src="https://example.com/placeholder-image.jpg"
                          alt="Default"
                          className="w-10 h-10 rounded-full bg-white mr-2"
                        />
                      </div>
                    )}
                    <button
                      onClick={handleLogout}
                      className="py-2 px-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                    >
                      <FaSignOutAlt className="text-2xl"></FaSignOutAlt>
                    </button>
                  </div>
                )}

                {!user && (
                  <Link to="/login">
                    <button
                      className="py-3 px-4 rounded-lg ml-6 bg-blue-500 hover:bg-blue-600 text-white"
                      onClick={handleItemClick}
                    >
                      Sign In
                    </button>
                  </Link>
                )}
              </div>
            </Zoom>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

