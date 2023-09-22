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
import { FaComment } from "react-icons/fa";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import "./Todos.css";

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
  const [likeCount, setLikeCount] = useState(0);
  const [commentInputVisible, setCommentInputVisible] = useState(false);

  // State for managing replies
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const initialCommentDisplayCount = 2;
  const [commentDisplayCount, setCommentDisplayCount] = useState(initialCommentDisplayCount);

  const commentsToDisplay = comments.slice(0, commentDisplayCount);

  const toggleCommentDisplay = () => {
    if (commentDisplayCount === initialCommentDisplayCount) {
      setCommentDisplayCount(comments.length);
    } else {
      setCommentDisplayCount(initialCommentDisplayCount);
    }
  };

  const openFullscreenImage = (image) => {
    setFullscreenImage(image);
  };

  const closeFullscreenImage = () => {
    setFullscreenImage(null);
  };

  const toggleShowMoreText = () => {
    setShowMoreText(!showMoreText);
  };
  // Function to handle replying to a comment
  const handleReplyToComment = (commentId) => {
    setReplyingTo(commentId);
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
            userName: user?.displayName,
          }
        );

        setLikeCount(likeCount + 1);

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

        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while liking the post.",
        });
      }
    } else {
      // Handle the case where the user is not authenticated.
      // You can show a login prompt or redirect the user to the login page.
      // Example: Redirect to the login page
      navigate('/login'); // Make sure 'history' is available in your component
    }
  };
  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      try {
        // Send a POST request to your API to add the comment.
        const response = await axios.post(
          `https://blogs-server-seven.vercel.app/api/todos/${todo._id}/comments`,
          {
            userId: user.uid,
            text: newComment,
            userName: user?.displayName,
            photoURL: user.photoURL,
            email: user.email,
            timestamp: new Date().toISOString(),
            todoId: todo._id,

          }
        );

        // Clear the comment input field.
        setNewComment("");

        // Fetch comments after adding a new comment
        fetchComments();

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
      }
    } else {
      // Handle the case where the user is not authenticated.
      // You can show a login prompt or redirect the user to the login page.
      // Example: Redirect to the login page
      navigate('/login'); // Make sure 'history' is available in your component
    }
  };

  // Function to submit a reply
  const handleAddReply = async () => {
    if (replyText.trim() !== "") {
      try {
        // Send a POST request to your API to add the reply.
        const response = await axios.post(
          `https://blogs-server-seven.vercel.app/api/todos/${todo._id}/comments/${replyingTo}/replies`,
          {
            userId: user.uid,
            text: replyText,
            userName: user?.displayName,
            userPhoto: user?.photoURL,
          }
        );

        // Clear the reply input field and reset replyingTo
        setReplyText("");
        setReplyingTo(null);

        // Fetch comments after adding a new reply
        fetchComments();

        toast.success("Reply added!", {
          // Toast options...
        });
      } catch (error) {
        console.error("Error adding reply:", error);
        Swal.fire({
          // Error handling...
        });
      }
    }
  };

  // Function to cancel replying to a comment
  const cancelReply = () => {
    setReplyingTo(null);
    setReplyText("");
  };


  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `https://blogs-server-seven.vercel.app/api/todos/${todo._id}/likes`
        );
        setLikeCount(response.data.likeCount);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [todo._id]);

  // Define a function to fetch comments
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

  // Use the useEffect hook to fetch comments when todo._id changes
  useEffect(() => {
    fetchComments();
  }, [todo._id]);

  const toggleCommentInput = () => {
    setCommentInputVisible(!commentInputVisible);
  };

  const handleShareWhatsApp = () => {
    const shareURL = `whatsapp://send?text=${encodeURIComponent(
      `Check out this todo item: ${window.location.href}`
    )}`;
    window.open(shareURL);
  };

  const handleShareFacebook = () => {
    const shareURL = `https://www.facebook.com/=${encodeURIComponent(
      window.location.href
    )}`;
    window.open(shareURL);
  };

  const isLikedByUser = user && todo.likes && todo.likes.includes(user.uid);

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

        <div className="flex items-center justify-between mb-4">
          <div className="mr-4 flex justify-center items-center">
            <IconButton onClick={handleLikeTodo}>
              <FaThumbsUp
                className={`text-blue-500 text-3xl ${isLikedByUser ? 'text-red-500' : ''}`}
              />
            </IconButton>
            <span className="ml-1 text-green-700 text-xl font-medium"> {likeCount} </span>
          </div>

          <div className="flex items-center">
            <IconButton onClick={handleShareWhatsApp} className="text-green-500">
              <FaWhatsapp />
            </IconButton>
            <IconButton onClick={handleShareFacebook} className="text-facebook-blue">
              <FaFacebook />
            </IconButton>
          </div>
        </div>

        <div>

          <div className="flex items-center mb-2">
            <Avatar src={user?.photoURL} aria-label="user-profile" sx={{ width: 30, height: 30 }} />
            <TextareaAutosize
              rowsMin={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full ml-2 outline-none resize-none border rounded p-1"
            />
            <Button onClick={handleAddComment} variant="contained" color="primary" className="ml-2 btn-sm">
              Add
            </Button>
          </div>

          <ul className="space-y-4 w-[97%] ml-auto">
            {commentsToDisplay.map((comment, index) => (
              <li key={index} className="flex items-start space-x-2 justify-center border p-2 rounded">
                <Avatar src={comment.photoURL} aria-label="user-profile" sx={{ width: 30, height: 30 }} />
                <div className="flex flex-col w-full">
                  <div className="my-1">
                    <Typography variant="subtitle1">{comment.userName}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      {formatTimeAgo(comment.timestamp)}
                    </Typography>
                  </div>
                  <Paper elevation={0} className="p-2">
                    <div className="flex items-start justify-between">
                      <Typography variant="body2">- {comment.text}</Typography>

                      {replyingTo === comment._id && (
                        <Paper elevation={3} className="p-2 rounded-lg mt-2">
                          <div className="flex items-center">
                            <Avatar src={user?.photoURL} aria-label="user-profile" sx={{ width: 40, height: 40 }} />
                            <TextareaAutosize
                              rowsMin={3}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Add a reply..."
                              className="w-full ml-2 outline-none resize-none"
                            />
                          </div>
                          <Button onClick={handleAddReply} variant="contained" color="primary" className="mt-2">
                            Add Reply
                          </Button>
                          <Button onClick={cancelReply} variant="outlined" color="secondary" className="mt-2 ml-2">
                            Cancel
                          </Button>
                        </Paper>
                      )}

                      <Button
                        onClick={() => handleReplyToComment(comment._id)}
                        color="primary"
                        className="text-blue-500 hover:text-blue-600 mt-2"
                      >
                        Reply
                      </Button>
                    </div>
                  </Paper>
                </div>
              </li>
            ))}
            {comments.length > initialCommentDisplayCount && (
              <li className="flex items-center justify-center mt-2">
                <IconButton onClick={toggleCommentDisplay} size="small">
                  {commentDisplayCount === initialCommentDisplayCount ? (
                    <>
                      <ExpandMoreIcon fontSize="inherit" />
                      <Typography variant="caption">See More</Typography>
                    </>
                  ) : (
                    <>
                      <ExpandLessIcon fontSize="inherit" />
                      <Typography variant="caption">See Less</Typography>
                    </>
                  )}
                </IconButton>
              </li>
            )}
          </ul>

        </div>


      </CardContent>

      <ToastContainer />
    </Card>
  );
};

export default TodoItem;
