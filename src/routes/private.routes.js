import { Routes, Route, Navigate } from "react-router-dom";
import DashBoard from "../pages/DashBoard/DashBoard";
import UserPage from "../pages/UserPage/UserPage";

export default function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/user/:id" element={<UserPage />} />

      {<Route path="*" element={<Navigate to="/dashboard" />} />}
    </Routes>
  );
}
