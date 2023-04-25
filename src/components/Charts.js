import { Grid, Typography } from "@mui/material";
import {
  Bar,
  ComposedChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useStepCountStore } from "../Stores/StepCountStore";
import { useUserStore } from "../Stores/UserStore";
import moment from "moment";

export const Charts = () => {
  const stepGoal = useStepCountStore((state) => state.stepGoal);
  const weighIns = useUserStore((state) => state.weighIns);
  const countsData = useStepCountStore((state) => state.countsData);

  const formatWeights = (item) => {
    return {
      date: moment(Number(item.date.S)).format("l"),
      weight: item.weight.S,
    };
  };
  const formatSteps = (item) => {
    return {
      date: moment(Number(item.date.S)).format("l"),
      steps: item.steps.S,
      stepGoal: stepGoal?.toFixed(0),
    };
  };
  const formatBodyFats = (item) => {
    return {
      date: moment(Number(item.date.S)).format("l"),
      bodyFat: item.bodyFat.S,
    };
  };
  const weightData = weighIns?.map(formatWeights);
  const stepsData = countsData?.map(formatSteps);
  const bodyFatData = weighIns?.map(formatBodyFats);
  console.log(stepsData);
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4}>
        <ResponsiveContainer width="100%" aspect={1}>
          <LineChart data={weightData}>
            <XAxis dataKey="date" padding={{ left: 20, right: 20 }} />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
      <Grid item xs={12} sm={4}>
        {stepsData.length !== 0 ? (
          <ResponsiveContainer width="100%" aspect={1}>
            <ComposedChart data={stepsData}>
              <XAxis dataKey="date" padding={{ left: 20, right: 20 }} />
              <YAxis domain={["auto", "auto"]} />
              <Tooltip />
              <Bar dataKey="steps" fill="#8884d8" />
              <Line dataKey="stepGoal" stroke="#808080" />
            </ComposedChart>
          </ResponsiveContainer>
        ) : (
          <Typography align="center" variant="body1">
            Add steps to see your steps visualization
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} sm={4}>
        <ResponsiveContainer width="100%" aspect={1}>
          <LineChart data={bodyFatData}>
            <XAxis dataKey="date" padding={{ left: 20, right: 20 }} />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line type="monotone" dataKey="bodyFat" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
};
