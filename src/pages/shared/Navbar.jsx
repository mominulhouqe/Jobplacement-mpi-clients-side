import  { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { FaSignOutAlt, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleUserProfileClick = () => {
    navigate("/userprofile"); // Replace with the actual route for the user profile
    handleProfileClose(); // Close the dropdown menu after navigation
  };

  const handleItemClick = () => {
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="fixed" color="primary">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/"  onClick={handleItemClick} style={{ textDecoration: "none", color: "#FFF" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="auto" height="40" version="1.1">
                <text x="10" y="30" fontFamily="Arial" fontSize="24" fill="#ffffff">JobPlacement ~ MBPI</text>
              </svg>

            </Link>
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => setOpen(!open)}
            sx={{ display: { md: "none" } }}
          >
            {open ? <FaTimes /> : <FaBars />}
          </IconButton>
          <ul
            className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static bg-primary md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? "top-11 " : "top-[-490px]"
              }`}
          >
            <li className="md:ml-4 my-2">
              <Link
                to="/forms"
                className="text-white px-2 py-1 rounded-lg duration-500"
                onClick={handleItemClick} >
                FORMS
              </Link>
            </li>
            <li className="md:ml-4 my-2">
              <Link
                to="/services"
                className="text-white px-2 py-1 rounded-lg duration-500"
                onClick={handleItemClick} >
                SERVICES
              </Link>
            </li>
            <li className="md:ml-4 my-2">
              <Link
                to="/contact"
                className="text-white px-2 py-1 rounded-lg duration-500"
                onClick={handleItemClick}>
                CONTACT
              </Link>
            </li>
          </ul>
          <div className="md:ml-4">
            {user ? (
              <div>
                <IconButton
                  color="inherit"
                  onClick={handleProfileClick}
                  sx={{ padding: 0 }}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full mr-2"
                    />
                  ) : (
                    <FaUser fontSize="large" />
                  )}
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileClose}
                  PaperProps={{
                    component: Paper,
                    sx: { padding: 2 },
                  }}
                >
                  <MenuItem onClick={handleUserProfileClick}>
                    <ListItemText primary="Profile" />
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <FaSignOutAlt fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Link to="/login" style={{ textDecoration: "none" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ textTransform: "none" }}
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
