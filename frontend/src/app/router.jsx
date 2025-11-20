// src/app/router.jsx
import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './routes/LandingPage';
import InventoryPage from './routes/InventoryPage';

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/inventory', element: <InventoryPage /> },
]);
