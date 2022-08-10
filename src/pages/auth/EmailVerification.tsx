import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

import {
  Button,
  CardContent,
  Alert,
  Box,
  FormControlLabel,
  Checkbox,
  Snackbar,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { Link, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useAuth } from "../../providers/AuthProvider.js";
import ChangeLanguage from "../../components/ChangeLanguage";
import ChangeTheme from "../../components/ChangeTheme";

const EmailVerification = (props: any) => {
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  const { currentUserInfo, sendemailver } = useAuth();

  const { t } = useTranslation();

  async function handleSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setLoading(false);
  }

  return (
    <Box className="BG-G">
      <Box component="img" src="/image/CompanyLogo.png" sx={{ height: 75 }} />
      <Box id="Register" sx={{ minWidth: 381 }}>
        <CardContent sx={{ pb: 5 }}>
          <Typography variant="h4" color="initial">
            Please Verify Your Email
          </Typography>
        </CardContent>
        <CardContent sx={{ py: 0 }}>
          <Stack spacing={2}>
            {error && <Alert severity="warning">{error}</Alert>}
            <Typography style={{ alignItems: "center" }} variant="body2">
              You're Close to Complete! We Send an Email to
            </Typography>
            <Typography style={{ alignItems: "center" }} variant="body2">
              {currentUserInfo.email}
            </Typography>
            <Stack spacing={2}>
              <Button
                variant="contained"
                type="submit"
                disabled={isLoading}
                onClick={async () => {
                  setLoading(true);
                  sendemailver();
                  setLoading(false);
                }}
              >
                Resend Email
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Box>
      <ChangeLanguage />
      <Box sx={{ position: "absolute", top: 0, right: 0 }}>
        <ChangeTheme />
      </Box>
      {/* <Snackbar open={snack} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          icon={<SvgTick />}
          severity="success"
          sx={{ width: "100%" }}
        >
          Verification email sent.
        </Alert>
      </Snackbar> */}
    </Box>
  );
};

export default EmailVerification;
