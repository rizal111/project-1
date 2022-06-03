import React, { useRef, useState } from "react";
import { useAuth } from "../providers/AuthProvider.js";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  runTransaction,
  Timestamp,
} from "firebase/firestore";
import { db } from "../services/Firebase.js";
import Typography from "@mui/material/Typography";
import {
  Box,
  TextField,
  Stack,
  Grid,
  Button,
  Card,
  CardContent,
  SvgIcon,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material/";

const style = {
  width: 450,
  padding: "9px",
  borderRadius: "20px",
};

const postStyle = {
  width: "220px",
};

function TextSelect({ label, select, defaultValue, value }) {
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-dialog-select-label">{label}</InputLabel>
      <Select
        defaultValue={defaultValue}
        labelId="demo-dialog-select-label"
        onChange={(e) => value(e.target.value)}
        input={<OutlinedInput label={label} />}
      >
        {select.map((option) => (
          <MenuItem value={option.id} key={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

const AddEmployee = ({ addresses, roles }) => {
  const { currentUser } = useAuth();
  const [addressV, setAddressV] = useState();
  const [roleV, setRoleV] = useState();
  const [loading, setLoading] = useState(false);
  const name = useRef();
  const position = useRef();
  const id = useRef();

  const tValue = (e) => {
    setAddressV(e);
  };
  const tValue2 = (e) => {
    setRoleV(e);
  };

  const handleAddEmployee = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "Employees"), {
        Name: name.current.value,
        Position: position.current.value,
        Emp_ID: id.current.value,
        Address_FK: addressV || "",
        Role_FK: roleV,
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
            Add Employee
          </Typography>
          <TextField id="name" label="Employee Name" inputRef={name} />
          <Stack direction="row" spacing={2}>
            <Box sx={postStyle}>
              <TextField
                sx={postStyle}
                id="position"
                label="Current Position"
                inputRef={position}
              />
            </Box>
            <TextField
              sx={{ width: "100%" }}
              id="id"
              label="Employee ID"
              inputRef={id}
            />
          </Stack>
          <TextSelect label="Work Address" select={addresses} value={tValue} />
          <TextSelect label="Role" select={roles} value={tValue2} />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={loading}
            onClick={handleAddEmployee}
          >
            Save
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

const EditEmployee = ({
  ID,
  name,
  position,
  empId,
  addressID,
  roleID,
  addresses,
  roles,
}) => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const nameRef = useRef();
  const positionRef = useRef();
  const empIdRef = useRef();
  const [address, setAddress] = useState();
  const [role, setRole] = useState();

  const tValue = (e) => {
    setAddress(e);
  };

  const tValue2 = (e) => {
    setRole(e);
  };

  async function handleEdit() {
    setLoading(true);
    //form value | default value | database field name
    const fields = [
      [nameRef.current.value, name, "Name"],
      [positionRef.current.value, position, "Position"],
      [empIdRef.current.value, empId, "Emp_ID"],
      [address, addressID, "Address_FK"],
      [role, roleID, "Role_FK"],
    ];
    const dataToUpdate = {};
    //check changed data
    for (let i = 0; i < fields.length; i++) {
      if (i > 2 && fields[i][0] === undefined) continue;
      if (fields[i][0] !== fields[i][1]) {
        dataToUpdate[fields[i][2]] = fields[i][0];
      }
    }
    //nothing change
    if (Object.keys(dataToUpdate).length === 0) {
      return setLoading(false);
    }
    console.log(dataToUpdate);
    await updateDoc(doc(db, "Employees", ID), dataToUpdate);
    setLoading(false);
    window.location.reload(true);
  }

  async function handleDelete() {
    const sfDocRef = doc(db, "Employees", ID);
    const removedRef = collection(db, "Removed Employee");

    try {
      await runTransaction(db, async (transaction) => {
        const sfDoc = await transaction.get(sfDocRef);
        if (!sfDoc.exists()) {
          throw new Error("Document does not exist!");
        }

        await addDoc(removedRef, {
          Name: sfDoc.data().Name,
          Emp_ID: sfDoc.data().Emp_ID,
          Date: Timestamp.now(),
          User_FK: currentUser,
        });
        transaction.delete(sfDocRef);
      });
      console.log("Transaction successfully committed!");
      window.location.reload(true);
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  }
  return (
    <Card sx={style}>
      <CardContent>
        <Stack spacing={2}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography iteem variant="h6" color="text.primary">
              Edit Employee
            </Typography>
            <IconButton item onClick={handleDelete}>
              <SvgIcon color="error">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </SvgIcon>
            </IconButton>
          </Grid>
          <TextField
            id="Employee Name"
            label="Employee Name"
            inputRef={nameRef}
            defaultValue={name}
          />
          <Stack direction="row" spacing={2}>
            <Box>
              <TextField
                sx={postStyle}
                id="Position"
                label="Current Position"
                inputRef={positionRef}
                defaultValue={position}
              />
            </Box>
            <TextField
              sx={{ width: "100%" }}
              id="Employee ID"
              label="Employee ID"
              defaultValue={empId}
              inputRef={empIdRef}
            />
          </Stack>
          <TextSelect
            label="Work Address"
            defaultValue={addressID}
            value={tValue}
            select={addresses}
          />
          <TextSelect
            label="Role"
            select={roles}
            defaultValue={roleID}
            value={tValue2}
          />
          <Button
            variant="contained"
            color="primary"
            disabled={loading}
            onClick={handleEdit}
          >
            Save
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export { AddEmployee, EditEmployee };
