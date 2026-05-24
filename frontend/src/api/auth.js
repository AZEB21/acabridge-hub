import api from './axios';

// Auth — all live on Render
export const register = (data) => api.post('/auth/register/', data);
export const verifyOTP = (email, code) => api.post('/auth/verify-otp/', { email, code });
export const resendOTP = (email) => api.post('/auth/resend-otp/', { email });
export const signIn = (email, password) => api.post('/auth/signin/', { email, password });
export const signOut = (refresh) => api.post('/auth/signout/', { refresh });
export const getMe = () => api.get('/auth/me/');

// Application — live on Render
export const getMyApplication = () => api.get('/application/mine/');
export const createApplication = (data) => api.post('/application/', data);

// Dashboard — live on Render
export const getDashboard = () => api.get('/dashboard/');
export const getNotifications = () => api.get('/dashboard/notifications/');
export const markNotificationRead = (id) => api.patch(`/dashboard/notifications/${id}/read/`);
export const markAllNotificationsRead = () => api.patch('/dashboard/notifications/read-all/');

// Onboarding — not yet live (endpoints commented out on backend)
// These will work once your teammate uncomments them
export const updateProfile = (formData) =>
  api.patch('/onboarding/profile/', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
export const getTracks = () => api.get('/onboarding/tracks/');
export const submitApplication = (training_track_id) =>
  api.post('/onboarding/submit/', { training_track_id });
