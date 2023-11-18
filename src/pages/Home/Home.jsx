
import TodoList from "./TodoList";
import {
  Drawer,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";

const Home = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="mt-16 flex flex-col md:flex-row container mx-auto">
      <div className="md:hidden">
        {/* Small Device */}
        <IconButton
          aria-label="Open Menu"
          onClick={toggleDrawer}
          edge="end"
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
          <div onClick={toggleDrawer} onKeyDown={toggleDrawer}>
            <List>
              <ListItem button>
                {/* <ListItemText primary="Coming Soon" /> */}
                <div className="w-72">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum aliquid consequatur sapiente impedit corporis excepturi voluptate explicabo. Vitae aliquid, corporis provident ab, exercitationem omnis fugit iste sint quibusdam voluptatem perspiciatis!
                </div>
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>

      <div className="container w-full md:w-3/5 mx-auto mt-8 md:mr-4">
        <TodoList />
      </div>



      <div className="hidden md:block w-full md:w-1/3 mt-4 md:mt-0">Coming Soon</div>
    </div>
  );
};

export default Home;
