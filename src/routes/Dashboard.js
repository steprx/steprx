import { Box, Typography } from "@mui/material";
import { Charts } from "../components/Charts";
import Stats from "../components/Stats";
import { useUserStore } from "../Stores/UserStore";

const Dashboard = () => {
  const userAttributes = useUserStore((state) => state.userAttributes);
  return !userAttributes ? (
    <Box>
      <Typography>Loading...</Typography>
    </Box>
  ) : (
    <Box>
      <Typography variant="h4" align="center">
        Welcome {userAttributes?.given_name}! Keep up the good work!
      </Typography>
      <Stats />
      <Charts />
    </Box>
  );
};

export default Dashboard;
