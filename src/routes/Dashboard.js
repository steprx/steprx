import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { Charts } from "../components/Charts";
import Stats from "../components/Stats";
import { useUserStore } from "../Stores/UserStore";
import { getUserInfo } from "../utils/auth";

const Dashboard = () => {
  const setUserAttributes = useUserStore((state) => state.setUserAttributes);
  const userAttributes = useUserStore((state) => state.userAttributes);
  useEffect(() => {
    getUserInfo().then((res) => setUserAttributes(res.attributes));
    console.log(userAttributes);
  }, []);

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
