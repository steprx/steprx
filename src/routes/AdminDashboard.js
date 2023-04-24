import {
  Avatar,
  Box,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  ListItemIcon,
  Menu,
  MenuItem,
  Select,
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
import { getAllData, getAllSteps, getAllWeights } from "../APIs/AdminServices";
import ExportExcel from "../utils/excelExport";
import { calcAge } from "../utils/calculations";
import moment from "moment";

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
    signOut().then(() => {
      navigate("/login");
      resetStores();
      console.clear();
      localStorage.clear();
    });
  };
  //   const array = [{ id: 1, weight: 222 }];
  const [info, setInfo] = useState([]);
  const [steps, setSteps] = useState([]);
  const [weight, setWeight] = useState([]);
  useEffect(() => {
    let infoId = 1;
    const formatInfo = (item) => {
      const datum = {
        id: infoId,
        uuid: item.uuid?.S,
        age: calcAge(item.birthdate?.N),
        sex: item.sex?.S,
      };
      infoId++;
      return datum;
    };
    let stepId = 1;
    const formatSteps = (item) => {
      const datum = {
        id: stepId,
        uuid: item.uuid?.S,
        date: moment(Number(item.date.S)).format("l"),
        steps: item.steps?.S,
      };
      stepId++;
      return datum;
    };
    let weightId = 1;
    const formatWeight = (item) => {
      const datum = {
        id: weightId,
        uuid: item.uuid?.S,
        date: moment(Number(item.date.S)).format("l"),
        weight: item.weight?.S,
        bodyFat: item.bodyFat?.S,
        targetWeightLoss: item.targetWeightLoss?.S,
        waist: item.waist?.S,
        neck: item.neck?.S,
      };
      console.log(datum);
      weightId++;
      return datum;
    };
    const getData = async () => {
      const userInfo = await getAllData().then((res) => res.map(formatInfo));
      setInfo(userInfo);
      const stepInfo = await getAllSteps().then((res) => res.map(formatSteps));
      setSteps(stepInfo);
      const weightInfo = await getAllWeights().then((res) =>
        res.map(formatWeight)
      );
      setWeight(weightInfo);
    };
    getData();
  }, []);
  //   const array = getData().then((res) => res.map(formatData));
  //   const allData = array?.map(formatData)
  console.log(info);
  const infoColumns = [
    { field: "uuid", headerName: "UUID", width: 200 },
    { field: "age", headerName: "Age", width: 200 },
    { field: "sex", headerName: "Sex", width: 200 },
  ];
  const stepColomns = [
    { field: "uuid", headerName: "UUID", width: 200 },
    { field: "date", headerName: "Date", width: 200 },
    { field: "steps", headerName: "Steps", width: 200 },
  ];
  const weightColumns = [
    { field: "uuid", headerName: "UUID", width: 200 },
    { field: "weight", headerName: "Weight", width: 150 },
    { field: "bodyFat", headerName: "Body Fat %", width: 150 },
    {
      field: "targetWeightLoss",
      headerName: "Target Weight Loss %",
      width: 150,
    },
    { field: "waist", headerName: "Waist", width: 50 },
    { field: "neck", headerName: "Neck", width: 50 },
  ];
  const infoRows = info;
  const stepRows = steps;
  const weightRows = weight;
  const [data, setData] = useState("none");
  const [rows, setRows] = useState("none");
  const [columns, setColumns] = useState("none");
  const handleChange = (event) => {
    setData(event.target.value);
    if (event.target.value === info) {
      setRows(infoRows);
      setColumns(infoColumns);
    } else if (event.target.value === steps) {
      setRows(stepRows);
      setColumns(stepColomns);
    } else {
      setRows(weightRows);
      setColumns(weightColumns);
    }
  };
  const excel = JSON.stringify(data);
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
        <ExportExcel excelData={excel} fileName={"StepRx Data"} />
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
      <FormControl sx={{ mx: 2, mt: 2, minWidth: 100 }}>
        <InputLabel>Data</InputLabel>
        <Select
          value={data}
          onChange={handleChange}
          autoWidth
          defaultValue={data}
          size="small"
          label="Data"
        >
          <MenuItem value={info}>Info</MenuItem>
          <MenuItem value={steps}>Steps</MenuItem>
          <MenuItem value={weight}>Weight</MenuItem>
        </Select>
      </FormControl>
      <Grid container p={2}>
        <Grid item xs={12}>
          {data === "none" ? (
            <Typography>Select data to display</Typography>
          ) : (
            <DataGrid
              sx={{ height: "100%", minHeight: 500 }}
              rows={rows}
              columns={columns}
            />
          )}
        </Grid>
      </Grid>
      {/* <Outlet /> */}
    </Box>
  );
};

export default AdminDashboard;
