import React, { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import { HiFlag } from "react-icons/hi";
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
import { AuthContext } from "../../provider/AuthProvider";
import CircularProgress from "@mui/material/CircularProgress";

import './Todos.css'

const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(AuthContext);
  const [showMoreText, setShowMoreText] = useState(false);

  const [showAllImages, setShowAllImages] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [reporting, setReporting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const openFullscreenImage = (image) => {
    setFullscreenImage(image);
  };

  const closeFullscreenImage = () => {
    setFullscreenImage(null);
  };

  const toggleShowMoreText = () => {
    setShowMoreText(!showMoreText);
  };

  const isOwner = user && user.uid === todo.userId;

  const handleUpdateTodo = async () => {
    try {
      setIsLoading(true);

      await axios.put(
        `https://blogs-server-seven.vercel.app/api/todos/${todo._id}`,
        {
          text,
          completed: todo.completed,
        }
      );

      setIsEditing(false);
      onUpdate(todo._id, text);

      toast.success("post updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error updating post:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while updating the post.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteTodo = async () => {
    try {
      setIsLoading(true);

      await axios.delete(
        `https://blogs-server-seven.vercel.app/api/todos/${todo._id}`
      );

      onDelete(todo._id);

      Swal.fire({
        icon: "success",
        title: "Post Deleted",
        text: "Your todo has been deleted successfully!",
      });
    } catch (error) {
      console.error("Error deleting post:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while deleting the post.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReportTodo = async () => {
    if (reporting) {
      return;
    }

    try {
      setIsLoading(true);

      await axios.post(
        `https://blogs-server-seven.vercel.app/api/todosReports`,
        {
          text,
          photoURL: user.photoURL,
          userName: user.displayName,
          email: user.email,
          timestamp: new Date().toISOString(),
          todoId: todo._id,
          reporterId: user.uid,
        }
      );

      setReporting(true);

      toast.success("post reported successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error("Error reporting post:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while reporting the post.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMenuClick = (event) => {
    if (!isEditing) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const images = todo.images
    ? todo.images.map((image) => ({
      original: image,
      thumbnail: image,
    }))
    : [];

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);

    const timeDifference = now - date;

    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;

    if (timeDifference < minute) {
      const seconds = Math.floor(timeDifference / 1000);
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    } else if (timeDifference < hour) {
      const minutes = Math.floor(timeDifference / minute);
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (timeDifference < day) {
      const hours = Math.floor(timeDifference / hour);
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      return date.toLocaleString();
    }
  };


  return (
    <Card
      sx={{
        maxWidth: "100%",
      }}
      className={`border rounded-lg mx-auto container overflow-hidden shadow-md mt-2 mb-2 ${isEditing ? "bg-gray-100" : ""
        }`}
    >
      {isLoading ? (
        <div className="text-center mt-4">
          <CircularProgress />
        </div>
      ) : (
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
                  {formatTimeAgo(todo.timestamp)}
                </Typography>
              </div>
            </div>
            <CardActions disableSpacing>
              {!isEditing && (
                <IconButton
                  onClick={handleMenuClick}
                  aria-controls="todo-menu"
                  aria-haspopup="true"
                >
                  <MoreVertIcon />
                </IconButton>
              )}
              {!isOwner && (
                <IconButton onClick={handleReportTodo}>
                  {/* <HiFlag /> */}
                </IconButton>
              )}
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
                className={`text-lg ${todo.completed ? "line-through text-gray-400" : ""
                  }`}
              >
                {showMoreText || todo.text.split(" ").length <= 50 ? (
                  <>
                    {todo.text}
                    {todo.text.split(" ").length > 50 && (
                      <button
                        className="text-blue-500 ml-1"
                        onClick={toggleShowMoreText}
                      >
                        See Less
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    {todo.text.split(" ").slice(0, 50).join(" ")}
                    <button
                      className="text-blue-500 ml-1"
                      onClick={toggleShowMoreText}
                    >
                      See More
                    </button>
                  </>
                )}

              </Typography>

              {todo.images && (
                <div className="mt-2 flex flex-wrap justify-center items-center">
                  {showAllImages
                    ? todo.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Image ${index}`}
                        className="w-96 h-auto rounded-lg cursor-pointer"
                        onClick={() => openFullscreenImage(image)}
                      />
                    ))
                    : todo.images.slice(0, 2).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Image ${index}`}
                        className="w-96 h-auto rounded-lg cursor-pointer"
                        onClick={() => openFullscreenImage(image)}
                      />
                    ))}
                  {todo.images.length > 3 && !showAllImages && (
                    <button
                      className="text-blue-500 mt-2"
                      onClick={() => setShowAllImages(true)}
                    >
                      +{todo.images.length - 3} more
                    </button>
                  )}
                </div>
              )}



              <Menu
                id="todo-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
              >
                {isOwner ? (
                  <>
                    <MenuItem onClick={() => setIsEditing(true)}>
                      <BsPencil /> Edit
                    </MenuItem>
                    <MenuItem onClick={handleDeleteTodo}>
                      <FaTrash /> Delete
                    </MenuItem>
                  </>
                ) : (
                  <MenuItem onClick={handleReportTodo}>
                    <HiFlag /> Report
                  </MenuItem>
                )}
              </Menu>

              {/* Fullscreen Image Modal */}
              {fullscreenImage && (
                <div
                  className={`modal-overlay ${fullscreenImage ? 'active' : ''}`}
                  onClick={closeFullscreenImage}
                >
                  <div className={`modal-container ${fullscreenImage ? 'active' : ''}`}>
                    <button
                      className="text-white btn-sm btn-circle bg-red-600 absolute top-2 right-2 text-xl cursor-pointer"
                      onClick={closeFullscreenImage}
                    >
                      &times;
                    </button>
                    <img
                      src={fullscreenImage}
                      alt="Fullscreen"
                      className="max-w-full max-h-full "
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      )}

      <ToastContainer />
    </Card>
  );
};

export default TodoItem;
