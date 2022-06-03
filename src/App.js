import React, { useState, useMemo, createContext, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import "./services/i18n";

import "./App.css";
import "@fontsource/open-sans";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { getDesignTokens } from "./theme/theme";

import Auth from "./pages/auth";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import ProtectedRoute from "./services/PrivateRoute";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export function useColorMode() {
  return useContext(ColorModeContext);
}

function App() {
  const [mode, setMode] = useState("light");

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

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <AuthProvider>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route
                path="/dashboard/*"
                element={<ProtectedRoute component={Dashboard} />}
              />
            </Routes>
          </Router>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AuthProvider>
  );
}

export default App;
