import { Box, Grid, Paper, Typography } from "@mui/material";
import { Charts } from "./Charts";

const Stats = () => {
  return (
    <Box m={2} p={1}>
      <Paper elevation={3} m={2}>
        <Grid container alignItems="center">
          <Grid item xs={12} sm={4} p={1}>
            <Typography align="center" variant="h6">
              Total Steps
            </Typography>
            <Typography align="center" variant="h3">
              29824
            </Typography>
            <Typography align="center" variant="h5">
              steps
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} p={1}>
            <Typography align="center" variant="h5">
              Today's Step Goal
            </Typography>
            <Typography align="center" variant="h2">
              12863
            </Typography>
            <Typography align="center" variant="h4">
              steps
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4} p={1}>
            <Typography align="center" variant="h6">
              Weight Lost
            </Typography>
            <Typography align="center" variant="h3">
              3.6
            </Typography>
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
