import { createBrowserRouter } from "react-router-dom";
import DataList from "../components/dataList";
import Dashboard from "../components/dashboard";
import NotFoundPage from "../views/NotFoundPage";
import LandingPage from "../views/LandingPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/data",
    element: <DataList />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
