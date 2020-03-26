import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface IHTTPRequest {
  execute (config: AxiosRequestConfig): Promise<any>;
}

class HTTPRequest {
  private static instance: IHTTPRequest;

  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_BASE_URL,
    });
  }

  public static getInstance(): IHTTPRequest {
    if (!HTTPRequest.instance) {
      HTTPRequest.instance = new HTTPRequest();
    }

    return HTTPRequest.instance;
  }

  public execute(config: AxiosRequestConfig): Promise<any> {
    return this.axiosInstance(config);
  }
}

export default HTTPRequest;
