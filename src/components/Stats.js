import { Box, Grid, Paper, Typography } from "@mui/material";
import { useStepCountStore } from "../Stores/StepCountStore";
import { useWeightStore } from "../Stores/WeightStore";
import {
  calcStepGoal,
  calcTotalSteps,
  calcWeightDiff,
} from "../utils/calculations";

const Stats = () => {
  const stepCounts = useStepCountStore((state) => state.currentCounts);
  const weights = useWeightStore((state) => state.weights);
  const stepGoal = calcStepGoal();
  const totalSteps = calcTotalSteps(stepCounts);
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
