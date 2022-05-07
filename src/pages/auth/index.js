import React from "react";
import Login from "./Login.js";
import SignUp from "./SignUp.js";
import ChangeLanguage from "../../components/ChangeLanguage";
import ChangeTheme from "../../components/ChangeTheme.jsx";
import { Alert, Snackbar, SvgIcon } from "@mui/material";

function Auth() {
	const [Swap, setSwap] = React.useState(false);
	const [snack, setSnack] = React.useState(false);

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

	const handleClose = (reason) => {
		if (reason === "clickaway") {
			return;
		}

		setSnack(false);
	};

	return (
		<div className="BG-G">
			<Login
				myClick={() => {
					setSwap(true);
				}}
				swap={Swap}
			/>
			<SignUp
				myClick={() => {
					setSwap(false);
				}}
				snack={() => {
					setSnack(true);
				}}
				swap={Swap}
			/>
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
			<ChangeTheme />
		</div>
	);
}

export default Auth;
