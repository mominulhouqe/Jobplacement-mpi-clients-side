import { useContext, useState } from "react";
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
import logo from "../../assets/download.jpg";

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
    navigate("/userprofile");
    handleProfileClose();
  };

  const handleItemClick = () => {
    setOpen(false);
  };

  return (
    <AppBar color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link
            to="/"
            onClick={handleItemClick}
            style={{
              textDecoration: "none",
              color: "#FFF",
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src={logo} alt="" className="w-10 border rounded-full" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="auto"
              height="40"
              version="1.1"
            >
              <text
                x="10"
                y="30"
                fontFamily="Arial"
                fontSize="18"
                fill="#ffffff"
              >
                {" "}
                JobPlacement ~ MBPI
              </text>
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
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-11 bg-primary" : "top-[-490px] "
          }`}
        >
          <li className="md:ml-4 my-2">
            <Link
              to="/forms"
              className="text-white px-2 py-1 rounded-lg duration-500"
              onClick={handleItemClick}
            >
              FORMS
            </Link>
          </li>
          <li className="md:ml-4 my-2">
            <Link
              to="/gallary"
              className="text-white px-2 py-1 rounded-lg duration-500"
              onClick={handleItemClick}
            >
              GALLERY
            </Link>
          </li>
          <li className="md:ml-4 my-2">
            <Link
              to="/"
              className="text-white px-2 py-1 rounded-lg duration-500"
              onClick={handleItemClick}
            >
              CONTACT
            </Link>
          </li>
          {user ? (
            <li role="none" className="flex items-stretch">
              <Link
                to="/dashboard/userhome"
                role="menuitem"
                className="flex items-center gap-2 py-4  uppercase lg:px-8"
                href="#"
                onClick={handleItemClick}
              >
                <span>Dashboard</span>
              </Link>
            </li>
          ) : null}
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
  );
};

export default Navbar;
