// src/router.jsx
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import InventoryPage from "../pages/InventoryPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/inventory",
    element: <InventoryPage />,
  },
]);

export default router;
