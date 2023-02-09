import { Box } from "@mui/material";
import { ParentDialog } from "../components/Dialogs";
import background from "../assets/background.jpg";

function App() {
  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100vw",
          minHeight: "100vh",
        }}
      />
      <ParentDialog />
    </Box>
  );
}

export default App;
