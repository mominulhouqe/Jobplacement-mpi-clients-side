import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaFacebook, FaTrash } from "react-icons/fa";
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
import { FaThumbsUp } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

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

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likeCount, setLikeCount] = useState(0); // Initialize likeCount with 0

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


      await axios.put(
        `https://blogs-server-seven.vercel.app/api/todos/${todo._id}`,
        {
          text,
          completed: todo.completed,
        }
      );


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
      ;
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
      ;
    }
  };

  const handleReportTodo = async () => {
    if (reporting) {
      return;
    }

    try {


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
      ;
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

  const handleLikeTodo = async () => {
    if (user) {
      try {


        await axios.post(
          `https://blogs-server-seven.vercel.app/api/todos/${todo._id}/likes`,
          {
            userId: user.uid,
            userName: user?.displayName, // Use user.displayName
          }
        );

        // Update the like count on the front end.
        setLikeCount(likeCount + 1);

        console.log('Like request successful'); // Log a success message after the like request.

        toast.success("Liked the post!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.error("Error liking post:", error);

        console.log('Like request failed. Error:', error); // Log the error message.

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while liking the post.",
        });
      } finally {
        ;
      }
    } else {
      // Handle the case where the user is not authenticated.
      // You can show a login prompt or redirect the user to the login page.
    }
  };


  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      try {


        // Make an API request to add a comment to the todo item.
        await axios.post(
          `https://blogs-server-seven.vercel.app/api/todos/${todo._id}/comments`,
          {
            userId: user.uid,
            text: newComment,
          }
        );

        // Refresh the comments after adding a new comment.
        const response = await axios.get(
          `https://blogs-server-seven.vercel.app/api/todos/${todo._id}/comments`
        );
        setComments(response.data);

        // Clear the comment input field.
        setNewComment("");

        toast.success("Comment added!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } catch (error) {
        console.error("Error adding comment:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while adding the comment.",
        });
      } finally {
        ;
      }
    }
  };

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `https://blogs-server-seven.vercel.app/api/todos/${todo._id}/likes`
        );
        // Update the like count based on the fetched data.
        console.log(response.data.likeCount);
        setLikeCount(response.data.likeCount);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [todo._id]);

  // Fetch comments when the component mounts
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `https://blogs-server-seven.vercel.app/api/todos/${todo._id}/comments`
        );
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [todo._id]);


  const handleShareWhatsApp = () => {
    const shareURL = `whatsapp://send?text=${encodeURIComponent(
      `Check out this todo item: ${window.location.href}`
    )}`;
    window.open(shareURL);
  };

  const handleShareFacebook = () => {
    const shareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(shareURL);
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);

    const timeDifference = now - date;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? "s" : ""} ago`;
    } else if (minutes < 60) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    } else {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return date.toLocaleDateString(undefined, options);
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
            {user && todo.likes && !todo.likes.includes(user.uid) ? (
              <IconButton onClick={handleLikeTodo}>
                <FaThumbsUp />
              </IconButton>
            ) : (
              <IconButton className="liked" onClick={handleLikeTodo}>
                <FaThumbsUp />
              </IconButton>
            )}

            {/* Add Share Buttons */}
            <IconButton onClick={handleShareWhatsApp}>
              <FaWhatsapp />
            </IconButton>
            <IconButton onClick={handleShareFacebook}>
              <FaFacebook />
            </IconButton>
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
            <span>{likeCount} Likes</span>
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
                [
                  <MenuItem key="edit" onClick={() => setIsEditing(true)}>
                    <BsPencil /> Edit
                  </MenuItem>,
                  <MenuItem key="delete" onClick={handleDeleteTodo}>
                    <FaTrash /> Delete
                  </MenuItem>
                ]
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

        {/* Comment Section */}
        <div>
          <h2>Comments</h2>
          <ul>
            {Array.isArray(comments) &&
              comments.map((comment, index) => (
                <li key={index}>
                  <p>{comment.text}</p>
                </li>
              ))}
          </ul>
          <div>
            <textarea
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <button onClick={handleAddComment}>Add Comment</button>
          </div>
        </div>

      </CardContent>


      <ToastContainer />
    </Card>
  );
};

export default TodoItem;
