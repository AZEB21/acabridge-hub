import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import ProfileSetup from "./pages/ProfileSetup";
import ChooseTrack from "./pages/ChooseTrack";
import SignIn from "./pages/SignIn";
import ApplicationStatus from "./pages/ApplicationStatus";
import DashboardStudent from "./pages/DashboardStudent";
import MyCourses from "./pages/MyCourses";
import Assignments from "./pages/Assignments";
import Profile from "./pages/Profile";

// Teammate's pages (Week 2)
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import ApplicationStatus from './pages/ApplicationStatus';
import DashboardStudent from './pages/DashboardStudent';
import ForgotPassword from './pages/ResetPassword';

const isAuthenticated = () => !!localStorage.getItem('access_token');
const isAuthenticated = () => !!localStorage.getItem("access_token");

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/signin" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected onboarding */}
        <Route
          path="/onboarding/profile"
          element={<PrivateRoute><ProfileSetup /></PrivateRoute>}
        />
        <Route
          path="/onboarding/track"
          element={<PrivateRoute><ChooseTrack /></PrivateRoute>}
        />

        {/* Protected app routes */}
        <Route
          path="/dashboard"
          element={<PrivateRoute><Navigate to="/dashboard/student" replace /></PrivateRoute>}
        />
        <Route
          path="/dashboard/student"
          element={<PrivateRoute><DashboardStudent /></PrivateRoute>}
        />
        <Route
          path="/courses"
          element={<PrivateRoute><MyCourses /></PrivateRoute>}
        />
        <Route
          path="/assignments"
          element={<PrivateRoute><Assignments /></PrivateRoute>}
        />
        <Route
          path="/application/status"
          element={<PrivateRoute><ApplicationStatus /></PrivateRoute>}
        />
        <Route
          path="/profile"
          element={<PrivateRoute><Profile /></PrivateRoute>}
        />
      </Routes>
    </BrowserRouter>
  );
}