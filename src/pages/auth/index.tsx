import React, { useEffect, useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";
import TwoFA from "./TwoFA";
import ChangeLanguage from "../../components/ChangeLanguage";
import ChangeTheme from "../../components/ChangeTheme";
import { Alert, Snackbar, SvgIcon, Box } from "@mui/material";

function Auth() {
  const [step, setStep] = useState<Number>(0);
  const [snack, setSnack] = useState<boolean | undefined>(false);

  function SvgTick() {
    return (
      <SvgIcon sx={{ color: "#4CAF50" }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </SvgIcon>
    );
  }

  const handleClose = () => {
    setSnack(false);
  };

  const Result = () => {
    if (step === 1) {
      return (
        <SignUp
          goLogin={() => {
            setStep(0);
          }}
          snack={() => {
            setSnack(true);
          }}
          onSuccess={() => {
            setStep(0);
          }}
        />
      );
    }

    return (
      <Login
        onRegister={() => {
          setStep(1);
          console.log(step);
        }}
      />
    );
  };

  return (
    <Box className="BG-G">
      <Box
        component="img"
        src="/image/CompanyLogo.png"
        sx={{ height: 75 }}
      ></Box>
      <Result />
      {/* 
      <TwoFA /> */}
      <Snackbar open={snack} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          icon={<SvgTick />}
          severity="success"
          sx={{ width: "100%" }}
        >
          Verification email sent.
        </Alert>
      </Snackbar>
      <ChangeLanguage />

      <Box sx={{ position: "absolute", top: 0, right: 0 }}>
        <ChangeTheme />
      </Box>
    </Box>
  );
}

export default Auth;
