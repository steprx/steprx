import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AddStepsDialog, AddWeighInDialog } from "../components/Dialogs";
import { Addchart, AddCircle, Logout, Settings } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { signOut } from "../utils/auth";
import { useUserStore } from "../Stores/UserStore";
import { useStepCountStore } from "../Stores/StepCountStore";
import { useInfoStore } from "../Stores/InfoStore";
import { useWeightStore } from "../Stores/WeightStore";
import { useDialogStore } from "../Stores/DialogStore";
import { getAllData } from "../APIs/AdminServices";
import ExportExcel from "../utils/excelExport";

const AdminDashboard = () => {
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
    resetStores();
    console.clear();
    signOut().then(() => localStorage.clear());
  };
  //   const array = [{ id: 1, weight: 222 }];
  const [array, setArray] = useState([]);
  useEffect(() => {
    const formatData = (item) => {
      const datum = {
        id: item.uuid?.S,
        weight: item.weight?.S,
        bodyFat: item.bodyFat?.S,
        targetWeightLoss: item.targetWeightLoss?.S,
        waist: item.waist?.S,
        neck: item.neck?.S,
      };
      console.log(datum);
      return datum;
    };
    const getData = async () => {
      const data = await getAllData().then((res) => res.map(formatData));
      setArray(data);
    };
    getData();
  }, []);
  //   const array = getData().then((res) => res.map(formatData));
  //   const allData = array?.map(formatData)
  console.log(array);
  const columns = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "weight", headerName: "Weight", width: 150 },
    { field: "bodyFat", headerName: "Body Fat %", width: 150 },
    {
      field: "targetWeightLoss",
      headerName: "Target Weight Loss %",
      width: 150,
    },
    { field: "waist", headerName: "Waist", width: 150 },
    { field: "neck", headerName: "Neck", width: 150 },
  ];
  const rows = array;
  const excel = JSON.stringify(array);
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
        <ExportExcel excelData={excel} fileName={"Step Data"} />
        <Typography
          component={Link}
          to={`/`}
          align="center"
          color="#ffffff"
          variant="h5"
          sx={{ textDecoration: "none" }}
        >
          stepRx Admin
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
      <Grid container p={2}>
        <Grid item xs={12}>
          <DataGrid
            sx={{ height: "100%", minHeight: 500 }}
            rows={rows}
            columns={columns}
          />
        </Grid>
      </Grid>
      {/* <Outlet /> */}
    </Box>
  );
};

export default AdminDashboard;
