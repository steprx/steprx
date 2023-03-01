import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AddStepsDialog } from "../components/Dialogs";
import { Charts } from "../components/Charts";
import {
  Addchart,
  AddCircle,
  Logout,
  PersonAdd,
  Settings,
} from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";

const Root = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // let bf;
  // let bmi;
  // calcBMI = (Health()) => {
  //   Health().weight / Health().height ** 2;
  // };
  // calcBF = (Health()) => {
  //   Health().gender === "m"
  //     ? 1.2 * calcBMI() + 0.23 * Health().age - 16.2
  //     : 1.2 * calcBMI() + 0.23 * Health().age - 5.4;
  // };

  // bmi = Health().weight / Health().height ** 2;
  // bf =
  //   Health().gender === "m"
  //     ? 1.2 * bmi + 0.23 * Health().age - 16.2
  //     : 1.2 * bmi + 0.23 * Health().age - 5.4;
  return (
    <Box>
      <Box
        p={2}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ backgroundColor: "primary.light" }}
      >
        <IconButton onClick={() => handleOpen()}>
          <AddCircle sx={{ color: "#ffffff" }} />
        </IconButton>
        <Typography align="center" color="#ffffff" variant="h5">
          stepRx
        </Typography>
        <Avatar onClick={handleClick} />
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={menuOpen}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={Link} to={`profile`} onClick={handleClose}>
          <Avatar />
          <Typography mx={1}>Profile</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Addchart fontSize="small" />
          </ListItemIcon>
          Add Data
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <AddStepsDialog open={open} handleClose={() => setOpen(false)} />
      <Outlet />
    </Box>
  );
};

export default Root;
