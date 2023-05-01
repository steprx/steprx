import { Box, Button, Stack, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Box p={2} height="80vh">
      <Stack
        spacing={2}
        justifyContent="center"
        alignItems="center"
        height="100%"
      >
        <Typography variant="h2">Oops!</Typography>
        <Typography variant="h4">Something went wrong!</Typography>
        <Button onClick={handleClick}>Go Back Home</Button>
      </Stack>
    </Box>
  );
};

export default Error;
