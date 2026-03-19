import axios from 'axios';

const getBaseURL = () => {
  // SERVER (Next.js SSR dentro de Docker)
  if (typeof window === 'undefined') {
    return 'http://backend:3001';
  }

  // CLIENT (browser)
  return process.env.NEXT_PUBLIC_API_URL;
};

const api = axios.create({
  baseURL: getBaseURL(),
  headers: {
    'Content-Type': 'application/json',
  },
  proxy: false,
});

// Interceptor para agregar token (solo en cliente)
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
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
    // SOLO manejar auth en cliente
    if (typeof window !== 'undefined') {
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