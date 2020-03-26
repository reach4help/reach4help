import { AxiosRequestConfig } from 'axios';

import { IHTTPRequest } from '../HTTPRequest';

export const GetUsers = (request: IHTTPRequest) => {
  const config: AxiosRequestConfig = {
    method: 'GET',
    url: '/users',
  };

  return request.execute(config).then((response: any) => response.data);
};
