import React, { FC, useRef, useState, useEffect } from "react";

import pse from "../../helpers/pse";

import PasswordMeter from "../../components/PasswordMeter";

import { Button, CardContent, Alert, Box, Popper } from "@mui/material";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { Link, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAuth } from "../../providers/AuthProvider.js";

type Props = {
  goLogin: () => void;
  snack: () => void;
  onSuccess: () => void;
};

type PasswordChecker = {
  passwordScore: number;
  suggestions: string[];
  warning: string;
};

const SignUp = ({ goLogin, snack, onSuccess }: Props) => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordChecker, setPasswordChecker] = useState<PasswordChecker>({
    passwordScore: 0,
    suggestions: [],
    warning: "",
  });
  const [popperOpen, setPopperOpen] = useState<boolean>(true);

  const passwordElementRef = useRef<any>("");

  const emailRef = useRef();
  const passwordRef = useRef<any>("");
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const { sendemailver } = useAuth();

  async function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    setLoading(true);

    if (passwordRef.current !== passwordConfirmRef.current) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      await signup(emailRef.current, passwordRef.current);
    } catch {
      setError("Failed to create an account");
      return setLoading(false);
    }

    try {
      await sendemailver();
      snack();
      onSuccess();
    } catch {
      setError("Failed to send Email Verification");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (passwordChecker.suggestions.length === 0) return setPopperOpen(false);
    setPopperOpen(true);
  }, [passwordChecker.suggestions.length]);

  return (
    <Box id="Register" sx={{ minWidth: 381 }}>
      <CardContent sx={{ pb: 5 }}>
        <Typography variant="h4" color="initial">
          Register
        </Typography>
      </CardContent>
      <CardContent sx={{ py: 0 }}>
        <Stack spacing={2}>
          {error && <Alert severity="warning">{error}</Alert>}
          <Stack spacing={2}>
            <TextField type="email" label="Email" inputRef={emailRef} />
            <TextField
              id="password"
              type="password"
              label="Password"
              ref={passwordElementRef}
              onChange={(x) => {
                setPasswordChecker({
                  passwordScore: pse(passwordRef.current?.value).score,
                  suggestions: pse(passwordRef.current?.value).feedback
                    .suggestions,
                  warning: pse(passwordRef.current?.value).feedback.warning,
                });
                console.log(pse(passwordRef.current?.value).feedback);
              }}
              inputRef={passwordRef}
            />
            <Popper
              id="suggestion"
              open={popperOpen}
              anchorEl={passwordRef.current}
              placement="right"
            >
              <Typography sx={{ p: 2 }}>
                Suggestion :
                {passwordChecker.suggestions.map((x) => (
                  <div>{x}</div>
                ))}
              </Typography>
            </Popper>
            <PasswordMeter score={passwordChecker.passwordScore} />
            {passwordChecker.warning}
            <Stack>
              <TextField
                type="password"
                label="Confirm Password"
                inputRef={passwordConfirmRef}
              />
            </Stack>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIcon />}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
          </Stack>

          <Typography variant="body2">
            Already a user?{" "}
            <Link
              component="button"
              color="secondary"
              underline="none"
              onClick={goLogin}
              disabled={loading}
            >
              Login here
            </Link>
          </Typography>
        </Stack>
      </CardContent>
    </Box>
  );
};

export default SignUp;
