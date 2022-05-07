import React from "react";

import { createTheme } from "@mui/material/styles";
import light from "./light.js";
import dark from "./dark.js";

// https://mui.com/material-ui/customization/dark-mode/
export const getDesignTokens = (mode) => ({
	palette: {
		mode,
		...(mode === "light" ? light : dark),
	},
});

// const theme = createTheme({
// 	palette: light,
// 	typography: {
// 		fontFamily: "Exo",
// 		h2: {
// 			fontSize: 20,
// 		},
// 		h3: {
// 			fontSize: 16,
// 		},
// 		h4: {
// 			fontSize: 34,
// 		},
// 		button: {
// 			fontSize: 15,
// 		},
// 		body2: {
// 			fontFamily: "Open Sans",
// 			fontSize: 14,
// 			fontWeight: 400,
// 		},
// 		body1: {
// 			fontFamily: "Open Sans",
// 			fontSize: "16px",
// 			fontWeight: 400,
// 		},
// 		h6: {
// 			fontSize: 20,
// 			fontWeight: 500,
// 			lineHeight: "27px",
// 		},
// 		overline: {
// 			fontSize: 12,
// 			fontWeight: 400,
// 			lineHeight: "25px",
// 		},
// 	},
// 	components: {
// 		MuiButton: {
// 			variants: [
// 				{
// 					props: { variant: "out" },
// 					style: {
// 						border: `1px solid rgba(80, 212, 146, 0.5)`,
// 						color: "#50D492",
// 						borderRadius: "10px",
// 						fontSize: "15px",
// 						paddingTop: "4px",
// 						paddingBottom: "4px",
// 					},
// 				},
// 				{
// 					props: { variant: "grey" },
// 					style: {
// 						color: "#484848",
// 						fontSize: "14px",
// 					},
// 				},
// 			],
// 		},
// 		MuiCardContent: {
// 			variants: [
// 				{
// 					props: { variant: "footer" },
// 					style: {
// 						backgroundColor: "#F5F5F5",
// 						padding: "12px",
// 						paddingBottom: 0,
// 					},
// 				},
// 			],
// 		},
// 		MuiLink: {
// 			styleOverrides: {
// 				root: {
// 					fontWeight: 600,
// 				},
// 			},
// 		},
// 	},
// });

// export default theme;
