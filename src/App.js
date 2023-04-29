import { LocalizationProvider } from "@mui/x-date-pickers";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import LandingPage from "./routes/Landing";
import Profile from "./routes/Profile";
import PrivateRoutes from "./routes/PrivateRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import AdminDashboard from "./routes/AdminDashboard";
import { ThemeProvider, createTheme } from "@mui/material";
import Settings from "./routes/Settings";
import Error from "./routes/Error";

const theme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <BrowserRouter>
          <Routes>
            <Route element={<AdminRoutes />}>
              <Route element={<AdminDashboard />} path="/admin" />
            </Route>
            <Route element={<PrivateRoutes />}>
              <Route element={<Home />} path="/home" exact>
                <Route element={<Dashboard />} index />
                <Route element={<Profile />} path="profile" />
                <Route element={<Settings />} path="settings" />
              </Route>
            </Route>
            <Route element={<LandingPage />} index />
            <Route element={<Error />} path="*" />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;
