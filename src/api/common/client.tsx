import { Env } from '@env';
import type { InternalAxiosRequestConfig } from 'axios';
import axios from 'axios';

import { getToken } from '@/core/auth/utils';

async function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const client = axios.create({
  baseURL: Env.API_URL,
});

client.interceptors.request.use(authRequestInterceptor);
client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
