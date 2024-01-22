import {
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import Swal from "sweetalert2";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "https://userinformation.vercel.app/api/todos"
      );
      if (Array.isArray(response.data)) {
        setPosts(response.data);
        
        setLoading(false);
      } else {
        setError("Posts not received");
      }
    } catch (error) {
      setError(`Error fetching: ${error.message}`);
    }
  };

  useEffect(() => {
    fetchPosts();
    const pollInterval = setInterval(fetchPosts, 5000);
    return () => clearInterval(pollInterval);
  }, []);

  const onDelete = (deletedTodoId) => {
    setPosts(posts.filter((post) => post._id !== deletedTodoId));
  };

  const handleDeleteTodo = async (postId) => {
    try {
      await axios.delete(
        `https://userinformation.vercel.app/api/todos/${postId}`
      );

      onDelete(postId);
      Swal.fire({
        icon: "success",
        title: "Post Deleted",
        text: "Your post has been deleted successfully!",
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
  const handleApprovePost = async (postId) => {
    try {
      const response = await axios.put(
        `https://userinformation.vercel.app/api/todos/${postId}/status`,
        { status: "approved" }
      );

      console.log("Todo approved:", response.data);
      // You may want to update the UI or trigger a refetch of todos
    } catch (error) {
      console.error("Error approving todo:", error);
    }
  };

  const handleRejectPost = async (postId) => {
    try {
      const response = await axios.put(
        `https://userinformation.vercel.app/api/todos/${postId}/status`,
        {
          status: "rejected",
        }
      );
      console.log("Todo rejected:", response.data);
      // You may want to update the UI or trigger a refetch of todos
    } catch (error) {
      console.error("Error rejecting todo:", error);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);

    const timeDifference = now - date;

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

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
    <div className="mt-4 mx-auto md:w-1/2 w-full px-4">
      {error ? (
        <p>Error: {error}</p>
      ) : loading ? (
        <CircularProgress />
      ) : (
        <div>
          {posts.map((post) => (
            <Card key={post._id} className="mb-2">
              <CardContent>
                <div className="flex justify-between items-stretch mb-4 border-b-2">
                  <div className="flex items-center">
                    <Avatar src={post.photoURL} aria-label="user-profile" />
                    <div className="ml-2">
                      <Typography variant="subtitle1">
                        {post.userName}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {formatTimeAgo(post.timestamp)}
                      </Typography>
                    </div>
                  </div>
                  <div>
                    {post.status === "pending" && (
                      <div>
                        <IconButton
                          edge="end"
                          aria-label="approve"
                          onClick={() => handleApprovePost(post._id)}
                        >
                          <CheckIcon />
                        </IconButton>
                        <IconButton
                          edge="end"
                          aria-label="reject"
                          onClick={() => handleRejectPost(post._id)}
                        >
                          <ClearIcon />
                        </IconButton>
                      </div>
                    )}

                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteTodo(post._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </div>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="mt-2"
                >
                  {post.text}
                </Typography>
                {post.images && (
                  <div className="image-grid my-2">
                    {post.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Image ${index}`}
                        className="rounded-lg cursor-pointer image bg-slate-950"
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllPost;
