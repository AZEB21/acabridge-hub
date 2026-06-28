import axios from 'axios';

const BASE = process.env.REACT_APP_API_URL || 'https://acabridge-hub-1.onrender.com/api';

const api = axios.create({ baseURL: BASE });

// Endpoints that never need a token
const PUBLIC_ENDPOINTS = [
  '/auth/register/', '/auth/signin/', '/auth/verify-otp/', '/auth/resend-otp/',
  '/admin/login/', '/admin/register/', '/forgot-password/', '/reset-password/',
];

const isPublicUrl = (url = '') =>
  PUBLIC_ENDPOINTS.some((ep) => url.includes(ep));

// Attach JWT to every non-public request
api.interceptors.request.use((config) => {
  if (!isPublicUrl(config.url)) {
    const isAdminRoute = config.url?.includes('/admin/');
    const token = isAdminRoute
      ? (localStorage.getItem('admin_access_token') || localStorage.getItem('access_token'))
      : localStorage.getItem('access_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh on 401 — but NEVER retry public endpoints
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    // Don't retry public endpoints or already-retried requests
    if (isPublicUrl(original.url) || original._retry) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401) {
      original._retry = true;
      try {
        const isAdminRoute = original.url?.includes('/admin/');
        const refreshKey = isAdminRoute ? 'admin_refresh_token' : 'refresh_token';
        const refresh = localStorage.getItem(refreshKey);
        if (!refresh) throw new Error('No refresh token');
        const { data } = await axios.post(`${BASE}/auth/token/refresh/`, { refresh });
        const accessKey = isAdminRoute ? 'admin_access_token' : 'access_token';
        localStorage.setItem(accessKey, data.access);
        original.headers.Authorization = `Bearer ${data.access}`;
        return api(original);
      } catch {
        const isAdminRoute = original.url?.includes('/admin/');
        if (isAdminRoute) {
          localStorage.removeItem('admin_access_token');
          localStorage.removeItem('admin_refresh_token');
          localStorage.removeItem('admin_name');
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
