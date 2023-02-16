import { Box } from "@mui/material";
import { Charts } from "../components/Charts";
import Stats from "../components/Stats";

const Dashboard = () => {
  return (
    <Box>
      {/* <Box
          bgcolor="#d3d3d3"
          p={1}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-around"
        >
          <Typography align="center" variant="h6">
            Hey [name goes here], here are your stats!
          </Typography>
          <Typography align="center" variant="h6">
            Keep up the good work!
          </Typography>
          <Stack direction="row" width="100%" justifyContent="space-around">
            <Stack>
              <Typography align="center" variant="subtitle2">
                Weight
              </Typography>
              <Typography align="center">{Health().weight}</Typography>
            </Stack>
            <Stack>
              <Typography align="center" variant="subtitle2">
                Height
              </Typography>
              <Typography align="center">{Health().height}</Typography>
            </Stack>
            <Stack>
              <Typography align="center" variant="subtitle2">
                Body Fat %
              </Typography>
              <Typography align="center">{Health().bodyFat}</Typography>
            </Stack>
            <Stack>
              <Typography align="center" variant="subtitle2">
                Target Weight
              </Typography>
              <Typography align="center">{Health().targetWeight}</Typography>
            </Stack>
            <Stack>
              <Typography align="center" variant="subtitle2">
                Waist
              </Typography>
              <Typography align="center">{Health().waist}</Typography>
            </Stack>
            <Stack>
              <Typography align="center" variant="subtitle2">
                Neck
              </Typography>
              <Typography align="center">{Health().neck}</Typography>
            </Stack>
          </Stack>
        </Box> */}
      <Stats />
      <Charts />
    </Box>
  );
};

export default Dashboard;
