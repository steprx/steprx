import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Box p={2}>
      <Typography>Sorry! Something went wrong!</Typography>
      <Button component={Link} to={`/home`}>
        Go Back Home
      </Button>
    </Box>
  );
};

export default Error;
