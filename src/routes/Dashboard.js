import { Box, Typography } from "@mui/material";
import { Charts } from "../components/Charts";
import Stats from "../components/Stats";
import { useUserStore } from "../Stores/UserStore";
import { displayMotivation } from "../utils/motivations";

const Dashboard = () => {
  const userAttributes = useUserStore((state) => state.userAttributes);
  const quote = displayMotivation();
  return !userAttributes ? (
    <Box>
      <Typography>Loading...</Typography>
    </Box>
  ) : (
    <Box>
      <Typography variant="h4" align="center" m={1}>
        Welcome {userAttributes?.given_name}! Keep up the good work!
      </Typography>
      <Typography variant="h5" align="center" m={1}>
        {quote}
      </Typography>
      <Stats />
      <Charts />
    </Box>
  );
};

export default Dashboard;
