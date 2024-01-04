import React, { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { BiAddToQueue } from "react-icons/bi";
import { AuthContext } from "../provider/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import Navbar from "../pages/shared/Navbar";
import { Drawer, List, ListItem, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  if (isAdminLoading) {
    return (
      <div className="flex justify-center loading-spinner">Loading...</div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mt-16">
        {/* Small Device - Menu Icon */}
        <IconButton
          aria-label="Open Menu"
          onClick={toggleDrawer}
          edge="end"
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        {/* Responsive Drawer */}
        <Drawer
          anchor="right"
          open={isDrawerOpen}
          onClose={toggleDrawer}
          PaperProps={{ style: { width: "50%" } }}
        >
          <List>
            <ListItem>
              <div className="mx-auto text-center my-10">
                <img
                  src={user?.photoURL || user.photoURL}
                  className="mx-auto rounded-full"
                  alt=""
                />
                <h3 className="text-2xl font-bold">{user.displayName}</h3>
                <p>{user.email}</p>
              </div>
            </ListItem>
            <ListItem>
              <ul className="menu p-4 h-full text-black">
                {isAdmin ? (
                  // Admin content
                  <>
                    <li>
                      <Link to="/"> Home</Link>
                    </li>
                    <li>
                      <Link to="/dashboard/all-post">
                        {" "}
                        <BiAddToQueue /> All Post
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/student-form">
                        {" "}
                        <BiAddToQueue /> Student Forms
                      </Link>
                    </li>
                  </>
                ) : (
                  // Regular user content
                  <li>
                    <Link to="/"> Home</Link>
                  </li>
                )}
              </ul>
            </ListItem>
          </List>
        </Drawer>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
