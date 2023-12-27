import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Admin from './pages/Admin.jsx';
import Staff from './pages/Staff.jsx';
import StaffStats from './pages/StaffStats.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminStats from './pages/AdminStats.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/staff/:staffId",
    element: <Staff />,
  },
  {
    path: "/staff-stats/:staffId",
    element: <StaffStats />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/admin-stats",
    element: <AdminStats />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
