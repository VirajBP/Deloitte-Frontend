import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    // Add auth token if it exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Log only relevant error information
      console.error('API Error:', {
        status: error.response.status,
        message: error.response.data?.message || 'An error occurred',
        endpoint: error.config.url
      });
    }
    return Promise.reject(error);
  }
);

export default instance; 