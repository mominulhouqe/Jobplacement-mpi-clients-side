import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleUpdateTodo = async () => {
    try {
      await axios.put(
        `https://blogs-server-seven.vercel.app/api/todos/${todo._id}`,
        {
          text,
          completed: todo.completed,
        }
      );

      setIsEditing(false);
      onUpdate(todo._id, text);

      // Show a success toast message
      toast.success("Todo updated successfully!", {
        position: "top-right",
        autoClose: 3000, // Auto close the message after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error updating Todo:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the todo.",
      });
    }
  };

  const handleDeleteTodo = async () => {
    try {
      await axios.delete(
        `https://blogs-server-seven.vercel.app/api/todos/${todo._id}`
      );
      onDelete(todo._id);
      Swal.fire({
        icon: "success",
        title: "Todo Deleted",
        text: "Your todo has been deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting Todo:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while deleting the todo.",
      });
    }
  };

  const handleMenuClick = (event) => {
    // Only open the menu if not in editing mode
    if (!isEditing) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{ maxWidth: 345 }}
      className={`border rounded-lg mx-auto container overflow-hidden shadow-md mt-2 mb-2 ${
        isEditing ? "bg-gray-100" : ""
      }`}
    >
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <Avatar
              sx={{ bgcolor: red[500] }}
              src={todo.photoURL}
              aria-label="user-profile"
            ></Avatar>
            <div className="ml-2">
              <Typography variant="subtitle1">{todo.userName}</Typography>
              <Typography variant="caption" color="textSecondary">
                {new Date(todo.timestamp).toLocaleString()}
              </Typography>
            </div>
          </div>

          <CardActions disableSpacing>
            <IconButton
              onClick={isEditing ? null : handleMenuClick}
              aria-controls="todo-menu"
              aria-haspopup="true"
            >
              <MoreVertIcon />
            </IconButton>
          </CardActions>
        </div>

        {isEditing ? (
          <>
            <textarea
              rows="3"
              className="border border-gray-300 rounded-lg px-2 py-1 resize-none w-full"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>

            <div className="flex justify-end mt-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded"
                onClick={handleUpdateTodo}
              >
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <Typography
              variant="body2"
              color="text.secondary"
              className={`text-lg ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.text}
            </Typography>

            {todo.image && (
              <img
                src={todo.image}
                alt="Todo Image"
                className="w-96 rounded-lg mt-2"
              />
            )}

          
            <Menu
              id="todo-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem onClick={() => setIsEditing(true)}>
                <BsPencil /> Edit
              </MenuItem>
              <MenuItem onClick={handleDeleteTodo}>
                <FaTrash /> Delete
              </MenuItem>
            </Menu>
          </>
        )}
      </CardContent>
      <ToastContainer />
    </Card>
  );
};

export default TodoItem;
