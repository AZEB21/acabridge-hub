import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Your pages (onboarding flow)
import Landing from './pages/Landing';
import Register from './pages/Register';
import VerifyOTP from './pages/VerifyOTP';
import ProfileSetup from './pages/ProfileSetup';
import ChooseTrack from './pages/ChooseTrack';

// Teammate's pages (Week 2)
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import ApplicationStatus from './pages/ApplicationStatus';
import DashboardStudent from './pages/DashboardStudent';
import ForgotPassword from './pages/ResetPassword';

const isAuthenticated = () => !!localStorage.getItem('access_token');

function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/signin" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Onboarding — requires auth */}
        <Route path="/onboarding/profile" element={<PrivateRoute><ProfileSetup /></PrivateRoute>} />
        <Route path="/onboarding/track" element={<PrivateRoute><ChooseTrack /></PrivateRoute>} />

        {/* Teammate's routes — Week 2 */}
        <Route path="/applicationStatus" element={<PrivateRoute><ApplicationStatus /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/dashboardstudent" element={<PrivateRoute><DashboardStudent /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
