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
  const [file, setFile] = useState(null); // State to store the selected file
  const { user } = useContext(AuthContext);

  const handleAddTodo = async () => {
    if (!text.trim() && !file) {
      // Check if the input is empty
      return; // Don't proceed if the input is invalid
    }

    try {
      let imgURL = null;

      // Check if a file is selected for image upload
      if (file) {
        // Create a FormData object to send the image file
        const formData = new FormData();
        formData.append("image", file);

        // Make a POST request to the image hosting service to upload the image
        const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
        const response = await fetch(img_hosting_url, {
          method: "POST",
          body: formData,
        });

        const imgResponse = await response.json();

        if (imgResponse.success) {
          imgURL = imgResponse.data.display_url;
        } else {
          // Handle the case where the image upload was not successful
          console.error("Image upload failed:", imgResponse.error.message);
        }
      }

     
      const newTodo = {
        text,
        photoURL: user.photoURL,
        image: imgURL,
  
        userName: user.displayName,
        email: user.email,
        timestamp: new Date().toISOString(),
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
      setFile(null); // Reset the selected file after adding the todo
     
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
    // Handle file input change and set the selected file in state
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
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
      {file && (
        <div className="selected-image">
          <img src={URL.createObjectURL(file)} alt="Selected" />
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
          disabled={!text.trim() && !file}
          startIcon={<AddIcon />}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default Task;
