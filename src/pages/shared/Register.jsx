import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Paper,
  IconButton,
  InputAdornment,
  FormControl,
} from "@mui/material";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  getAuth,
} from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import app from "../../firebase.config";
import image from '../../assets/asd.jpg'

const Register = () => {
  const auth = getAuth(app);
  const { user, signInGoogle } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    if (selectedFile) {
      try {
        const img_hosting_token = import.meta.env.VITE_Image_Upload_tokens;
        const formData = new FormData();
        formData.append("image", selectedFile);

        const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;
        const response = await fetch(img_hosting_url, {
          method: "POST",
          body: formData,
        });

        const imgResponse = await response.json();

        if (imgResponse.success) {
          const photoURL = imgResponse.data.display_url;

          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          await updateProfile(userCredential.user, {
            displayName: name,
            photoURL: photoURL,
          });

          Swal.fire("You Register Successfully!", "success");
          navigate("/login"); // Redirect to login page
        } else {
          console.error("Image upload failed:", imgResponse.error.message);
          Swal.fire("Error!", "Image upload failed.", "error");
        }
      } catch (error) {
        let errorMessage = "Registration failed. Please try again.";
        if (error.message) {
          errorMessage = error.message;
        }
        Swal.fire("Error!", errorMessage, "error");
        return;
      }
    } else {
      Swal.fire("Error!", "Please select a photo.", "error");
    }
  };

  const handleGooglePopup = async () => {
    try {
      await signInGoogle();
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";
      if (error.message) {
        errorMessage = error.message;
      }
      Swal.fire("Error!", errorMessage, "error");
      return;
    }
    Swal.fire("You Login Successfully!", "success");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Container className="my-auto " component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          className="bg-opacity-400"
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "secondary.main",
            }}
          />

          <Typography variant="h5" component="h1" sx={{ mt: 2 }}>
            Register
          </Typography>

          <form onSubmit={handleRegister} style={{ width: "100%", marginTop: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="file-input"
            />
            <label htmlFor="file-input">
              <Button
                variant="outlined"
                component="span"
                sx={{
                  mt: 2,
                  backgroundColor: "#2196F3",
                  color: "#fff",
                  '&:hover': {
                    backgroundColor: "#1976D2",
                  },
                }}
                fullWidth
              >
                Upload Photo
              </Button>
            </label>
            {selectedFile && <span>Selected file: {selectedFile.name}</span>}


            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <FormControl fullWidth variant="outlined" margin="normal">
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type={passwordVisible ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={togglePasswordVisibility}
                        edge="end"
                      >
                        {passwordVisible ? <FaEye /> : <FaEyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<FaGoogle />}
              onClick={handleGooglePopup}
            >
              Sign Up with Google
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/login" variant="body2">
                  Already have an account? Sign In
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register;
