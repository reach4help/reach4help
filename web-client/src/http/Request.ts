import axios, { AxiosRequestConfig } from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

const request = (config: AxiosRequestConfig) => instance(config);

export default request;
