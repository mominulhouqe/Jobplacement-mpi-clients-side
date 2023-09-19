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

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const Task = ({ addTodo }) => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]); // State to store the selected files

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
  
      // Update the UI with the new todo immediately
      addTodo(newTodo);
  
      // Now make the API request to add the todo to the server
      const apiResponse = await axios.post(
        "https://blogs-server-seven.vercel.app/api/todos",
        newTodo
      );
  
      // Handle a successful API response if needed
      console.log("Todo added successfully:", apiResponse.data);
  
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
    <div className="facebook-style-post">
      <div className="post-header">
        <Avatar src="" alt="User Avatar" />
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
      </div>
      {files.length > 0 && (
        <div className="selected-images">
          {files.map((file, index) => (
            <img
              key={index}
              className="border m-1"
              src={URL.createObjectURL(file)}
              alt={`Selected ${index + 1}`}
              width="50px"
            />
          ))}
        </div>
      )}

      <div className="post-actions">
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          id="file-input"
          onChange={handleFileChange}
        />
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
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
          disabled={!text.trim() && !files}
          startIcon={<AddIcon />}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default Task;
