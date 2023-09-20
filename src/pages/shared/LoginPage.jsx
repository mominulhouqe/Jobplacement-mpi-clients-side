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

const TransitionUp = (props) => {
  return <Slide {...props} direction="up" />;
};

const LoginPage = () => {
  const { signIn, signInGoogle } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!/(?=.*[a-z])/.test(password)) {
      // Password validation failed
      return;
    }

    try {
      await signIn(email, password);
      setShowSuccessMessage(true);
      form.reset("");
      navigate(from, { replace: true });
    } catch (error) {
      // Handle login error
    }
  };

  const handleGooglePopup = async () => {
    try {
      await signInGoogle();
      setShowSuccessMessage(true);
      navigate(from, { replace: true });
    } catch (error) {
      // Handle login error
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
        backgroundImage: `url("your-background-image-url.jpg")`, // Replace with your image URL
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "100vh", // Make sure the login form takes up the full height of the viewport
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
