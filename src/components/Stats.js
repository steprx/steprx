import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { getInfo } from "../APIs/UserServices";
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
  const { username } = useUserStore((state) => state.currentUser);
  const stepCounts = useStepCountStore((state) => state.currentCounts);
  const weights = useWeightStore((state) => state.weights);
  const setAge = useInfoStore((state) => state.setAge);
  const age = useInfoStore((state) => state.age);
  const setBodyFat = useInfoStore((state) => state.setBodyFat);
  const bodyFat = useInfoStore((state) => state.bodyFat);
  const setGender = useInfoStore((state) => state.setGender);
  const gender = useInfoStore((state) => state.gender);
  const setHeight = useInfoStore((state) => state.setHeight);
  const height = useInfoStore((state) => state.height);
  const setNeck = useInfoStore((state) => state.setNeck);
  const neck = useInfoStore((state) => state.neck);
  const setTargetWeight = useInfoStore((state) => state.setTargetWeight);
  const targetWeight = useInfoStore((state) => state.targetWeight);
  const setWaist = useInfoStore((state) => state.setWaist);
  const waist = useInfoStore((state) => state.waist);
  const setWeight = useInfoStore((state) => state.setWeight);
  const weight = useInfoStore((state) => state.weight);
  const setInfo = (info) => {
    setAge(info.age);
    setBodyFat(info.bodyFat);
    setGender(info.sex);
    setHeight(info.heightFt);
    setNeck(info.neck);
    setTargetWeight(info.targetWeight);
    setWaist(info.waist);
    setWeight(info.weight);
  };
  useEffect(() => {
    getInfo(username).then((res) => setInfo(res));
  });
  const totalSteps = calcTotalSteps(stepCounts);
  const stepGoal = calcStepGoal(gender, weight, bodyFat, targetWeight);
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
