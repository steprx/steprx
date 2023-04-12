import { LocalizationProvider } from "@mui/x-date-pickers";
import {
  BrowserRouter,
  createBrowserRouter,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import ErrorPage from "./errorPage";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import LandingPage from "./routes/Landing";
import Profile from "./routes/Profile";
import { create } from "zustand";
import { useUserStore } from "./Stores/UserStore";
import { useEffect } from "react";
import PrivateRoutes from "./routes/PrivateRoutes";

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Home />} path="/" exact>
              <Route element={<Dashboard />} index />
              <Route element={<Profile />} path="/profile" />
            </Route>
          </Route>
          <Route element={<LandingPage />} path="/login" />
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
};

export default App;
