import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

import { useAuth } from "../../provider/AuthProvider.js";

import { Button, CardContent, Alert } from "@mui/material";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { Link, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function Login(props) {
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
		<div>
			<Card
				id="Register"
				sx={{ minWidth: 381, borderRadius: 5 }}
				hidden={props.swap}
			>
				<CardContent variant="front" sx={{ py: 6.25 }}>
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
						<Typography variant="body2">
							Not a user?{" "}
							<Link
								component="button"
								color="secondary"
								underline="none"
								onClick={props.myClick}
							>
								Register here
							</Link>
						</Typography>
					</Stack>
				</CardContent>
			</Card>
		</div>
	);
}
