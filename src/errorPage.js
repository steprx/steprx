import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Box>
      <Typography variant="h1">Oops!</Typography>
      <Typography variant="body1">
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="body2">
        {error.statusText || error.message}
      </Typography>
    </Box>
  );
};

export default ErrorPage;
