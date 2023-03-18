import {
  Box,
  Button,
  Dialog,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { confirmSignUp, getUserInfo, signIn, signUp } from "../utils/auth";
import { useUserStore } from "../Stores/UserStore";
import { useDialogStore } from "../Stores/DialogStore";
import { putItem } from "../APIs/UserServices";

export const ParentDialog = (props) => {
  const currentUser = useUserStore((state) => state.currentUser);
  const setUser = useUserStore((state) => state.setCurrentUser);
  const setUserSubmit = useUserStore((state) => state.setUserSubmit);
  const handleClose = () => {
    props.handleClose(false);
  };

  const EntryDialog = (props) => {
    const handleClick = (button) => {
      button === "yes" ? setView(2) : setView(5);
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

  const SignUpDialog = (props) => {
    const time = new Date();

    const [inputs, setInputs] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      time: time.getTime(),
    });

    const createUser = (inputs) => {
      signUp(inputs)
        .then((res) => setUser(res))
        .then(() => setView(3));
    };

    return (
      <Box p={2}>
        <Stack justifyContent="center" spacing={2}>
          <Typography align="center" variant="h6">
            Create an Account
          </Typography>
          <Stack spacing={2} justifyContent="center">
            <TextField
              size="small"
              label="First Name"
              variant="outlined"
              fullWidth
              onChange={(event) =>
                setInputs({ ...inputs, firstName: event.target.value })
              }
            />
            <TextField
              size="small"
              label="Last Name"
              variant="outlined"
              fullWidth
              onChange={(event) =>
                setInputs({ ...inputs, lastName: event.target.value })
              }
            />
            <TextField
              size="small"
              label="Email Address"
              variant="outlined"
              fullWidth
              onChange={(event) =>
                setInputs({ ...inputs, email: event.target.value })
              }
            />
            <TextField
              size="small"
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
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
                createUser(inputs);
              }}
            >
              Create Account
            </Button>
            <Button size="small" onClick={() => setView(6)}>
              Already have an account?
            </Button>
          </Stack>
        </Stack>
      </Box>
    );
  };

  const ConfirmDialog = (props) => {
    const [code, setCode] = useState(null);

    const confirmUser = (code) => {
      confirmSignUp(currentUser.user.username, code).then(() => setView(4));
    };

    return (
      <Box p={2}>
        <Stack justifyContent="center" spacing={2}>
          <TextField
            size="small"
            label="Verification Code"
            variant="outlined"
            fullWidth
            onChange={(event) => setCode(event.target.value)}
          />
          <Button size="small" onClick={() => confirmUser(code)}>
            Verify Email
          </Button>
        </Stack>
      </Box>
    );
  };

  const HealthDialog = (props) => {
    const { userSub } = useUserStore((state) => state.currentUser);
    const handleRadioChange = (event) => {
      setInputs({ ...inputs, sex: event.target.value });
    };
    const [inputs, setInputs] = useState({
      age: null,
      weight: null,
      heightFt: null,
      heightIn: null,
      bodyFat: null,
      targetWeight: null,
      waist: null,
      neck: null,
      sex: "",
    });
    const handleSubmit = () => {
      console.log(userSub);
      console.log(inputs);
      putItem(userSub, inputs);
      setUserSubmit(true);
    };

    return (
      <Box p={2}>
        <Stack justifyContent="center" spacing={2}>
          <Typography align="center" variant="h6">
            Let's get some basic info
          </Typography>
          <Stack spacing={2} justifyContent="center">
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                label="Age"
                variant="outlined"
                fullWidth
                required
                onChange={(event) =>
                  setInputs({ ...inputs, age: event.target.value })
                }
              />
              <TextField
                size="small"
                label="Weight (lbs)"
                variant="outlined"
                fullWidth
                required
                onChange={(event) =>
                  setInputs({ ...inputs, weight: event.target.value })
                }
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                label="Height (ft)"
                variant="outlined"
                fullWidth
                required
                onChange={(event) =>
                  setInputs({ ...inputs, heightFt: event.target.value })
                }
              />
              <TextField
                size="small"
                label="Height (in)"
                variant="outlined"
                fullWidth
                required
                onChange={(event) =>
                  setInputs({ ...inputs, heightIn: event.target.value })
                }
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                label="Body Fat %"
                variant="outlined"
                fullWidth
                required
                onChange={(event) =>
                  setInputs({ ...inputs, bodyFat: event.target.value })
                }
              />
              <TextField
                size="small"
                label="Target Weight"
                variant="outlined"
                fullWidth
                required
                onChange={(event) =>
                  setInputs({ ...inputs, targetWeight: event.target.value })
                }
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                label="Waist (in)"
                variant="outlined"
                fullWidth
                required
                onChange={(event) =>
                  setInputs({ ...inputs, waist: event.target.value })
                }
              />
              <TextField
                size="small"
                label="Neck (in)"
                variant="outlined"
                fullWidth
                required
                onChange={(event) =>
                  setInputs({ ...inputs, neck: event.target.value })
                }
              />
            </Stack>
            <FormControl variant="standard" required>
              <RadioGroup row value={inputs.sex}>
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  onChange={handleRadioChange}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  onChange={handleRadioChange}
                />
              </RadioGroup>
            </FormControl>
          </Stack>
          <Button
            component={Link}
            to={`/`}
            variant="contained"
            onClick={() => handleSubmit(inputs)}
          >
            Submit
          </Button>
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

  const SignInDialog = () => {
    const [inputs, setInputs] = useState({
      email: "",
      password: "",
    });
    const authUser = (inputs) => {
      console.log(inputs);
      signIn(inputs)
        .then((res) => setUser(res))
        .then(() => setUserSubmit(true));
    };

    return (
      <Box p={2}>
        <Stack justifyContent="center" spacing={2}>
          <Typography align="center" variant="h6">
            Sign In
          </Typography>
          <Stack spacing={2} justifyContent="center">
            <TextField
              size="small"
              label="Email Address"
              variant="outlined"
              onChange={(event) =>
                setInputs({ ...inputs, email: event.target.value })
              }
            />
            <TextField
              size="small"
              label="Password"
              variant="outlined"
              type="password"
              onChange={(event) =>
                setInputs({ ...inputs, password: event.target.value })
              }
            />
          </Stack>
          <Stack spacing={1}>
            <Button variant="contained" onClick={() => authUser(inputs)}>
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

  const view = useDialogStore((state) => state.currentView);
  const setView = useDialogStore((state) => state.setCurrentView);
  const dialogDisplay = () => {
    switch (view) {
      case 1:
        return <EntryDialog />;
      case 2:
        return <SignUpDialog />;
      case 3:
        return <ConfirmDialog />;
      case 4:
        return <HealthDialog />;
      case 5:
        return <InfoDialog />;
      case 6:
        return <SignInDialog />;
      default:
        return <SignInDialog />;
    }
  };
  return (
    <Dialog open={props.open} onClose={handleClose} fullWidth maxWidth="xs">
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
