/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaComment, FaEllipsisV, FaFacebook, FaTrash } from "react-icons/fa";
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
import { FaThumbsUp } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import "./Todos.css";

import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
// import { FaEllipsisV, FaTrash } from "react-icons/fa";



const TodoItem = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(todo.text);
  const [anchorEl, setAnchorEl] = useState(null);
  const { user } = useContext(AuthContext);
  const [showMoreText, setShowMoreText] = useState(false);

  const [showAllImages, setShowAllImages] = useState(false);
  // const [fullscreenImage, setFullscreenImage] = useState(null);
  const [reporting, setReporting] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [commentInputVisible, setCommentInputVisible] = useState(false);

  // State for managing replies
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [openMenu, setOpenMenu] = useState(null);

  // const [isExpanded, setIsExpanded] = useState(false);

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

  // const closeFullscreenImage = () => {
  //   setFullscreenImage(null);
  // };

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
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Set isEditing to false after successfully updating the todo
      setIsEditing(false);
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
  // eslint-disable-next-line no-unused-vars
  const handleAddComment = async () => {
    if (newComment.trim() !== "") {
      try {
        // Send a POST request to your API to add the comment.
        // eslint-disable-next-line no-unused-vars
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
        // eslint-disable-next-line no-unused-vars
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todo._id]);



  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleOpenMenu = (e, commentId) => {
    setMenuAnchorEl(e.currentTarget);
    setOpenMenu(commentId);
  };
  // eslint-disable-next-line no-unused-vars
  const handleCloseMenus = (commentId) => {
    setMenuAnchorEl(null);
    setOpenMenu(null);
  };

  // Function to handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    // Show a confirmation dialog before deleting the comment
    const confirmation = await Swal.fire({
      title: "Delete Comment",
      text: "Are you sure you want to delete this comment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (confirmation.isConfirmed) {
      try {
        // Send a DELETE request to your API to delete the comment.
        await axios.delete(
          `https://blogs-server-seven.vercel.app/api/comments/${commentId}`
        );

        // Fetch comments after deleting a comment
        fetchComments();

        Swal.fire({
          icon: "success",
          title: "Comment Deleted",
          text: "The comment has been deleted successfully!",
        });
      } catch (error) {
        console.error("Error deleting comment:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "An error occurred while deleting the comment.",
        });
      }
    }
  };


  // eslint-disable-next-line no-unused-vars
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
    // eslint-disable-next-line no-unused-vars
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
      className={`borde bg-slate-800 rounded-lg mx-auto container overflow-hidden shadow-md mt-2 mb-2 ${isEditing ? "bg-gray-200" : ""
        }`}
    >
      <CardContent className="bg-base-200">
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
                  <p className="flex items-center ml-4 mb-2 font-semibold font-serif ">{todo.text}</p>
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
              <div className="container image-grid my-2">
                {/* Mapping through images to display them */}
                {showAllImages
                  ? todo.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Image ${index}`}
                      className="rounded-lg cursor-pointer image  bg-slate-950"
                      onClick={() => openFullscreenImage(image)}
                    />
                  ))
                  : todo.images.slice(0, 2).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Image ${index}`}
                      className="rounded-lg bg-slate-950 cursor-pointer"
                      onClick={() => openFullscreenImage(image)}
                    />
                  ))}
                {/* Show a button to view more images if there are more than 3 */}
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

            {/* {fullscreenImage && (
              <div
                className={`modal-overlay fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 ${fullscreenImage ? 'active' : ''}`}
                onClick={closeFullscreenImage}
              >
                <div className={`modal-container max-w-3xl max-h-full overflow-hidden rounded-lg ${fullscreenImage ? 'active' : ''}`}>
                  <button
                    className=" text-white btn-sm btn-circle bg-red-600 absolute top-2 right-2 text-xl cursor-pointer"
                    onClick={closeFullscreenImage}
                  >
                    &times;
                  </button>
          
                  <img
                    src={fullscreenImage}
                    alt="Fullscreen"
                  className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )} */}

          </>
        )}
        <div className="border"></div>
        <div className="flex items-center justify-between mb-4">
          <div className="mr-4 flex justify-center items-center">
            <IconButton onClick={handleLikeTodo}>
              <FaThumbsUp
                className={`text-blue-500 ml-3 text-xl ${isLikedByUser ? 'text-red-500' : ''}`}
              />
            </IconButton>
            <span className="ml-1 text-green-700"> {likeCount} </span>
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
        <div className="border mb-2"></div>
        <div>

          <div className="flex items-center space-x-1 mb-1">
            <Avatar
              src={user?.photoURL}
              aria-label="user-profile"
              sx={{ width: 30, height: 30, border: 1 }}
            />

            <div className="w-full flex space-x-2">
              <TextareaAutosize
                rowsMin={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write comment..."
                className="w-full outline-none resize-none border rounded p-1 h-20"
              />
              <div>
                <Button
                  onClick={handleAddComment}
                  variant="contained"
                  color="primary"
                  className="ml-2 btn-xs"
                >
                  <FaComment />
                </Button>
              </div>
            </div>

          </div>


          <ul className="space-y-1 w-[96%] ml-auto">
            {commentsToDisplay.map((comment, index) => (
              <li key={index} className="flex  items-start  justify-center space-x-2 p-1 bg-white">
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
                          <div className="flex justify-center items-center mb-4">
                            <Avatar src={user?.photoURL} aria-label="user-profile" sx={{ width: 40, height: 40 }} />
                            <TextareaAutosize
                              rowsMin={3}
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Add a reply..."
                              className="w-full ml-2 outline-none resize-none"
                            />
                          </div>
                          <Button onClick={handleAddReply} variant="contained" color="primary" className="mt-2 ml-2 btn-xs">
                            Reply
                          </Button>
                          <Button onClick={cancelReply} variant="outlined" color="secondary" className="mt-2 ml-2 btn-xs">
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


                      {/* Add the 3 dot icon */}
                      <div className="relative inline-block text-left">
                        <div>
                          <button
                            onClick={(e) => handleOpenMenu(e, comment._id)}
                            className="flex items-center text-gray-400 hover:text-gray-600"
                          >
                            <FaEllipsisV />
                          </button>
                        </div>
                        <Popover
                          open={openMenu === comment._id}
                          anchorEl={menuAnchorEl}
                          onClose={() => handleCloseMenus(comment._id)}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                        >
                          <List component="nav" aria-label="comment menu">
                            <ListItem button onClick={() => handleDeleteComment(comment._id)}>
                              <FaTrash className="mr-2 text-red-500" />
                              <ListItemText primary="Delete" />
                            </ListItem>
                          </List>
                        </Popover>
                      </div>



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
