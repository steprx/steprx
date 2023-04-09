import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { getSteps } from "../APIs/UserServices";
import { Charts } from "../components/Charts";
import Stats from "../components/Stats";
import { useStepCountStore } from "../Stores/StepCountStore";
import { useUserStore } from "../Stores/UserStore";
import { getUserInfo } from "../utils/auth";

const Dashboard = () => {
  const setUserAttributes = useUserStore((state) => state.setUserAttributes);
  useEffect(() => {
    getUserInfo().then((res) => setUserAttributes(res));
  }, []);
  const userAttributes = useUserStore((state) => state.userAttributes);
  return (
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
