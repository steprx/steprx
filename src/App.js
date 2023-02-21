import { LocalizationProvider } from "@mui/x-date-pickers";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import ErrorPage from "./errorPage";
import Dashboard from "./routes/Dashboard";
import Home from "./routes/Home";
import LandingPage from "./routes/Landing";
import Profile from "./routes/Profile";
import { create } from "zustand";

const useUserStore = create((set) => ({
  uuid: null,
  setUuid: (uuid) => set({ uuid }),
}));

const user = useUserStore((state) => state.uuid);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "home",
    element: <Home />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <RouterProvider router={router} />
    </LocalizationProvider>
  );
};

export default App;
