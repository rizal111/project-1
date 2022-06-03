import React, { useState, useMemo, createContext, useContext } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { getDesignTokens } from "../theme/theme";

import type { mode } from "../theme/theme";

const [mode, setMode] = useState<mode>("light");

const colorMode = useMemo(
  () => ({
    // The dark mode switch would invoke this method
    toggleColorMode: () => {
      setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
    },
  }),
  []
);

// Update the theme only if the mode changes

export const ThemeToggle = () => {
  return colorMode.toggleColorMode;
};

export const AuthProvider = ({ children }: HTMLElement) => {
  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
