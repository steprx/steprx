import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { getAllInfo, getAllSteps, getInfo } from "../APIs/UserServices";
import { useInfoStore } from "../Stores/InfoStore";
import { useStepCountStore } from "../Stores/StepCountStore";
import { useUserStore } from "../Stores/UserStore";
import { useWeightStore } from "../Stores/WeightStore";
import {
  calcStepGoal,
  calcTotalSteps,
  calcWeightDiff,
} from "../utils/calculations";

const Stats = () => {
  const { userSub } = useUserStore((state) => state.currentUser);
  const currentUser = useUserStore((state) => state.currentUser);
  console.log(userSub);
  const setTotalSteps = useStepCountStore((state) => state.setTotalSteps);
  const totalSteps = useStepCountStore((state) => state.totalSteps);
  const weights = useWeightStore((state) => state.weights);
  const userInfo = useUserStore((state) => state.userInfo);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const setStepGoal = useStepCountStore((state) => state.setStepGoal);
  getAllInfo(userSub).then((res) => setUserInfo(res));
  getAllSteps(userSub).then((res) => setTotalSteps(calcTotalSteps(res)));
  console.log("useInfo: ", userInfo);
  const gender = userInfo[0]?.sex.S;
  const weight = userInfo[0]?.weight.S;
  const bodyFat = userInfo[0]?.bodyFat.S;
  const targetWeight = userInfo[0]?.targetWeight.S;
  setStepGoal(calcStepGoal(gender, weight, bodyFat, targetWeight));
  // useEffect(() => {
  //   getAllInfo(userSub).then((res) => setUserInfo(res));
  //   getAllSteps(userSub).then((res) => setTotalSteps(calcTotalSteps(res)));
  //   console.log("useEffect: ", userInfo);
  //   const gender = userInfo[0]?.sex.S;
  //   const weight = userInfo[0]?.weight.S;
  //   const bodyFat = userInfo[0]?.bodyFat.S;
  //   const targetWeight = userInfo[0]?.targetWeight.S;
  //   setStepGoal(calcStepGoal(gender, weight, bodyFat, targetWeight));
  // }, []);
  const stepGoal = useStepCountStore((state) => state.stepGoal);
  const weightDiff = calcWeightDiff(weights);
  return (
    <Box m={2} p={1}>
      <Paper elevation={3} m={2}>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={4} p={1}>
            <Typography align="center" variant="h6">
              Total Steps
            </Typography>
            {totalSteps === 0 ? (
              <Typography align="center" variant="body1">
                Add your steps to see your total step count
              </Typography>
            ) : (
              <Typography align="center" variant="h2">
                {totalSteps.toFixed(0)}
              </Typography>
            )}
            <Typography align="center" variant="h5">
              steps
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} p={1}>
            <Typography align="center" variant="h5">
              Daily Step Goal
            </Typography>
            <Typography align="center" variant="h2">
              {stepGoal.toFixed(0)}
            </Typography>
            <Typography align="center" variant="h4">
              steps
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} p={1}>
            <Typography align="center" variant="h6">
              Weight Change
            </Typography>
            <Typography align="center" variant="body1">
              No weight change yet! After your next weigh in we will display it
              here!
            </Typography>
            {/* <Typography align="center" variant="h3">
              {weightDiff.toFixed(0)}
            </Typography> */}
            <Typography align="center" variant="h5">
              lbs
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Stats;
