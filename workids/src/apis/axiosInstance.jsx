import axios from "axios";
const BASE_URL = "http://localhost:8070";

export const interceptors = (instance, token) => {
  instance.interceptors.request.use(
    (config) => {
      // const tokens = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyIiwiaWF0IjoxNjg0Mzk3NTQ4LCJleHAiOjE2ODQ0ODM5NDh9.Ikqr_qHT6RefVriFW_hKj3Q69VGKpwNm9pL_SuuRNy8';

      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error.response)
  );
  return instance;
};
const axiosApi = (url, token, options) => {
  const instance = axios.create({ baseURL: url, ...options });
  interceptors(instance, token);
  return instance;
};

export const axBase = (token) => axiosApi(BASE_URL, token);
 