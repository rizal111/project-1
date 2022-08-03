import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

import { useAuth } from "../../providers/AuthProvider.js";

import {
  Button,
  CardContent,
  Alert,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { Link, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Login(props) {
  const [isRemember, setIsRemember] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const { logout } = useAuth();

  const { t } = useTranslation();

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
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
        case "not verified":
          // navigate("/emailverification");
          break;
        default:
      }
    }
    setIsLoading(false);
  }

  return (
    <Box id="Register" sx={{ minWidth: 381 }}>
      <CardContent variant="front" sx={{ pb: 5 }}>
        <Typography variant="h4" color="initial">
          {t("login")}
        </Typography>
      </CardContent>
      <CardContent sx={{ py: 0 }}>
        <Stack spacing={2}>
          {error && <Alert severity="warning">{error}</Alert>}
          <Stack spacing={2}>
            <TextField type="email" label="Email" inputRef={emailRef} />
            <TextField
              type="password"
              label="Password"
              inputRef={passwordRef}
            />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              spacing={2}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    onChange={(e) => {
                      setIsRemember(e.target.checked);
                    }}
                  />
                }
                label={<Typography>Remember me</Typography>}
              />
              <Link
                component="button"
                color="secondary"
                underline="none"
                onClick={props.onRegister}
              >
                Forgot Password?
              </Link>
            </Stack>

            <Button
              variant="contained"
              type="submit"
              endIcon={<ArrowForwardIcon />}
              disabled={isLoading}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
          </Stack>
          <Typography style={{ alignItems: "center" }} variant="body2">
            Not a user?{" "}
            <Link
              component="button"
              variant=""
              color="secondary"
              underline="none"
              onClick={props.onRegister}
            >
              Register here
            </Link>
          </Typography>
        </Stack>
      </CardContent>
    </Box>
  );
}
