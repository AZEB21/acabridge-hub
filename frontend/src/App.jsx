import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import ProfileSetup from "./pages/ProfileSetup";
import ChooseTrack from "./pages/ChooseTrack";
import SignIn from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import ApplicationStatus from "./pages/ApplicationStatus";
import Profile from "./pages/Profile";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/onboarding/profile" element={<ProfileSetup />} />
        <Route path="/onboarding/track" element={<ChooseTrack />} />
        <Route path="/application/status" element={<ApplicationStatus />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
