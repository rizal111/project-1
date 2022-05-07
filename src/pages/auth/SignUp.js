import React, { useRef, useState } from "react";

import { Button, CardContent, Alert } from "@mui/material";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Stack } from "@mui/material";
import { Link, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAuth } from "../../provider/AuthProvider.js";

export default function SignUp(props) {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const { signup } = useAuth();
	const { sendemailver } = useAuth();

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match");
		}

		try {
			setError("");
			setLoading(true);
			await signup(emailRef.current.value, passwordRef.current.value);
		} catch {
			setError("Failed to create an account");
		}
		try {
			await sendemailver();
			props.snack();
			props.myClick();
		} catch {
			setError("Failed to send Email Verification");
		}
		setLoading(false);
	}

	return (
		<Card
			id="Register"
			sx={{ minWidth: 381, borderRadius: 5 }}
			hidden={!props.swap}
		>
			<CardContent sx={{ py: 6.25 }}>
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
							type="password"
							label="Password"
							inputRef={passwordRef}
						/>
						<TextField
							type="password"
							label="Confirm Password"
							inputRef={passwordConfirmRef}
						/>

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
							onClick={props.myClick}
							disabled={loading}
						>
							Login here
						</Link>
					</Typography>
				</Stack>
			</CardContent>
		</Card>
	);
}
