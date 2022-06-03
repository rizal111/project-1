import React from "react";

import light from "./light.js";
import dark from "./dark.js";

// declare module "@mui/material/styles" {
//   interface Theme {
//     status: {
//       danger: string;
//     };
//   }
//   // allow configuration using `createTheme`
//   interface ThemeOptions {
//     status?: {
//       danger?: string;
//     };
//   }
// }

export type mode = "light" | "dark";

// https://mui.com/material-ui/customization/theme-components/
declare module "@mui/material/TextField" {
  interface TextFieldPropsVariantOverrides {
    dashed: true;
  }
}

// https://mui.com/material-ui/customization/dark-mode/
export const getDesignTokens = (mode: mode) => ({
  palette: {
    mode,
    ...(mode === "light" ? light : dark),
  },
  components: {
    // Name of the component
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label": {
            // set some styles for the label if need it
          },
          "& legend": {
            // set some styles for the legend if need it
          },

          // this is styles for the new variants
          "&.code": {
            "& fieldset": {},
            "& .MuiInputBase-input:hover + fieldset": {
              border: `2px solid blue`,
            },
            "& .MuiInputBase-input:focus + fieldset": {
              border: `2px solid blue`,
            },
          },
        },
      },
    },
  },
});
