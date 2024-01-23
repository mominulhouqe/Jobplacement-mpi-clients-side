import TodoList from "./TodoList";
import { Drawer, List, ListItem, IconButton } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";
import ProfileView from "../Users/ProfileView";
import CompanyList from "../Company/CompanyList";

// import DisplayData from "../JobPlacement/DisplayData";

const Home = () => {
  // const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // const toggleDrawer = () => {
  //   setIsDrawerOpen(!isDrawerOpen);
  // };

  return (
    <div className="mt-20 container mx-auto flex gap-6">
      {/* Small Device */}
      {/* <div className="md:hidden">
        <IconButton
          aria-label="Open Menu"
          onClick={toggleDrawer}
          edge="end"
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer} PaperProps={{ style: { width: '90%' } }} >
          <div >
            <List > 
              <ListItem button>
                
                <div className="">
              
                </div>
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div> */}
      <div className="hidden lg:block w-full md:w-2/6 mt-4">
        <ProfileView />
      </div>

      <div className="lg:w-3/6 w-full">
        <TodoList />
      </div>

      <div className="hidden lg:block w-full md:w-2/6 mt-4">
     <CompanyList />
      </div>
    


    </div>
  );
};

export default Home;
