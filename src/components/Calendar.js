import { Grid } from "@mui/material";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const DisplayCalendar = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Calendar />
      </Grid>
    </Grid>
  );
};
