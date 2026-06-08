import api from './axios';

// ── Auth ──────────────────────────────────────────────────────────────────────
export const register = (data) => api.post('/auth/register/', data);
export const verifyOTP = (email, code) => api.post('/auth/verify-otp/', { email, code });
export const resendOTP = (email) => api.post('/auth/resend-otp/', { email });
export const signIn = (email, password) => api.post('/auth/signin/', { email, password });
export const signOut = (refresh) => api.post('/auth/signout/', { refresh });
export const getMe = () => api.get('/auth/me/');

// ── Password reset ────────────────────────────────────────────────────────────
export const forgotPassword = (email) => api.post('/forgot-password/', { email });
export const resetPassword = (uid, token, password, confirm_password) =>
  api.post(`/reset-password/${uid}/${token}/`, { password, confirm_password });

// ── Application (student) ─────────────────────────────────────────────────────
export const getMyApplication = () => api.get('/application/mine/');
export const createApplication = (data) => api.post('/application/', data);

// ── Dashboard (student) ───────────────────────────────────────────────────────
export const getDashboard = () => api.get('/dashboard/');
export const getNotifications = () => api.get('/dashboard/notifications/');
export const markNotificationRead = (id) => api.patch(`/dashboard/notifications/${id}/read/`);
export const markAllNotificationsRead = () => api.patch('/dashboard/notifications/read-all/');

// ── Onboarding ────────────────────────────────────────────────────────────────
export const updateProfile = (formData) =>
  api.patch('/onboarding/profile/', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const getTracks = () => api.get('/onboarding/tracks/');
export const submitApplication = (training_track_id) =>
  api.post('/onboarding/submit/', { training_track_id });

// ── Admin auth ────────────────────────────────────────────────────────────────
export const adminLogin = (data) => api.post('/admin/login/', data);
export const adminRegister = (data) => api.post('/admin/register/', data);

// ── Admin dashboard & stats ───────────────────────────────────────────────────
export const getAdminDashboard = () => api.get('/admin/dashboard/');

// ── Admin cohort CRUD ─────────────────────────────────────────────────────────
export const getAdminCohorts = () => api.get('/admin/cohorts/');
export const createAdminCohort = (data) => api.post('/admin/cohorts/', data);
export const updateAdminCohort = (id, data) => api.patch(`/admin/cohorts/${id}/`, data);
export const deleteAdminCohort = (id) => api.delete(`/admin/cohorts/${id}/`);

// ── Admin application management ──────────────────────────────────────────────
export const getAdminApplications = (status) =>
  api.get('/admin/applications/', { params: status ? { status } : {} });
export const updateApplicationStatus = (id, status) =>
  api.patch(`/admin/applications/${id}/status/`, { status });
export const deleteApplication = (id) => api.delete(`/admin/applications/${id}/`);

// ── Superuser ─────────────────────────────────────────────────────────────────
export const getAdminUsers = () => api.get('/admin/users/');
export const approveAdminUser = (id) => api.patch(`/admin/users/${id}/`, { action: 'approve' });
export const rejectAdminUser  = (id) => api.patch(`/admin/users/${id}/`, { action: 'reject' });
export const deleteAdminUser  = (id) => api.delete(`/admin/users/${id}/`);
