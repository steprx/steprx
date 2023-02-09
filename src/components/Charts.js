import { Grid } from "@mui/material";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { DailyData } from "../utils/user";

export const Charts = () => {
  const data = DailyData();
  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={4}>
        <ResponsiveContainer width="100%" aspect={1}>
          <LineChart data={data}>
            <XAxis dataKey="date" padding={{ left: 20, right: 20 }} />
            <YAxis domain={["auto", "auto"]} />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
      <Grid item xs={12} sm={4}>
        <ResponsiveContainer width="100%" aspect={1}>
          <LineChart data={data}>
            <XAxis dataKey="date" padding={{ left: 20, right: 20 }} />
            <YAxis domain={["auto", "auto"]} />
            <Line type="monotone" dataKey="steps" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
      <Grid item xs={12} sm={4}>
        <ResponsiveContainer width="100%" aspect={1}>
          <LineChart data={data}>
            <XAxis dataKey="date" padding={{ left: 20, right: 20 }} />
            <YAxis domain={["auto", "auto"]} />
            <Line type="monotone" dataKey="bodyFat" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </Grid>
    </Grid>
  );
};
