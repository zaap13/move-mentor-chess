import { Routes, Route, Navigate } from "react-router-dom";
import Courses from "../pages/Courses/Courses";
import DashBoard from "../pages/DashBoard/DashBoard";
import Lesson from "../pages/Lesson/Lesson";
import UserPage from "../pages/UserPage/UserPage";

export default function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/user/:id" element={<UserPage />} />
      <Route path="/lesson/:id" element={<Lesson />} />
      <Route path="/courses" element={<Courses />} />

      {<Route path="*" element={<Navigate to="/dashboard" />} />}
    </Routes>
  );
}
