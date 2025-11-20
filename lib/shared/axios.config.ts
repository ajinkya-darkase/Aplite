import axios from 'axios';

const sharedApiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor to include auth token
sharedApiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
sharedApiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect if we have a token (meaning user was authenticated)
      // Don't redirect on login/auth endpoints
      const isAuthEndpoint = error.config?.url?.includes('/auth/');
      
      if (typeof window !== 'undefined' && !isAuthEndpoint) {
        const hasToken = localStorage.getItem('access_token');
        if (hasToken) {
          // Token expired or invalid - clear and redirect
          localStorage.removeItem('access_token');
          document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";
          window.location.href = '/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default sharedApiClient;