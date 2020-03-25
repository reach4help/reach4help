import { AxiosRequestConfig } from 'axios';

export const GetUsers = (request: Function) => {
  const axiosConfig: AxiosRequestConfig = {
    method: 'GET',
    url: '/users',
  };

  return request(axiosConfig).then((response: any) => response.data);
};
