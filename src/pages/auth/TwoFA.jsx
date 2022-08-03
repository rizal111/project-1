import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

import { useAuth } from "../../providers/AuthProvider.js";

import { Button, CardContent, Alert, Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { Link, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import CodeInput from "../../components/mono/CodeInput.tsx";

export default function TwoFA(props) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const { logout } = useAuth();

  const { t } = useTranslation();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    if (!emailRef.current.value || !passwordRef.current.value) {
      setError("Email or Password Cant be empty");
    } else {
      switch (await login(emailRef.current.value, passwordRef.current.value)) {
        case "auth/user-not-found":
          setError("User not Register yet");
          break;
        case "auth/wrong-password":
          setError("Wrong Password");
          break;
        case "verified":
          navigate("/dashboard");
          break;
        case "not":
          setError("Not Verified");
          await logout();
          break;
        default:
      }
    }
    setLoading(false);
  }

  return (
    <Box id="Register" sx={{ minWidth: 381 }} hidden={props.swap}>
      <Box component="img" src="/image/2FA.png" sx={{ height: 75 }}></Box>
      <CardContent variant="front" sx={{ pb: 6.25 }}>
        <Typography variant="h4" color="initial">
          Two-Factor Authentication
        </Typography>
      </CardContent>
      <CardContent sx={{ py: 0 }}>
        <Stack spacing={2}>
          <Stack spacing={2}>
            <CodeInput />
            <Button type="submit" disabled={loading} onClick={handleSubmit}>
              Resend
            </Button>
            <Button
              variant="contained"
              type="submit"
              endIcon={<ArrowForwardIcon />}
              disabled={loading}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Box>
  );
}
