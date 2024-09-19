import { useNavigate } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useAuth } from "../utils/AuthorizationContext";

export default function Authenticate() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [error, setError] = useState(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const authAttempted = useRef(false);

  const authenticateUser = useCallback((authCode) => {
    if (authAttempted.current) return;
    authAttempted.current = true;
    setIsAuthenticating(true);

    fetch(
      `http://localhost:8080/api/user/outbound/authentication?code=${authCode}`,
      {
        method: "POST",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data && data.data && data.data.token) {
          localStorage.setItem("token", data.data.token);
          setIsLoggedIn(true);
        } else {
          throw new Error("Token not found in response");
        }
      })
      .catch((err) => {
        console.error("Error during authentication:", err);
        setError(err.message);
      })
      .finally(() => {
        setIsAuthenticating(false);
      });
  }, [setIsLoggedIn]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authCode = params.get('code');

    if (authCode && !isLoggedIn && !isAuthenticating && !authAttempted.current) {
      authenticateUser(authCode);
    }
  }, [authenticateUser, isAuthenticating, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);
  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress></CircularProgress>
        <Typography>Authenticating...</Typography>
      </Box>
    </>
  );
}