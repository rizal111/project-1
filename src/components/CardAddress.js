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

import { EditAddress } from "./AddressForm.js";

const CardAddress = ({ name, postcode, country, unit, street, ID }) => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<Card sx={{ minWidth: 275, borderRadius: "20px" }}>
			<CardContent>
				<Grid
					container
					justifyContent="space-between"
					alignItems="center"
					spacing={2}
				>
					<Grid item xs={10}>
						<Typography variant="h6" color="primary.dark">
							{name}
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
							<EditAddress
								close={handleClose}
								ID={ID}
								name={name}
								unit={unit}
								street={street}
								postcode={postcode}
								country={country}
							/>
						</Dialog>
					</Grid>
				</Grid>
				<Typography variant="body1" color="text.primary">
					{unit}
				</Typography>
				<Typography variant="body1" color="text.primary">
					{street}
				</Typography>
				<Typography variant="body1" color="text.primary">
					{postcode}
				</Typography>
				<Typography variant="body1" color="text.primary">
					{country}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default CardAddress;
