import { Box, Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import background from "../assets/background.jpg";
import { ParentDialog } from "../components/Dialogs";
import { useDialogStore } from "../Stores/DialogStore";

const LandingPage = () => {
  const [open, setOpen] = useState(false);
  const setView = useDialogStore((state) => state.setCurrentView);
  const handleOpen = (button) => {
    button === "sign in" ? setView(6) : setView(1);
    setOpen(true);
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
      <Box position="absolute" p={2} right={0}>
        <Button variant="contained" onClick={() => handleOpen("sign in")}>
          Sign In
        </Button>
      </Box>
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
        <Button variant="contained" onClick={() => handleOpen("get started")}>
          Get Started
        </Button>
      </Stack>
      <ParentDialog open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
};

export default LandingPage;
