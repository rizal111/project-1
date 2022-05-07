import React, { useRef, useState } from "react";
import { useAuth } from "../provider/AuthProvider.js";

import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../services/Firebase.js";

import Typography from "@mui/material/Typography";
import {
	Box,
	TextField,
	Stack,
	Button,
	Card,
	CardContent,
} from "@mui/material/";

const style = {
	width: 450,
	padding: "9px",
	borderRadius: "20px",
};

const postStyle = {
	width: "114px",
};

const AddAddress = () => {
	const { currentUser } = useAuth();

	const [loading, setLoading] = useState(false);
	const name = useRef();
	const unit = useRef();
	const street = useRef();
	const postcode = useRef();
	const country = useRef();

	const handleAddAddress = async () => {
		setLoading(true);
		try {
			await addDoc(collection(db, "Addresses"), {
				Name: name.current.value,
				Country: country.current.value,
				Postcode: postcode.current.value,
				Street: street.current.value,
				Unit: unit.current.value,
				User_FK: currentUser,
			});
			setLoading(false);
			window.location.reload(true);
		} catch {
			setLoading(false);
		}
	};

	return (
		<Card sx={style}>
			<CardContent>
				<Stack spacing={2}>
					<Typography variant="h6" color="text.primary">
						Add New Address
					</Typography>
					<TextField
						type="Text"
						id="name"
						label="Address Name"
						inputRef={name}
					/>
					<TextField
						type="Text"
						id="unit"
						label="Unit/Block/Building"
						inputRef={unit}
					/>
					<TextField type="Text" id="street" label="Street" inputRef={street} />
					<Stack direction="row" spacing={2}>
						<Box>
							<TextField
								sx={postStyle}
								id="postcode"
								label="Postcode"
								inputRef={postcode}
								type="text"
							/>
						</Box>
						<TextField
							sx={{ width: "100%" }}
							id="country"
							label="Country"
							inputRef={country}
						/>
					</Stack>
					<Button
						variant="contained"
						color="primary"
						onClick={handleAddAddress}
						disabled={loading}
					>
						Save
					</Button>
				</Stack>
			</CardContent>
		</Card>
	);
};

const EditAddress = ({ ID, name, unit, street, postcode, country }) => {
	const [loading, setLoading] = useState(false);
	const nameRef = useRef();
	const unitRef = useRef();
	const streetRef = useRef();
	const postcodeRef = useRef();
	const countryRef = useRef();

	async function handleEdit() {
		setLoading(true);
		//form value | default value | database field name
		const fields = [
			[nameRef.current.value, name, "Name"],
			[unitRef.current.value, unit, "Unit"],
			[streetRef.current.value, street, "Street"],
			[postcodeRef.current.value, postcode, "Postcode"],
			[countryRef.current.value, country, "Country"],
		];
		//check changed data
		const dataToUpdate = {};
		for (let i = 0; i < fields.length; i++) {
			//Skip for textSelect undefined(default)
			if (i > 2 && fields[i][0] === undefined) continue;
			if (fields[i][0] !== fields[i][1]) {
				dataToUpdate[fields[i][2]] = fields[i][0];
			}
		}
		//nothing change
		if (Object.keys(dataToUpdate).length === 0) {
			return setLoading(false);
		}
		await updateDoc(doc(db, "Addresses", ID), dataToUpdate);
		setLoading(false);
		window.location.reload(true);
	}

	return (
		<Card sx={style}>
			<CardContent>
				<Stack spacing={2}>
					<Typography variant="h6" color="text.primary">
						Edit Address
					</Typography>
					<TextField
						type="Text"
						id="address_name"
						label="Address Name"
						inputRef={nameRef}
						defaultValue={name}
					/>
					<TextField
						type="Text"
						id="address_unit"
						label="Unit/Block/Building"
						inputRef={unitRef}
						defaultValue={unit}
					/>
					<TextField
						type="Text"
						id="address_street"
						label="Street"
						inputRef={streetRef}
						defaultValue={street}
					/>
					<Stack direction="row" spacing={2}>
						<Box>
							<TextField
								sx={postStyle}
								id="username"
								label="Postcode"
								inputRef={postcodeRef}
								defaultValue={postcode}
							/>
						</Box>
						<TextField
							sx={{ width: "100%" }}
							id="username"
							label="Country"
							defaultValue={country}
							inputRef={countryRef}
						/>
					</Stack>
					<Button
						variant="contained"
						color="primary"
						onClick={handleEdit}
						disabled={loading}
					>
						Save
					</Button>
				</Stack>
			</CardContent>
		</Card>
	);
};

export { AddAddress, EditAddress };
