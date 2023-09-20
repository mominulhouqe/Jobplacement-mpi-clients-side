import React, { useContext, useState } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
  Container,
  Box,
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
import { Link, Navigate } from "react-router-dom";
import app from "../../firebase.config";

const Register = () => {
  const auth = getAuth(app);
  const { user, signInGoogle } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;

    // Your password validation logic here
    // For example: if (!/(?=.*[a-z])/.test(password)) { ... }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update the user's profile with name and photoURL
      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: photoURL, // Ensure that the photoURL is correctly passed here
      });
    } catch (error) {
      let errorMessage = "Registration failed. Please try again.";
      if (error.message) {
        errorMessage = error.message;
      }
      Swal.fire("Error!", errorMessage, "error");
      return;
    }

    Swal.fire("You Register Successfully!", "success");
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
        background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      }}
    >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {user && <Navigate to="/login" />} {/* Redirect if user is logged in */}
          <Avatar
            sx={{
              m: 1,
              bgcolor: "secondary.main",
            }}
          >
            {/* You can place an icon or user image here */}
          </Avatar>
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
            <TextField
              margin="normal"
              fullWidth
              id="photoURL"
              label="Photo URL"
              name="photoURL"
              autoComplete="photoURL"
            />
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
