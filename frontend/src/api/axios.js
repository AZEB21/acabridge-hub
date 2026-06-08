import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'https://acabridge-hub-1.onrender.com/api',
});

// Attach JWT — prefer admin token for admin routes, student token otherwise
api.interceptors.request.use((config) => {
  const publicEndpoints = [
    '/auth/register/', '/auth/signin/', '/auth/verify-otp/', '/auth/resend-otp/',
    '/admin/login/', '/admin/register/', '/forgot-password/', '/reset-password/',
  ];
  const isPublic = publicEndpoints.some((ep) => config.url?.includes(ep));
  if (!isPublic) {
    // Use admin token for admin routes
    const isAdminRoute = config.url?.includes('/admin/');
    const token = isAdminRoute
      ? (localStorage.getItem('admin_access_token') || localStorage.getItem('access_token'))
      : localStorage.getItem('access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh on 401
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const isAdminRoute = original.url?.includes('/admin/');
        const refreshKey = isAdminRoute ? 'admin_refresh_token' : 'refresh_token';
        const refresh = localStorage.getItem(refreshKey);
        const base = process.env.REACT_APP_API_URL || 'https://acabridge-hub-1.onrender.com/api';
        const { data } = await axios.post(`${base}/auth/token/refresh/`, { refresh });
        const accessKey = isAdminRoute ? 'admin_access_token' : 'access_token';
        localStorage.setItem(accessKey, data.access);
        original.headers.Authorization = `Bearer ${data.access}`;
        return api(original);
      } catch {
        const isAdminRoute = original.url?.includes('/admin/');
        if (isAdminRoute) {
          localStorage.removeItem('admin_access_token');
          localStorage.removeItem('admin_refresh_token');
          window.location.href = '/login-admin';
        } else {
          localStorage.clear();
          window.location.href = '/signin';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
