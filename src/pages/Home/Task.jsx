import React, { useContext, useState } from "react";
import axios from "axios";
import TodoList from "./TodoList";
import { AuthContext } from "../../provider/AuthProvider";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const Task = ({ addTodo }) => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]); // State to store the selected files
  const [successMessage, setSuccessMessage] = useState(""); // State to manage success message

  const { user } = useContext(AuthContext);

  const handleAddTodo = async () => {
    if (!text.trim() && files.length === 0) {
      // Check if the input is empty and no files are selected
      return; // Don't proceed if the input is invalid
    }

    try {
      const imgURLs = [];

      // Check if files are selected for image upload
      if (files.length > 0) {
        const uploadPromises = files.map(async (file) => {
          const formData = new FormData();
          formData.append("image", file);

          const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
          const response = await fetch(img_hosting_url, {
            method: "POST",
            body: formData,
          });

          const imgResponse = await response.json();

          if (imgResponse.success) {
            imgURLs.push(imgResponse.data.display_url);
          } else {
            // Handle the case where the image upload was not successful
            console.error("Image upload failed:", imgResponse.error.message);
          }
        });

        // Wait for all image uploads to complete
        await Promise.all(uploadPromises);
      }

      const newTodo = {
        text,
        photoURL: user.photoURL,
        images: imgURLs, // Store the image URLs as an array
        userName: user.displayName,
        email: user.email,
        timestamp: new Date().toISOString(),
        userId: user.uid,
        // Add any other properties you need for your todo
      };

      // Now make the API request to add the todo to the server
      const apiResponse = await axios.post(
        "https://blogs-server-seven.vercel.app/api/todos",
        newTodo
      );

      // Handle a successful API response if needed
      console.log("Todo added successfully:", apiResponse.data);

      // Update the success message
      setSuccessMessage("Todo added successfully!");

      // Clear the success message after a few seconds (e.g., 3 seconds)
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);

      setText("");
      setFiles([]); // Reset the selected files after adding the todo
    } catch (error) {
      // Handle any unexpected errors
      console.error("Error adding Todo:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const newFilesArray = Array.from(selectedFiles);
    setFiles([...files, ...newFilesArray]);
  };

  return (
    <Paper elevation={3} className={`facebook-style-post ${successMessage ? "success" : ""}`}>
      <Box p={2}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar src={user?.photoURL} alt="User Avatar" />
          </Grid>
          <Grid item xs>
            {user && (
              <TextField
                fullWidth
                multiline
                rows={2}
                label="What's on your mind?"
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={handleKeyPress}
              />
            )}
          </Grid>
        </Grid>

        {files.length > 0 && (
          <Box mt={2} display="flex" alignItems="center">
            {files.map((file, index) => (
              <img
                key={index}
                className="border m-1"
                src={URL.createObjectURL(file)}
                alt={`Selected ${index + 1}`}
                width="50px"
              />
            ))}
          </Box>
        )}

        {successMessage && (
          <Typography variant="body1" color="success" mt={2}>
            {successMessage}
          </Typography>
        )}

        <Box mt={2} display="flex" alignItems="center" justifyContent="space-between">
          {user && (
            <>
              <input type="file" accept="image/*" style={{ display: "none" }} id="file-input" onChange={handleFileChange} />

              <label htmlFor="file-input">
                <Button
                  variant="outlined"
                  color="primary"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  Photo/Video
                </Button>
              </label>
            </>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={handleAddTodo}
            disabled={!text.trim() && !files.length}
            startIcon={<AddIcon />}
          >
            Post
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default Task;
