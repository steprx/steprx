import { Box, Typography } from "@mui/material";
import { Charts } from "../components/Charts";
import Stats from "../components/Stats";
import { useUserStore } from "../Stores/UserStore";

const Dashboard = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const { attributes } = currentUser;
  console.log(attributes);
  const { given_name } = attributes;
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
