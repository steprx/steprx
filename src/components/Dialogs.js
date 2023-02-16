import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
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
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import {
  validateEmail,
  validateName,
  validatePass,
} from "../utils/Validations";
import moment from "moment";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";

export const ParentDialog = (props) => {
  const EntryDialog = (props) => {
    const handleClick = (button) => {
      button === "yes" ? setView(2) : setView(4);
    };
    const tooltipText =
      "The research being used for this program has not yet been done to include people outside of this age range. You are more than welcome to still utilize the service, however, results may vary.";
    return (
      <Box p={2}>
        <Stack justifyContent="center" spacing={2}>
          <Typography align="center" variant="h6">
            Are you between 19 and 40 years of age?
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center">
            <Button
              variant="contained"
              onClick={() => {
                handleClick("yes");
              }}
            >
              Yes
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                handleClick("no");
              }}
            >
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
    );
  };

  const InfoDialog = (props) => {
    const handleClick = (button) => {
      button === "agree" ? setView(2) : setView(1);
    };
    return (
      <Box p={2}>
        <Stack spacing={2}>
          <Typography align="center">
            The research being used for this program has not yet been done to
            include anyone outside of this age range. You are more than welcome
            to still utilize the service, however, results may vary.
          </Typography>
          <Stack direction="row" spacing={1} justifyContent="center">
            <Button
              variant="contained"
              onClick={() => {
                handleClick("agree");
              }}
            >
              I Understand
            </Button>
            <Button
              color="error"
              variant="outlined"
              onClick={() => {
                handleClick("disagree");
              }}
            >
              Nevermind
            </Button>
          </Stack>
        </Stack>
      </Box>
    );
  };

  const SignUpDialog = (props) => {
    const [inputs, setInputs] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });

    return (
      <Box p={2}>
        <Stack justifyContent="center" spacing={2}>
          <Typography align="center" variant="h6">
            Create an Account
          </Typography>
          <Stack spacing={2} justifyContent="center">
            <Input
              placeholder="First Name"
              onChange={(event) =>
                setInputs({ ...inputs, firstName: event.target.value })
              }
            />
            <Input
              placeholder="Last Name"
              onChange={(event) =>
                setInputs({ ...inputs, lastName: event.target.value })
              }
            />
            <Input
              placeholder="Email Address"
              onChange={(event) =>
                setInputs({ ...inputs, email: event.target.value })
              }
            />
            <Input
              placeholder="Password"
              onChange={(event) =>
                setInputs({ ...inputs, password: event.target.value })
              }
            />
          </Stack>
          <Stack spacing={1}>
            <Button
              variant="contained"
              onClick={() => {
                console.log(inputs);
                // setView(3);
              }}
            >
              Create Account
            </Button>
            <Button size="small" onClick={() => setView(5)}>
              Already have an account?
            </Button>
          </Stack>
        </Stack>
      </Box>
    );
  };

  const HealthDialog = (props) => {
    const ages = [];
    let x = 13;
    while (x < 100) {
      ages[x - 13] = x;
      x++;
    }
    return (
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
              <Input placeholder="Target Weight" fullWidth />
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
          <Button component={Link} to={`home`} variant="contained">
            Submit
          </Button>
        </Stack>
      </Box>
    );
  };

  const SignInDialog = () => {
    const [inputs, setInputs] = useState({
      email: "",
      pass: "",
    });

    return (
      <Box p={2}>
        <Stack justifyContent="center" spacing={2}>
          <Typography align="center" variant="h6">
            Sign In
          </Typography>
          <Stack spacing={2} justifyContent="center">
            <Input
              placeholder="Email Address"
              onChange={(value) => setInputs({ ...inputs, email: value })}
            />
            <Input
              placeholder="Password"
              onChange={(value) => setInputs({ ...inputs, pass: value })}
            />
          </Stack>
          <Stack spacing={1}>
            <Button component={Link} to={`home`} variant="contained">
              Sign In
            </Button>
            <Button size="small" onClick={() => setView(2)}>
              Don't have an account?
            </Button>
          </Stack>
        </Stack>
      </Box>
    );
  };

  const [view, setView] = useState(props.view);
  const dialogDisplay = () => {
    switch (view) {
      case 1:
        return <EntryDialog />;
      case 2:
        return <SignUpDialog />;
      case 3:
        return <HealthDialog />;
      case 4:
        return <InfoDialog />;
      case 5:
        return <SignInDialog />;
      default:
        return <SignInDialog />;
    }
  };
  return (
    <Dialog open={props.open} fullWidth maxWidth="xs">
      {/* <EntryDialog /> */}
      {dialogDisplay()}
    </Dialog>
  );
};

export const AddStepsDialog = (props) => {
  const [value, setValue] = useState(moment());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    props.handleClose(false);
  };

  return (
    <Dialog open={props.open} fullWidth maxWidth="xs" onClose={handleClose}>
      <Box m={1} p={1}>
        <Typography align="center" variant="h6" mb={1}>
          Add Steps
        </Typography>
        <Stack spacing={1} alignItems="center">
          <Stack spacing={1} direction="row">
            <DesktopDatePicker
              label="Date"
              inputFormat="MM/DD/YYYY"
              value={value}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
            <TextField size="small" label="Steps" variant="outlined" />
          </Stack>
          <Stack spacing={1} direction="row">
            <Button variant="contained" onClick={() => handleClose()}>
              Submit
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
};
