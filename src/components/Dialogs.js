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
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import {
  confirmSignUp,
  getSession,
  getUserInfo,
  signIn,
  signUp,
} from "../utils/auth";
import { useUserStore } from "../Stores/UserStore";
import { useDialogStore } from "../Stores/DialogStore";
import {
  getAllInfo,
  getAllSteps,
  putInfo,
  putSteps,
} from "../APIs/UserServices";
import { useStepCountStore } from "../Stores/StepCountStore";

export const ParentDialog = (props) => {
  const navigate = useNavigate();
  const currentUser = useUserStore((state) => state.currentUser);
  const setUser = useUserStore((state) => state.setCurrentUser);
  const setUserAttributes = useUserStore((state) => state.setUserAttributes);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const setSession = useUserStore((state) => state.setSession);
  const setCountsData = useStepCountStore((state) => state.setCountsData);
  const userAttributes = useUserStore((state) => state.userAttributes);
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
        .catch((err) => alert(err))
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
      confirmSignUp(currentUser.user.username, code)
        .catch((err) => alert(err))
        .then(() => setView(4));
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
    const today = moment().format("l");
    const { userSub } = useUserStore((state) => state.currentUser);
    const [value, setValue] = useState(moment());
    const [birthdate, setBirthdate] = useState(moment());
    const handleBirthdateChange = (newValue) => {
      setBirthdate(newValue);
      setInputs({ ...inputs, birthdate: newValue.format("l") });
    };
    const handleChange = (newValue) => {
      setValue(newValue);
      setInputs({ ...inputs, date: newValue.format("l") });
    };
    const handleRadioChange = (event) => {
      setInputs({ ...inputs, sex: event.target.value });
    };
    const [inputs, setInputs] = useState({
      birthdate: today,
      weight: null,
      heightFt: null,
      heightIn: null,
      bodyFat: null,
      targetWeightLoss: null,
      waist: null,
      neck: null,
      sex: "",
      date: today,
    });
    const handleSubmit = async () => {
      console.log(currentUser, inputs);
      await putInfo(userSub, inputs)
        .then(() =>
          getSession().then((res) => {
            localStorage.setItem("token", res);
            localStorage.setItem("access", res.getAccessToken());
            localStorage.setItem("id", res.getIdToken());
            localStorage.setItem("refresh", res.getRefreshToken());
          })
        )
        .then(() => getUserInfo(userSub).then((res) => setUserAttributes(res)))
        .then(() => getAllInfo(userSub).then((res) => setUserInfo(res)))
        .catch((err) => alert(err));
    };

    return (
      <Box p={2}>
        <Stack justifyContent="center" spacing={2}>
          <Typography align="center" variant="h6">
            Let's get some basic info
          </Typography>
          <Stack spacing={2} justifyContent="center">
            <Stack direction="row" spacing={1}>
              <DatePicker
                label="Birthdate"
                disableFuture
                value={birthdate}
                onChange={handleBirthdateChange}
                renderInput={(params) => (
                  <TextField fullWidth size="small" {...params} />
                )}
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
                label="Target Weight Loss (%)"
                variant="outlined"
                fullWidth
                required
                onChange={(event) =>
                  setInputs({ ...inputs, targetWeightLoss: event.target.value })
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
            <Stack direction="row" spacing={1}>
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
              <DatePicker
                label="Date of Visit"
                disableFuture
                value={value}
                onChange={handleChange}
                renderInput={(params) => (
                  <TextField fullWidth size="small" {...params} />
                )}
              />
            </Stack>
          </Stack>
          <Button
            component={Link}
            to={`/`}
            variant="contained"
            onClick={async () =>
              await handleSubmit(inputs).then(() => navigate("/"))
            }
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
    const authUser = async (inputs) => {
      const user = await signIn(inputs).catch((err) => alert(err));
      setUser(user);
      await getSession().then((res) => {
        localStorage.setItem("token", res);
        localStorage.setItem("access", res.getAccessToken().jwtToken);
        localStorage.setItem("id", res.getIdToken().jwtToken);
        localStorage.setItem("refresh", res.getRefreshToken().getToken());
        localStorage.setItem(
          "groups",
          res.getAccessToken().payload["cognito:groups"]
        );
      });
      getUserInfo().then((res) => setUserAttributes(res));
      getAllInfo(user.username).then((res) => setUserInfo(res));
      getAllSteps(user.username).then((res) => setCountsData(res));
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
            <Button
              variant="contained"
              onClick={async () =>
                await authUser(inputs).then(() => {
                  console.log(localStorage.getItem("groups"));
                  localStorage.getItem("groups") === "admin"
                    ? navigate("/admin")
                    : navigate("/");
                })
              }
            >
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
  const { userSub } = useUserStore((state) => state.currentUser);
  const today = moment().format("l");
  const [value, setValue] = useState(moment());
  const [inputs, setInputs] = useState({
    date: today,
    steps: 0,
  });
  const addStepCount = useStepCountStore((state) => state.addCount);
  const totalSteps = useStepCountStore((state) => state.totalSteps);
  const setTotalSteps = useStepCountStore((state) => state.setTotalSteps);
  const setCountsData = useStepCountStore((state) => state.setCountsData);
  const handleChange = (newValue) => {
    setValue(newValue);
    setInputs({ ...inputs, date: newValue.format("l") });
  };
  const handleClose = () => {
    props.handleClose(false);
  };
  const handleSubmit = async () => {
    await putSteps(userSub, inputs.date, inputs.steps)
      .then(async () => {
        const steps = await getAllSteps(userSub);
        setCountsData(steps);
        setTotalSteps(calcTotalSteps(steps));
        addStepCount(inputs);
      })
      .then(() => handleClose());
  };
  return (
    <Dialog open={props.open} fullWidth maxWidth="xs" onClose={handleClose}>
      <Box m={1} p={1}>
        <Typography align="center" variant="h6" mb={1}>
          Add Steps
        </Typography>
        <Stack spacing={1} alignItems="center">
          <Stack spacing={1} direction="row">
            <DatePicker
              label="Date"
              disableFuture
              value={value}
              onChange={handleChange}
              renderInput={(params) => (
                <TextField fullWidth size="small" {...params} />
              )}
            />
            <TextField
              size="small"
              label="Steps"
              variant="outlined"
              onChange={(event) =>
                setInputs({ ...inputs, steps: event.target.value })
              }
            />
          </Stack>
          <Stack spacing={1} direction="row">
            <Button variant="contained" onClick={() => handleSubmit()}>
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

export const AddWeighInDialog = (props) => {
  const handleClose = () => {
    props.handleClose(false);
  };
  return (
    <Dialog open={props.open} fullWidth maxWidth="xs" onClose={handleClose}>
      <Box p={2}>
        <Stack justifyContent="center" spacing={2}>
          <Typography align="center" variant="h6">
            Sign In
          </Typography>
          <Stack spacing={2} justifyContent="center">
            <TextField size="small" label="Email Address" variant="outlined" />
            <TextField size="small" label="Password" variant="outlined" />
          </Stack>
          <Stack spacing={1}>
            <Button variant="contained">Sign In</Button>
            <Button size="small">Don't have an account?</Button>
          </Stack>
        </Stack>
      </Box>
    </Dialog>
  );
};
