import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import {
  Bar,
  BarChart,
  ComposedChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  getAllInfo,
  getAllSteps,
  getInfo,
  getSteps,
} from "../APIs/UserServices";
import { useStepCountStore } from "../Stores/StepCountStore";
import { useUserStore } from "../Stores/UserStore";
import { DailyData } from "../utils/userOLD";

export const Charts = () => {
  const currentCounts = useStepCountStore((state) => state.currentCounts);
  const addCount = useStepCountStore((state) => state.addCount);
  const stepGoal = useStepCountStore((state) => state.stepGoal);
  const setUserInfo = useUserStore((state) => state.setUserInfo);
  const userInfo = useUserStore((state) => state.userInfo);
  const setCountsData = useStepCountStore((state) => state.setCountsData);
  const countsData = useStepCountStore((state) => state.countsData);
  const { username } = useUserStore((state) => state.currentUser);
  useEffect(() => {
    getAllInfo(username).then((res) => setUserInfo(res));
    getAllSteps(username).then((res) => setCountsData(res));
  }, []);
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
      stepGoal: stepGoal.toFixed(0),
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
        {stepsData ? (
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
