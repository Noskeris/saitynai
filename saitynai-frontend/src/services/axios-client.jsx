import axios from 'axios';
import authService from './auth';

const token = authService.getToken();

const instance = axios.create({
  // baseURL: 'https://nojus-saitynai-api.azurewebsites.net/api/',
  baseURL: 'https://localhost:7235/api/',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = await authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const newToken = await handleSessionExpired();
      if (newToken) {
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return instance(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

const handleSessionExpired = async () => {
  const newToken = await authService.renewToken();
  return newToken;
};

export default instance;