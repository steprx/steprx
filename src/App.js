import logo from "./logo.svg";
import "./App.css";
import {
  Box,
  Button,
  Container,
  Dialog,
  FormControl,
  FormControlLabel,
  FormLabel,
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

function App() {
  const tooltipText =
    "The research being used for this program has not yet been done to include people outside of this age range. You are more than welcome to still utilize the service, however, results may vary.";
  const ages = [];
  let x = 13;
  while (x < 100) {
    ages[x - 13] = x;
    x++;
  }
  return (
    <Container maxWidth="xl">
      <Box m={1}>
        <Typography>Test</Typography>
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
    </Container>
  );
}

export default App;
