import { Box, Typography } from "@mui/material";
import { Charts } from "../components/Charts";
import Stats from "../components/Stats";
import { useUserStore } from "../Stores/UserStore";

const Dashboard = () => {
  const userAttributes = useUserStore((state) => state.userAttributes);
  console.log(userAttributes);
  const { given_name } = userAttributes;
  return (
    <Box>
      <Typography variant="h4" align="center">
        Welcome {given_name}! Keep up the good work!
      </Typography>
      <Stats />
      <Charts />
    </Box>
  );
};

export default Dashboard;
