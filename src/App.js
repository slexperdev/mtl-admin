import { createBrowserRouter, RouterProvider } from "react-router-dom";

import DepartmentView from "./Views/Department";
import EmployeesView from "./Views/Employee";
import HomeView from "./Views/Home";
import LoginView from "./Views/Login";
import ProjectView from "./Views/Project";
import TimeLogView from "./Views/Timelogs";
import IncentiveView from "./Views/Incentive";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginView />,
  },
  {
    path: "/dashboard",
    element: <HomeView />,
  },
  {
    path: "/employees",
    element: <EmployeesView />,
  },
  {
    path: "/timelogs",
    element: <TimeLogView />,
  },
  {
    path: "/projects",
    element: <ProjectView />,
  },
  {
    path: "/departments",
    element: <DepartmentView />,
  }, {
    path: "/incentive",
    element: <IncentiveView />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
