import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import background from "../assets/background.jpg";
import { ParentDialog } from "../components/Dialogs";

const LandingPage = () => {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState(1);
  const handleOpen = (button) => {
    console.log(open);
    setOpen(true);
    console.log(open);
  };
  return (
    <Box
      height="100vh"
      sx={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100vw",
        minHeight: "100vh",
      }}
    >
      {/* <Box position="absolute" p={2} right={0}>
        <Button variant="contained" onClick={() => handleOpen(1)}>
          Sign In
        </Button>
      </Box> */}
      <Stack
        spacing={3}
        height="100%"
        justifyContent="center"
        alignItems="center"
        sx={{ bgcolor: "#ffffff80" }}
      >
        <Typography variant="h1" align="center" color="text.primary">
          Welcome to stepRx!
        </Typography>
        <Button variant="contained" onClick={() => handleOpen(1)}>
          Get Started
        </Button>
      </Stack>
      <ParentDialog
        open={open}
        handleClose={() => setOpen(false)}
        view={view}
      />
    </Box>
  );
};

export default LandingPage;
