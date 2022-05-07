import React, { useState, useEffect } from "react";
import { useAuth } from "../../provider/AuthProvider.js";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../../services/Firebase.js";

import { Typography, Button, Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";

import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const RemovedEmployees = () => {
	const [removedEmp, setRemovedEmp] = useState([]);
	const { currentUser } = useAuth();

	useEffect(() => {
		async function fetchMain() {
			const snapRemovedEmp = await getDocs(
				query(
					collection(db, "Removed Employee"),
					where("User_FK", "==", currentUser)
				)
			);

			setRemovedEmp(
				snapRemovedEmp.docs.map((doc) => {
					var date = new Date(doc.data().Date.seconds * 1000);
					var humanTime = `${date.getDate()}/${
						date.getMonth() + 1
					}/${date.getFullYear()}`;

					return {
						id: doc.id,
						Date: humanTime,
						Name: doc.data().Name,
						Emp_ID: doc.data().Emp_ID,
					};
				})
			);
		}
		fetchMain();
	}, [currentUser]);

	return (
		<Box>
			<Stack
				Stack
				direction="row"
				justifyContent="flex-start"
				alignItems="center"
				spacing={2}
				className="Header"
			>
				<Link to="/dashboard" style={{ textDecoration: "none" }}>
					<Button
						variant="text"
						startIcon={<ArrowBackIcon />}
						style={{ textDecoration: "none" }}
					>
						Back
					</Button>
				</Link>
				<Typography variant="h4">Removed Employees</Typography>
			</Stack>
			<TableContainer
				TableHead
				sx={{ bgcolor: "transparent", boxShadow: "none" }}
				component={Paper}
			>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableRow>
						<TableCell sx={{ width: "200px", padding: "5px" }}>
							<Typography variant="body2" color="text.disabled">
								Employee ID
							</Typography>
						</TableCell>
						<TableCell sx={{ padding: "5px" }} align="left">
							<Typography variant="body2" color="text.disabled">
								Employee Name
							</Typography>
						</TableCell>
						<TableCell sx={{ padding: "5px" }} align="right">
							<Typography variant="body2" color="text.disabled">
								Removed Date
							</Typography>
						</TableCell>
					</TableRow>
					<TableBody>
						{removedEmp.map((row) => (
							<TableRow
								key={row.id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							>
								<TableCell
									sx={{ borderBottom: "0" }}
									component="th"
									scope="row"
									align="left"
								>
									{row.Emp_ID}
								</TableCell>
								<TableCell sx={{ borderBottom: "0" }} align="left">
									{row.Name}
								</TableCell>
								<TableCell sx={{ borderBottom: "0" }} align="right">
									{row.Date}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	);
};

export default RemovedEmployees;
