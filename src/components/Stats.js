import { Box, Grid, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { useStepCountStore } from "../Stores/StepCountStore";
import { useUserStore } from "../Stores/UserStore";
import {
  calcStepGoal,
  calcTotalSteps,
  calcWeightDiff,
} from "../utils/calculations";

const Stats = () => {
  const { sub } = useUserStore((state) => state.userAttributes);
  const steps = useStepCountStore((state) => state.countsData);
  const setTotalSteps = useStepCountStore((state) => state.setTotalSteps);
  const totalSteps = useStepCountStore((state) => state.totalSteps);
  const weightLoss = useStepCountStore((state) => state.weightLoss);
  const setWeightLoss = useStepCountStore((state) => state.setWeightLoss);
  const setStepGoal = useStepCountStore((state) => state.setStepGoal);
  const stepGoal = useStepCountStore((state) => state.stepGoal);
  const userInfo = useUserStore((state) => state.userInfo);
  const weighIns = useUserStore((state) => state.weighIns);

  useEffect(() => {
    async function getData() {
      const i = weighIns?.length - 1;
      console.log(weighIns);
      console.log(i);
      console.log(weighIns?.at(i));
      const gender = userInfo?.at(i)?.sex.S;
      const weight = weighIns?.at(i)?.weight.S;
      const bodyFat = weighIns?.at(i)?.bodyFat.S;
      const targetWeightLoss = weighIns?.at(i)?.targetWeightLoss.S;
      const stepGoal = calcStepGoal(gender, weight, bodyFat, targetWeightLoss);
      const weightDiff = calcWeightDiff(
        weighIns?.at(0)?.weight.S,
        weighIns?.at(i)?.weight.S
      );
      console.log("weight lost:", weightDiff);
      console.log("step goal:", stepGoal);
      setStepGoal(stepGoal);
      setTotalSteps(calcTotalSteps(steps));
      setWeightLoss(weightDiff);
    }
    getData();
  }, []);
  console.log("post useEffect", sub);
  return !stepGoal ? (
    <Box>
      <Typography>Loading...</Typography>
    </Box>
  ) : (
    <Box m={2} p={1}>
      <Paper elevation={3} m={2}>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={4} p={1}>
            <Typography align="center" variant="h6">
              Total Steps
            </Typography>
            {!totalSteps ? (
              <Typography align="center" variant="body1">
                Add your steps to see your total step count
              </Typography>
            ) : (
              <Typography align="center" variant="h2">
                {totalSteps?.toFixed(0)}
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
              {stepGoal?.toFixed(0)}
            </Typography>
            <Typography align="center" variant="h4">
              steps
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} p={1}>
            <Typography align="center" variant="h6">
              Weight Change
            </Typography>
            {!weightLoss ? (
              <Typography align="center" variant="body1">
                No weight change yet! After your next weigh in we will display
                it here!
              </Typography>
            ) : (
              <Typography align="center" variant="h3">
                {weightLoss}
              </Typography>
            )}
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
