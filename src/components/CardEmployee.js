import React from "react";
import Typography from "@mui/material/Typography";
import {
	Grid,
	Card,
	CardContent,
	SvgIcon,
	IconButton,
	Dialog,
} from "@mui/material/";
import { EditEmployee } from "./EmployeeForm.js";

const CardEmployee = ({
	ID,
	empId,
	name,
	position,
	addressName,
	addressID,
	roleID,
	addresses,
	roles,
}) => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Card sx={{ minWidth: 275, borderRadius: "20px" }}>
			<CardContent>
				<Grid container justifyContent="space-between" spacing={2}>
					<Grid item xs={10}>
						<Typography variant="overline" color="text.grey">
							#{empId}
						</Typography>
						<Typography variant="h6" color="primary.dark">
							{name}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{position}
						</Typography>
					</Grid>
					<Grid item>
						<IconButton onClick={handleOpen}>
							<SvgIcon sx={{ color: "rgba(0, 0, 0, 0.54)" }}>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
									<path d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
								</svg>
							</SvgIcon>
						</IconButton>
						<Dialog open={open} onClose={handleClose}>
							<EditEmployee
								ID={ID}
								name={name}
								empId={empId}
								position={position}
								addresses={addresses}
								roles={roles}
								addressID={addressID}
								roleID={roleID}
							/>
						</Dialog>
					</Grid>
				</Grid>
			</CardContent>
			<CardContent
				sx={{
					"&:last-child": {
						paddingBottom: "16px",
					},
				}}
				variant="footer"
			>
				<Typography variant="body1" color="text.grey600">
					{addressName}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default CardEmployee;
