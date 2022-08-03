import React, { useState, useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider.js";

import { Link } from "react-router-dom";
import { db } from "../../services/Firebase.js";
import { getDocs, collection, query, where } from "firebase/firestore";
import { employees } from "../../Firestore/employee";

import {
  Typography,
  Button,
  Box,
  Grid,
  Stack,
  Dialog,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  OutlinedInput,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import CardAddress from "../../components/CardAddress.js";
import CardEmployee from "../../components/CardEmployee.js";
import { AddEmployee } from "../../components/EmployeeForm.js";
import { AddAddress } from "../../components/AddressForm.js";

const Main = () => {
  const [dialog, setDialog] = useState(false);
  const handleOpen = () => setDialog(true);
  const handleClose = () => setDialog(false);
  const [dialog2, setDialog2] = useState(false);
  const handleOpen2 = () => setDialog2(true);
  const handleClose2 = () => setDialog2(false);
  const { currentUser } = useAuth();

  const [employees, setEmployees] = useState([]);

  const [addresses, setAddresses] = useState([]);
  const [filterAddressFK, setFilterAddressFK] = useState("all");
  const tValue = (e) => {
    setFilterAddressFK(e);
  };
  const [roles, setRoles] = useState();
  const [addressSelect, setAddressSelect] = useState([]);

  useEffect(() => {
    let isCancelled = false;
    const fetchMain = async () => {
      const snapAddresses = await getDocs(
        query(collection(db, "Addresses"), where("User_FK", "==", currentUser))
      );
      const snapRole = await getDocs(query(collection(db, "Role")));

      setAddresses(
        snapAddresses.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      setEmployees(employees);
      setAddressSelect(
        snapAddresses.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().Name,
        }))
      );
      setRoles(
        snapRole.docs.map((doc) => ({ id: doc.id, name: doc.data().Name }))
      );
    };
    fetchMain();
    return () => {
      isCancelled = true;
    };
  }, [currentUser]);

  function TextSelect({ label, select, value, currentValue }) {
    const handleChange = (e) => {
      value(e.target.value);
    };
    return (
      <FormControl sx={{ m: 1, minWidth: 180 }}>
        <InputLabel id="demo-dialog-select-label3">{label}</InputLabel>
        <Select
          defaultValue="all"
          onChange={handleChange}
          input={<OutlinedInput label={label} />}
          value={currentValue}
          size="small"
        >
          <MenuItem value="all">None</MenuItem>
          {select.map((option) => (
            <MenuItem value={option.id} key={option.id}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }

  function EmployeesGroup({ employees, AddressFK }) {
    function filterByAddressFK(item) {
      if (item.Address_FK === AddressFK || AddressFK === "all") return true;
      return false;
    }
    const employeesFiltered = employees.filter(filterByAddressFK);

    //handle empty string for find()
    function getAddressName(emp) {
      if (emp.Address_FK === "") return " ";
      return addresses.find(({ id }) => id === emp.Address_FK).Name;
    }

    return (
      <>
        {employeesFiltered.map((emp, index) => (
          <Grid item key={index} xs={12} md={6} lg={4} xl={3}>
            <CardEmployee
              ID={emp.id}
              empId={emp.Emp_ID}
              position={emp.Position}
              addressName={getAddressName(emp)}
              name={emp.Name}
              addressID={emp.Address_FK}
              roleID={emp.Role_FK}
              addresses={addressSelect}
              roles={roles}
            />
          </Grid>
        ))}
      </>
    );
  }
  return (
    <Box>
      <Grid
        className="Header"
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h4">Employees</Typography>
          <Button onClick={handleOpen} startIcon={<AddIcon />} variant="out">
            ADD NEW EMPLOYEE
          </Button>
          <Dialog open={dialog} onClose={handleClose}>
            <AddEmployee addresses={addressSelect} roles={roles} />
          </Dialog>
          <Link
            style={{ textDecoration: "none" }}
            to="/dashboard/removedEmployees"
          >
            <Button startIcon={<ListIcon />} variant="Grey">
              Remove EMPLOYEE
            </Button>
          </Link>
        </Stack>
        <Stack direction="row" alignItems="center">
          <FilterAltIcon />
          <TextSelect
            label="Filter Address"
            select={addressSelect}
            value={tValue}
            currentValue={filterAddressFK}
          ></TextSelect>
        </Stack>
      </Grid>
      <Grid
        className="Content"
        container
        justifyContent="flex-start"
        spacing={2}
      >
        <EmployeesGroup
          employees={employees}
          AddressFK={filterAddressFK}
          addresses={addresses}
        />
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="flex-start"
        className="Header"
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={1}
        >
          <Typography variant="h4">Addresses</Typography>
          <Button onClick={handleOpen2} startIcon={<AddIcon />} variant="out">
            ADD ADDRESS
          </Button>
          <Dialog open={dialog2} onClose={handleClose2}>
            <AddAddress close={handleClose2} />
          </Dialog>
        </Stack>
      </Grid>
      <Grid
        className="Content"
        container
        justifyContent="flex-start"
        spacing={2}
      >
        {addresses.map((add, index) => {
          return (
            <Grid item key={index} xs={12} md={6} lg={4} xl={3}>
              <CardAddress
                name={add.Name}
                unit={add.Unit}
                street={add.Street}
                postcode={add.Postcode}
                country={add.Country}
                ID={add.id}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Main;
