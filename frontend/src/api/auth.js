import api from './axios';

// Step 1 — Register
export const register = (data) =>
  api.post('/auth/register/', data);

// Step 2 — Verify OTP
export const verifyOTP = (email, code) =>
  api.post('/auth/verify-otp/', { email, code });

// Step 2 — Resend OTP
export const resendOTP = (email) =>
  api.post('/auth/resend-otp/', { email });

// Step 3 — Update profile
export const updateProfile = (formData) =>
  api.patch('/onboarding/profile/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

// Step 3 — Get profile
export const getProfile = () =>
  api.get('/onboarding/profile/');

// Step 4 — Get cohort + tracks
export const getTracks = () =>
  api.get('/onboarding/tracks/');

// Step 4 — Submit application
export const submitApplication = (training_track_id) =>
  api.post('/onboarding/submit/', { training_track_id });

// Current user
export const getMe = () =>
  api.get('/auth/me/');
