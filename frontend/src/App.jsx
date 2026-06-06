import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Landing from './pages/Landing';

// onboarding flow
import Register from './pages/Register';
import VerifyOTP from './pages/VerifyOTP';
import ProfileSetup from './pages/ProfileSetup';
import ChooseTrack from './pages/ChooseTrack';

// admin pages
import RegisterAdmin from './pages/RegisterAdmin';
import LoginAdmin from './pages/LoginAdmin';
import DashboardAdmin from './pages/DashboardAdmin';

// student pages (team)
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import ApplicationStatus from './pages/ApplicationStatus';
import DashboardStudent from './pages/DashboardStudent';
import MyCourses from './pages/MyCourses';
import Assignments from './pages/Assignments';
import Profile from './pages/Profile';

// password reset
import ForgotPassword, { CheckEmail, ResetPassword } from './pages/ResetPassword';

const isAuthenticated = () => !!localStorage.getItem('access_token');
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

        {/* Password reset flow */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/register-admin" element={<RegisterAdmin />} />
<Route path="/login-admin" element={<LoginAdmin />} />
<Route path="/dashboard-admin" element={<DashboardAdmin />} />

<Route path="/check-email" element={<CheckEmail />} />
<Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

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
