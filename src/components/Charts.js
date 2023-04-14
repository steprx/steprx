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

export const Charts = () => {
  const stepGoal = useStepCountStore((state) => state.stepGoal);
  const userInfo = useUserStore((state) => state.userInfo);
  const countsData = useStepCountStore((state) => state.countsData);

  const formatWeights = (item) => {
    return {
      date: item.date.S,
      weight: item.weight.S,
    };
  };
  const formatSteps = (item) => {
    return {
      date: item.date.S,
      steps: item.steps.S,
      stepGoal: stepGoal?.toFixed(0),
    };
  };
  const formatBodyFats = (item) => {
    return {
      date: item.date.S,
      bodyFat: item.bodyFat.S,
    };
  };
  const weightData = userInfo?.map(formatWeights);
  const stepsData = countsData?.map(formatSteps);
  const bodyFatData = userInfo?.map(formatBodyFats);
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
              <Line type="basis" dataKey="steps" stroke="#8884d8" />
              <Line dataKey="stepGoal" stroke="#808080" />
            </ComposedChart>
            {/* <LineChart data={data}>
            <XAxis dataKey="date" padding={{ left: 20, right: 20 }} />
            <YAxis domain={["auto", "auto"]} />
            <Tooltip />
            <Line type="basis" dataKey="steps" stroke="#8884d8" />
          </LineChart> */}
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
