import { RouterProvider } from "react-router";
import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Tracker from "../features/tracker/Tracker";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProblemBank from "../pages/ProblemBank/ProblemBank";
import Analytics from "../pages/Analytics/Analytics";
import Login from "../pages/Auth/Login";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRoutes = () => {
  let router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: <Tracker />
            },
            {
              path: "problems",
              element: <ProblemBank />
            },
            {
              path: "analytics",
              element: <Analytics />
            }
          ]
        }
      ]
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
