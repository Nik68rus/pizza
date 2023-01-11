import { IUserAuthData } from './../types/user';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      'accessToken'
    )}`;
  }
  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<IUserAuthData>(
          `${process.env.REACT_APP_API_URL}/user/refresh`,
          { withCredentials: true }
        );
        localStorage.setItem('accessToken', response.data.accessToken);
        return api.request(originalRequest);
      } catch (e) {
        console.log('Пользователь не авторизован');
      }
    }
    throw error;
  }
);
