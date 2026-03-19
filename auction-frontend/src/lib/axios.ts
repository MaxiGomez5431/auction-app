import axios from 'axios';

const isServer = typeof window === 'undefined';

const baseURL = isServer
  ? 'http://backend:3001' // Docker (SSR)
  : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'; // Cliente


const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token (solo en cliente)
api.interceptors.request.use((config) => {
  if (!isServer) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Interceptor de respuestas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!isServer) {
      if (error.response?.status === 401) {
        const errorMessage = error.response?.data?.message || '';

        if (
          errorMessage.includes('token') ||
          errorMessage.includes('sesión') ||
          errorMessage.includes('autenticación') ||
          errorMessage.includes('unauthorized') ||
          errorMessage.includes('expired')
        ) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');

          if (!window.location.pathname.includes('/login')) {
            window.location.href = '/login?session=expired';
          }
        } else {
          console.log('Error de autorización:', errorMessage);
        }
      }

      if (error.response?.status === 403) {
        console.log('Acceso prohibido:', error.response?.data?.message);
      }
    }

    return Promise.reject(error);
  }
);

export default api;