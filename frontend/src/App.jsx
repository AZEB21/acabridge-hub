import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Landing
import Landing from './pages/Landing';

// Onboarding flow
import Register from './pages/Register';
import VerifyOTP from './pages/VerifyOTP';
import ProfileSetup from './pages/ProfileSetup';
import ChooseTrack from './pages/ChooseTrack';

// Admin pages
import RegisterAdmin from './pages/RegisterAdmin';
import LoginAdmin from './pages/LoginAdmin';
import DashboardAdmin from './pages/DashboardAdmin';
import DashboardAllStudents from './pages/DashboardAllStudents';
import DashboardApplications from './pages/DashboardApplications';
import DashboardAssessment from './pages/DashboardAssessment';
import Academics from './pages/DashboardAcademics';

// Student pages
import SignIn from './pages/SignIn';
import ApplicationStatus from './pages/ApplicationStatus';
import DashboardStudent from './pages/DashboardStudent';
import MyCourses from './pages/MyCourses';
import Assignments from './pages/Assignments';
import Profile from './pages/Profile';

// Password reset flow
import ForgotPassword, { CheckEmail, ResetPassword } from './pages/ResetPassword';

const isAuthenticated = () => !!localStorage.getItem('access_token');
const isAdminAuthenticated = () => !!localStorage.getItem('admin_access_token');

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/signin" replace />;
}

function AdminPrivateRoute({ children }) {
  return isAdminAuthenticated() ? children : <Navigate to="/login-admin" replace />;
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
        <Route path="/register-admin" element={<RegisterAdmin />} />
        <Route path="/login-admin" element={<LoginAdmin />} />

        {/* Password reset flow */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/reset-password/:uid/:token" element={<ResetPassword />} />

        {/* Protected admin routes */}
        <Route
          path="/dashboard-admin"
          element={<AdminPrivateRoute><DashboardAdmin /></AdminPrivateRoute>}
        />
        <Route
          path="/dashboard-all-students"
          element={<AdminPrivateRoute><DashboardAllStudents /></AdminPrivateRoute>}
        />
        <Route
          path="/dashboard-applications"
          element={<AdminPrivateRoute><DashboardApplications /></AdminPrivateRoute>}
        />
        <Route
          path="/dashboard-assessment"
          element={<AdminPrivateRoute><DashboardAssessment /></AdminPrivateRoute>}
        />
        <Route
          path="/dashboard-academics"
          element={<AdminPrivateRoute><Academics /></AdminPrivateRoute>}
        />

        {/* Protected onboarding */}
        <Route
          path="/onboarding/profile"
          element={<PrivateRoute><ProfileSetup /></PrivateRoute>}
        />
        <Route
          path="/onboarding/track"
          element={<PrivateRoute><ChooseTrack /></PrivateRoute>}
        />

        {/* Protected student routes */}
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
