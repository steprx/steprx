import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AddStepsDialog, AddWeighInDialog } from "../components/Dialogs";
import { Addchart, AddCircle, Logout, Settings } from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";
import { signOut } from "../utils/auth";
import { useUserStore } from "../Stores/UserStore";

const Home = () => {
  const [open, setOpen] = useState(false);
  const setUserSubmit = useUserStore((state) => state.setUserSubmit);
  const handleOpen = () => {
    setOpen(true);
  };
  const [dataOpen, setDataOpen] = useState(false);
  const handleDataOpen = () => {
    setDataOpen(true);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logout = () => {
    signOut().then(() => setUserSubmit(false));
  };

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
        <Typography
          component={Link}
          to={`/home`}
          align="center"
          color="#ffffff"
          variant="h5"
          sx={{ textDecoration: "none" }}
        >
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
        <MenuItem
          onClick={() => {
            handleClose();
            logout();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <AddStepsDialog open={open} handleClose={() => setOpen(false)} />
      <AddWeighInDialog
        open={dataOpen}
        handleClose={() => setDataOpen(false)}
      />
      <Outlet />
    </Box>
  );
};

export default Home;
