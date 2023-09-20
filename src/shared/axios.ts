import axios, { AxiosInstance } from 'axios';
import config from '../config';

const HttpService = (baseurl: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: baseurl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  // request interceptors //

  instance.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => {
      return error;
    }
  );

  // response interceptors//
  instance.interceptors.response.use(
    (response) => {
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  //

  return instance;
};

const AuthService = HttpService(config.authServiceUrl);
const CoreService = HttpService(config.coreServiceUrl);

export { HttpService, AuthService, CoreService };
