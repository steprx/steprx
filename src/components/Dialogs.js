import {
  Box,
  Button,
  Checkbox,
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
  getUserAttributes,
  signIn,
  signUp,
} from "../utils/auth";
import { useUserStore } from "../Stores/UserStore";
import { useDialogStore } from "../Stores/DialogStore";
import {
  getAllInfo,
  getAllSteps,
  getAllWeighIns,
  putInfo,
  putSteps,
  putWeighIn,
} from "../APIs/UserServices";
import { useStepCountStore } from "../Stores/StepCountStore";
import {
  calcStepGoal,
  calcTotalSteps,
  calcWeightDiff,
} from "../utils/calculations";

export const ParentDialog = (props) => {
  const navigate = useNavigate();
  const currentUser = useUserStore((state) => state.currentUser);
  const setUser = useUserStore((state) => state.setCurrentUser);
  const setUuid = useUserStore((state) => state.setUuid);
  const uuid = useUserStore((state) => state.uuid);
  const setUserAttributes = useUserStore((state) => state.setUserAttributes);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const setWeighIns = useUserStore((state) => state.setWeighIns);
  const setCountsData = useStepCountStore((state) => state.setCountsData);
  const setTotalSteps = useStepCountStore((state) => state.setTotalSteps);
  const handleClose = () => {
    props.handleClose(false);
  };

  const nameRegex = /^[a-zA-Z](?:[ '.\-a-zA-Z]*[a-zA-Z\'\-])?$/g;
  const emailRegex = /^\w\w*(?:(?:\.|-)?\w+)*@\w+\-?\w*(?:\.[a-z]{2,})+$/g;
  const passwordRegex =
    /^(?!\s+)(?!.*\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$^*.[\]{}()?"!@#%&\\,><':;|_~`=+\- ])[A-Za-z0-9$^*.[\]{}()?"!@#%&\\,><':;|_~`=+\- ]{8,256}$/g;
  const usernameRegex = /.+/g;
  const weightRegex =
    /^(1[5-9][0-9]|[2-9][0-9]{2}|1[0-3][0-9]{2}|1400)(\.\d{1,2})?$/g;
  const heightFtRegex = /^[4-8]$/g;
  const heightInRegex = /^([1-9]|1[0-2])$/g;
  const bodyFatRegex = /^(1[5-9]|[2-9][0-9])(\.\d{1,2})?$/g;
  const targetWeightLossRegex = /^(0*(?:[1-9]|[1-5][0-9]|60))(?:\.\d{1,2})?$/g;
  const waistRegex = /^(1[3-9]|[2-5][0-9]|6[0-5])(\.\d{1,2})?$/g;
  const neckRegex = /^(1\d|2\d|40)(\.\d{1,2})?$/g;

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
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState(null);

    const [inputs, setInputs] = useState({
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirm: "",
      time: time.getTime(),
    });

    const createUser = async (inputs) => {
      if (inputs.password === inputs.confirm) {
        const user = await signUp(inputs).catch((err) => alert(err));
        console.log(user, user.userSub, user.user);
        setUuid(user.userSub);
        setUser(user.user);
        setView(3);
      }
    };

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmError, setConfirmError] = useState(false);

    const handleCreateSubmission = () => {
      let isFirstNameValid = inputs.firstName.match(nameRegex);
      let isLastNameValid = inputs.lastName.match(nameRegex);
      let isEmailValid = inputs.email.match(emailRegex);
      let isUsernameValid = inputs.username.match(usernameRegex);
      let isPasswordValid = inputs.password.match(passwordRegex);
      let isConfirmValid = inputs.confirm.match(passwordRegex);
      let isPasswordMatched = inputs.password === inputs.confirm;

      setFirstNameError(!isFirstNameValid);
      setLastNameError(!isLastNameValid);
      setEmailError(!isEmailValid);
      setUsernameError(!isUsernameValid);
      setPasswordError(!isPasswordValid);
      setConfirmError(!isConfirmValid || !isPasswordMatched);

      if (
        isFirstNameValid &&
        isLastNameValid &&
        isEmailValid &&
        isUsernameValid &&
        isPasswordValid &&
        isConfirmValid
      ) {
        createUser(inputs);
      }
    };

    return (
      <Box p={2}>
        <Stack justifyContent="center" spacing={2}>
          <Typography align="center" variant="h6">
            Create an Account
          </Typography>
          <Stack spacing={2} justifyContent="center">
            <Stack spacing={1} direction="row">
              <TextField
                size="small"
                label="First Name"
                variant="outlined"
                fullWidth
                required
                onChange={(event) => {
                  const value = event.target.value;
                  setInputs({ ...inputs, firstName: value });
                }}
                error={firstNameError}
                helperText={firstNameError ? "Enter a valid first name" : ""}
              />
              <TextField
                size="small"
                label="Last Name"
                variant="outlined"
                fullWidth
                required
                onChange={(event) => {
                  const value = event.target.value;
                  setInputs({ ...inputs, lastName: value });
                }}
                error={lastNameError}
                helperText={lastNameError ? "Enter a valid last name" : ""}
              />
            </Stack>
            <Stack spacing={1} direction="row">
              <TextField
                size="small"
                label="Email Address"
                variant="outlined"
                fullWidth
                required
                onChange={(event) => {
                  const value = event.target.value;
                  setInputs({ ...inputs, email: value });
                }}
                error={emailError}
                helperText={emailError ? "Enter a valid email" : ""}
              />
              <TextField
                size="small"
                label="Username"
                variant="outlined"
                fullWidth
                required
                onChange={(event) => {
                  const value = event.target.value;
                  setInputs({ ...inputs, username: value });
                }}
                error={usernameError}
                helperText={usernameError ? "Enter a valid username" : ""}
              />
            </Stack>
            <Stack spacing={1} direction="row">
              <TextField
                size="small"
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                onChange={(event) => {
                  const value = event.target.value;
                  setInputs({ ...inputs, password: value });
                }}
                error={passwordError}
                helperText={passwordError ? "Enter a valid password" : ""}
              />
              <TextField
                size="small"
                label="Confirm Password"
                variant="outlined"
                type="password"
                fullWidth
                required
                onChange={(event) => {
                  const value = event.target.value;
                  setInputs({ ...inputs, confirm: value });
                }}
                error={confirmError}
                helperText={confirmError ? "Enter a valid Password" : ""}
              />
            </Stack>
          </Stack>
          <Stack spacing={1}>
            <Button variant="contained" onClick={handleCreateSubmission}>
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
      console.log(currentUser);
      confirmSignUp(currentUser?.username, code)
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
    const today = Date.parse(moment());
    const [value, setValue] = useState(moment());
    const [birthdate, setBirthdate] = useState(moment());
    const handleBirthdateChange = (newValue) => {
      setBirthdate(newValue);
      console.log(newValue);
      setInputs({ ...inputs, birthdate: Date.parse(newValue) });
    };
    const handleChange = (newValue) => {
      setValue(newValue);
      setInputs({ ...inputs, date: Date.parse(newValue) });
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
      console.log(uuid, inputs);
      await putWeighIn(uuid, inputs)
        .then(() => {
          putInfo(uuid, inputs);
          getSession().then((res) => {
            localStorage.setItem("token", res);
            localStorage.setItem("access", res.getAccessToken());
            localStorage.setItem("id", res.getIdToken());
            localStorage.setItem("refresh", res.getRefreshToken());
          });
        })
        .then(() => getUserAttributes().then((res) => setUserAttributes(res)))
        .then(() => getAllInfo(uuid).then((res) => setUserInfo(res)))
        .then(() => getAllWeighIns(uuid).then((res) => setWeighIns(res)))
        .catch((err) => alert(err));
    };

    const [weightError, setWeightError] = useState(false);
    const [heightFtError, setHeightFtError] = useState(false);
    const [heightInError, setHeightInError] = useState(false);
    const [bodyFatError, setBodyFatError] = useState(false);
    const [targetWeightLossError, setTargetWeightLossError] = useState(false);
    const [waistError, setWaistError] = useState(false);
    const [neckError, setNeckError] = useState(false);

    const handleCreateUserStats = () => {
      let isWeightValid = inputs.weight.match(weightRegex);
      let isHeightFtValid = inputs.heightFt.match(heightFtRegex);
      let isHeightInValid = inputs.heightIn.match(heightInRegex);
      let isBodyFatValid = inputs.bodyFat.match(bodyFatRegex);
      let isTargetWeightLossValid = inputs.targetWeightLoss.match(
        targetWeightLossRegex
      );
      let isWaistValid = inputs.waist.match(waistRegex);
      let isNeckValid = inputs.neck.match(neckRegex);

      setWeightError(!isWeightValid);
      setHeightFtError(!isHeightFtValid);
      setHeightInError(!isHeightInValid);
      setBodyFatError(!isBodyFatValid);
      setTargetWeightLossError(!isTargetWeightLossValid);
      setWaistError(!isWaistValid);
      setNeckError(!isNeckValid);

      if (
        isWeightValid &&
        isHeightInValid &&
        isHeightFtValid &&
        isBodyFatValid &&
        isTargetWeightLossValid &&
        isWaistValid &&
        isNeckValid
      ) {
        handleSubmit(inputs);
      }
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
                onChange={(event) => {
                  const value = event.target.value;
                  setInputs({ ...inputs, weight: value });
                }}
                error={weightError}
                helperText={weightError ? "Must be 150-1400" : ""}
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                label="Height (ft)"
                variant="outlined"
                fullWidth
                onChange={(event) => {
                  const value = event.target.value;
                  setInputs({ ...inputs, heightFt: value });
                }}
                error={heightFtError}
                helperText={heightFtError ? "Must be 4-8" : ""}
              />
              <TextField
                size="small"
                label="Height (in)"
                variant="outlined"
                fullWidth
                onChange={(event) => {
                  const value = event.target.value;
                  setInputs({ ...inputs, heightIn: value });
                }}
                error={heightInError}
                helperText={heightInError ? "Must be 1-12" : ""}
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                label="Body Fat %"
                variant="outlined"
                fullWidth
                required
                onChange={(event) => {
                  const value = event.target.value;
                  setInputs({ ...inputs, bodyFat: value });
                }}
                error={bodyFatError}
                helperText={bodyFatError ? "Must be 15-99" : ""}
              />
              <TextField
                size="small"
                label="Target Weight Loss (%)"
                variant="outlined"
                fullWidth
                required
                onChange={(event) => {
                  const value = event.target.value;
                  setInputs({ ...inputs, targetWeightLoss: value });
                }}
                error={targetWeightLossError}
                helperText={targetWeightLossError ? "Must be 1-60" : ""}
              />
            </Stack>
            <Stack direction="row" spacing={1}>
              <TextField
                size="small"
                label="Waist (in)"
                variant="outlined"
                fullWidth
                onChange={(event) => {
                  const value = event.target.value;
                  setInputs({ ...inputs, waist: value });
                }}
                error={waistError}
                helperText={waistError ? "Must be 13-65." : ""}
              />
              <TextField
                size="small"
                label="Neck (in)"
                variant="outlined"
                fullWidth
                onChange={(event) => {
                  const value = event.target.value;
                  setInputs({ ...inputs, neck: value });
                }}
                error={neckError}
                helperText={neckError ? "Must be 10-30." : ""}
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
            The research study does not include those who are outside of this
            age range at this time. You are more than welcome to still utilize
            this service; however, results may vary.
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
      setUuid(user.attributes.sub);
      console.log(user.attributes.sub);
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
      getUserAttributes().then((res) => setUserAttributes(res));
      getAllInfo(user.username).then((res) => {
        console.log(res);
        setUserInfo(res);
      });
      getAllWeighIns(user.attributes.sub).then((res) => setWeighIns(res));
      getAllSteps(user.username).then((res) => {
        console.log(res);
        setTotalSteps(calcTotalSteps(res));
        setCountsData(res);
      });
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
              label="Username or Email Address"
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
  const currentUser = useUserStore((state) => state.currentUser);
  const uuid = useUserStore((state) => state.uuid);
  const today = Date.parse(moment());
  const lastYear = moment().subtract(365, "days").calendar();
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
    console.log(Date.parse(moment()));
    console.log(moment(1681704731000).format("l"));
    setInputs({ ...inputs, date: Date.parse(newValue) });
  };
  const handleClose = () => {
    props.handleClose(false);
  };
  const handleSubmit = async () => {
    console.log(currentUser);
    await putSteps(uuid, inputs.date, inputs.steps)
      .then(async () => {
        const steps = await getAllSteps(uuid);
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
              minDate={lastYear}
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
  const today = Date.parse(moment());
  const userInfo = useUserStore((state) => state.userInfo);
  const weighIns = useUserStore((state) => state.weighIns);
  const currentUser = useUserStore((state) => state.currentUser);
  const uuid = useUserStore((state) => state.uuid);
  const setUserAttributes = useUserStore((state) => state.setUserAttributes);
  const setWeighIns = useUserStore((state) => state.setWeighIns);
  const setWeightLoss = useStepCountStore((state) => state.setWeightLoss);
  const setStepGoal = useStepCountStore((state) => state.setStepGoal);
  const navigate = useNavigate();
  const [value, setValue] = useState(moment());
  const handleChange = (newValue) => {
    setValue(newValue);
    setInputs({ ...inputs, date: Date.parse(newValue) });
  };
  const [inputs, setInputs] = useState({
    weight: null,
    heightFt: null,
    heightIn: null,
    bodyFat: null,
    targetWeightLoss: null,
    waist: null,
    neck: null,
    date: today,
  });
  const handleSubmit = async () => {
    console.log(currentUser, inputs);
    await putWeighIn(uuid, inputs)
      .then(async () => {
        await getUserAttributes(uuid).then((res) => setUserAttributes(res));
        await getAllWeighIns(uuid).then((res) => setWeighIns(res));
        const i = weighIns?.length - 1;
        const gender = userInfo?.at(i)?.sex.S;
        const weight = weighIns?.at(i)?.weight.S;
        const bodyFat = weighIns?.at(i)?.bodyFat.S;
        const targetWeightLoss = weighIns?.at(i)?.targetWeightLoss.S;
        const stepGoal = await calcStepGoal(
          gender,
          weight,
          bodyFat,
          targetWeightLoss
        );
        const weightDiff = await calcWeightDiff(
          weighIns?.at(0)?.weight.S,
          weighIns?.at(i)?.weight.S
        );
        console.log("weight lost:", weightDiff);
        console.log("step goal:", stepGoal);
        setStepGoal(stepGoal);
        setWeightLoss(weightDiff);
      })
      .catch((err) => alert(err))
      .then(() => handleClose());
  };
  const handleClose = () => {
    props.handleClose(false);
  };
  return (
    <Dialog open={props.open} fullWidth maxWidth="xs" onClose={handleClose}>
      <Box p={2}>
        <Stack justifyContent="center" spacing={2}>
          <Typography align="center" variant="h6">
            Weigh In
          </Typography>
          <Stack spacing={2} justifyContent="center">
            <Stack direction="row" spacing={1}>
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
    </Dialog>
  );
};
