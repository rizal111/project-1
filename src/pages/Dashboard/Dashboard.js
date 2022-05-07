import React, { useState } from "react";
import {
	AppBar,
	Typography,
	IconButton,
	Toolbar,
	Button,
	Box,
} from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { useAuth } from "../../provider/AuthProvider.js";
import { Route, Routes } from "react-router-dom";
import Main from "./Main.js";
import RemovedEmployees from "./RemovedEmployees.js";
import { useNavigate } from "react-router-dom";

function Dashboard() {
	//Change Page
	const [loading, setLoading] = useState(false);
	const { logout } = useAuth();
	const navigate = useNavigate();

	async function handleOut(e) {
		e.preventDefault();
		setLoading(true);
		await logout();
		navigate("/");
	}

	return (
		<Box className="BG-W" sx={{ minHeight: "100vh" }}>
			<AppBar
				position="static"
				sx={{ mb: 6.25, borderRadius: "20px", marginTop: "30px" }}
			>
				<Toolbar>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
					>
						<PeopleOutlineIcon />
					</IconButton>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Employee Management App
					</Typography>
					<Button color="inherit" onClick={handleOut} disabled={loading}>
						LogOut
					</Button>
				</Toolbar>
			</AppBar>
			<Routes>
				<Route path="/" element={<Main />} exact />
				<Route path="removedEmployees" element={<RemovedEmployees />} />
			</Routes>
		</Box>
	);
}

export default Dashboard;
