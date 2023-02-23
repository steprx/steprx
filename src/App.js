import { LocalizationProvider } from "@mui/x-date-pickers";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import ErrorPage from "./errorPage";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import LandingPage from "./routes/Landing";
import Profile from "./routes/Profile";
import { create } from "zustand";
import { useUserStore } from "./Stores/UserStore";

const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
]);

const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

const App = () => {
  const userSubmit = useUserStore((state) => state.userSubmit);

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <RouterProvider router={userSubmit ? mainRouter : authRouter} />
    </LocalizationProvider>
  );
};

export default App;
