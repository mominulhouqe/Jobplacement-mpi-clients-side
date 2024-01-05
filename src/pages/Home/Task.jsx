import { useContext, useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress"; // Import CircularProgress

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

const img_hosting_token = import.meta.env.VITE_Image_Upload_tokens;

const Task = () => {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false); // Add loading state
  const [successMessage, setSuccessMessage] = useState("");
  const { user } = useContext(AuthContext);

  const handleAddTodo = async () => {
    if (!text.trim() && files.length === 0) {
      return;
    }

    try {
      setLoading(true); // Set loading to true when starting the API request

      const imgURLs = [];

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
            console.error("Image upload failed:", imgResponse.error.message);
          }
        });

        await Promise.all(uploadPromises);
      }

      const newTodo = {
        text,
        photoURL: user.photoURL,
        images: imgURLs,
        userName: user.displayName,
        email: user.email,
        timestamp: new Date().toISOString(),
        userId: user.uid,
        status: "pending",
      };

      const apiResponse = await axios.post(
        "https://userinformation.vercel.app/api/todos",
        newTodo
      );

      console.log("Post successfully:", apiResponse.data);

      setSuccessMessage("Post successfully!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 1000);

      setText("");
      setFiles([]);
    } catch (error) {
      console.error("Error adding Todo:", error);
    } finally {
      setLoading(false); // Set loading to false after the API request completes
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;
    const newFilesArray = Array.from(selectedFiles);
    setFiles([...files, ...newFilesArray]);
  };

  return (
    <Paper elevation={3} className={`facebook-style-post ${successMessage ? "success" : ""}`}>
      {user && (
        <Box p={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar src={user?.photoURL} alt="User Avatar" />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="What's on your mind?"
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
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
              </>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={handleAddTodo}
              disabled={!text.trim() && !files.length}
              startIcon={<AddIcon />}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Post"}
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  );
};

export default Task;
