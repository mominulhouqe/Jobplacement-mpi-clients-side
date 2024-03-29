import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  FormControl,
  InputAdornment,
  IconButton,
  Snackbar,
  Slide,
  Box,
} from "@mui/material";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import "./LoginForm.css";
import Swal from "sweetalert2";
import app from "../../firebase.config";
import { getAuth } from "firebase/auth";

const TransitionUp = (props) => {
  return <Slide {...props} direction="up" />;
};

const LoginPage = () => {
  const { signIn, signInGoogle } = useContext(AuthContext);

  const [passwordVisible, setPasswordVisible] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const auth = getAuth(app);
  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      await signIn(email, password);
      Swal.fire({
        icon: "success",
        title: "Login successful!",
        showConfirmButton: false,
        timer: 2000,
      });
      setShowSuccessMessage(true);
      form.reset();
      navigate(from, { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login failed",
        text: "Please check your credentials.",
      });
    }
  };

  const handleGooglePopup = async () => {
    try {
      await signInGoogle();

      // Additional logic after successful Google sign-in
      const currentUser = auth.currentUser;
      const userToCheck = {
        email: currentUser.email,
      };

      // Check if the user already exists
      const checkUserResponse = await fetch(
        `https://userinformation.vercel.app/users/${currentUser.email}`
      );

      if (checkUserResponse.ok) {
        // User already exists, navigate home
        navigate(from, { replace: true });
      } else {
        // User does not exist, proceed with creating a new user
        const saveUser = {
          name: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
        };

        // Make an API call to create a new user
        const createNewUserResponse = await fetch(
          "https://userinformation.vercel.app/users",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(saveUser),
          }
        );

        // Check the response status and handle accordingly
        if (createNewUserResponse.ok) {
          Swal.fire("You logged in successfully!", "success");
          navigate(from, { replace: true });
        } else {
          const errorMessage = await createNewUserResponse.json();
          console.error("API Error:", errorMessage);
          Swal.fire("Error!", errorMessage, "error");
        }
      }
    } catch (error) {
      let errorMessage = "Login failed. Please try again.";
      if (error.message) {
        errorMessage = error.message;
      }
      Swal.fire("Error!", errorMessage, "error");
    }
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <Container component="main" maxWidth="xs" className="my-16 mt-24">
        <CssBaseline />
        <div className="paper">
          <Typography variant="h4" component="h1" className="title">
            Login
          </Typography>
          <form onSubmit={handleLogin} className="form">
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <FormControl variant="outlined" fullWidth>
              <TextField
                variant="outlined"
                margin="normal"
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
                        className="password-toggle"
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
              className="submit-button"
            >
              Sign In
            </Button>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="secondary"
              className="google-sign-in-button"
              startIcon={<FaGoogle />}
              onClick={handleGooglePopup}
            >
              Sign In with Google
            </Button>
            <Link to="/register" className="register-link">
              New here? Register
            </Link>
          </form>
        </div>
        <Snackbar
          open={showSuccessMessage}
          onClose={handleCloseSuccessMessage}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          TransitionComponent={TransitionUp}
        >
          <div className="success-message">Login successful!</div>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default LoginPage;
