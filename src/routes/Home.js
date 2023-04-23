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
import { Link, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "../utils/auth";
import { useUserStore } from "../Stores/UserStore";
import { useStepCountStore } from "../Stores/StepCountStore";
import { useInfoStore } from "../Stores/InfoStore";
import { useWeightStore } from "../Stores/WeightStore";
import { useDialogStore } from "../Stores/DialogStore";

const Home = () => {
  const resetUser = useUserStore((state) => state.reset);
  const resetSteps = useStepCountStore((state) => state.reset);
  const resetInfo = useInfoStore((state) => state.reset);
  const resetWeight = useWeightStore((state) => state.reset);
  const resetDialogs = useDialogStore((state) => state.reset);
  const resetStores = () => {
    resetUser();
    resetSteps();
    resetInfo();
    resetWeight();
    resetDialogs();
  };
  const navigate = useNavigate();
  const attributes = useUserStore((state) => state.userAttributes);
  const userInfo = useUserStore((state) => state.userInfo);
  const uuid = useUserStore((state) => state.uuid);
  const weighIns = useUserStore((state) => state.weighIns);
  console.log(
    "attributes",
    attributes,
    "info",
    userInfo,
    "user",
    uuid,
    "weigh ins",
    weighIns
  );
  const [open, setOpen] = useState(false);
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
  const logout = async () => {
    handleClose();
    signOut().then(() => {
      resetStores();
      console.clear();
      localStorage.clear();
    });
  };

  return attributes && userInfo && uuid ? (
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
          to={`/`}
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
        <MenuItem
          onClick={() => {
            setDataOpen(true);
            handleClose();
          }}
        >
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
          onClick={async () => {
            await logout().then(() => navigate("/login"));
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
  ) : (
    <Box>
      <Typography>Loading...</Typography>
    </Box>
  );
};

export default Home;
