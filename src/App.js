import logo from "./logo.svg";
import "./App.css";
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

function App() {
  const tooltipText =
    "The research being used for this program has not yet been done to include people outside of this age range. You are more than welcome to still utilize the service, however, results may vary.";
  const ages = [];
  let x = 13;
  while (x < 100) {
    ages[x - 13] = x;
    x++;
  }
  const data = [
    { date: "01/10/23", x: 35, y: 10, z: 89248 },
    { date: "01/11/23", x: 765, y: 6, z: 829 },
    { date: "01/12/23", x: 76, y: 75, z: 9284 },
    { date: "01/13/23", x: 398, y: 33, z: 2402 },
  ];
  return (
    // <Container>
    <Box>
      <Box
        p={2}
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ backgroundColor: "primary.light" }}
      >
        <Typography align="center" color="#ffffff" variant="h5">
          Dashboard
        </Typography>
        <Avatar />
      </Box>
      <Box p={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <ResponsiveContainer width="100%" aspect={1}>
              <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Line type="monotone" dataKey="x" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12} sm={4}>
            <ResponsiveContainer width="100%" aspect={1}>
              <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Line type="monotone" dataKey="y" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12} sm={4}>
            <ResponsiveContainer width="100%" aspect={1}>
              <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Line type="monotone" dataKey="z" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12}>
            <Calendar />
          </Grid>
        </Grid>
      </Box>
      <Dialog open={false} fullWidth maxWidth="xs" minHeight="xl">
        <Box p={2}>
          <Stack justifyContent="center" spacing={2}>
            <Typography align="center" variant="h6">
              Are you between 19 and 40 years of age?
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center">
              <Button variant="contained">Yes</Button>
              <Button color="error" variant="outlined">
                No
              </Button>
            </Stack>
            <Tooltip disableFocusListener title={tooltipText}>
              <Button color="info" size="small">
                Why are you asking me this?
              </Button>
            </Tooltip>
          </Stack>
        </Box>
      </Dialog>
      <Dialog open={false} fullWidth maxWidth="xs" minHeight="xl">
        <Box p={2}>
          <Stack justifyContent="center" spacing={2}>
            <Typography align="center" variant="h6">
              Create an Account
            </Typography>
            <Stack spacing={2} justifyContent="center">
              <Input placeholder="First Name" />
              <Input placeholder="Last Name" />
              <Input placeholder="Email Address" />
              <Input placeholder="Password" />
            </Stack>
            <Stack spacing={1}>
              <Button variant="contained">Create Account</Button>
              <Button size="small">Already have an account?</Button>
            </Stack>
          </Stack>
        </Box>
      </Dialog>
      <Dialog open={false} fullWidth maxWidth="xs" minHeight="xl">
        <Box p={2}>
          <Stack justifyContent="center" spacing={2}>
            <Typography align="center" variant="h6">
              Let's get some basic info
            </Typography>
            <Stack spacing={2} justifyContent="center">
              <Stack direction="row" spacing={1}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel>Age</InputLabel>
                  <Select label="Age">
                    {ages.map((age) => (
                      <MenuItem key={age} value={age}>
                        {age}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Input placeholder="Weight (lbs)" fullWidth />
              </Stack>
              <Stack direction="row" spacing={1}>
                <Input placeholder="Height (ft)" fullWidth />
                <Input placeholder="Height (in)" fullWidth />
              </Stack>
              <Stack direction="row" spacing={1}>
                <Input placeholder="Body Fat %" fullWidth />
                <Input placeholder="Target Body Fat %" fullWidth />
              </Stack>
              <Stack direction="row" spacing={1}>
                <Input placeholder="Waist (in)" fullWidth />
                <Input placeholder="Neck (in)" fullWidth />
              </Stack>
              <FormControl variant="standard">
                <RadioGroup row>
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </Stack>
            <Button variant="contained">Submit</Button>
          </Stack>
        </Box>
      </Dialog>
    </Box>
    // </Container>
  );
}

export default App;
