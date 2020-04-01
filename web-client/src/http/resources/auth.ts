import { AxiosRequestConfig } from 'axios';
import firebase, { firebaseAuth } from 'src/firebase';

import { IHTTPRequest } from '../HTTPRequest';

export const login = (request: IHTTPRequest) => {
  const config: AxiosRequestConfig = {
    method: 'POST',
    url: '/login',
  };
  return request.execute(config).then((response: any) => response.data);
};

export const facebookLoginWithFirebase = async (): Promise<firebase.auth.UserCredential> => {
  const provider = new firebase.auth.FacebookAuthProvider();
  const result = await firebaseAuth.signInWithPopup(provider);
  return result;
};

export interface LoginResponse {
  userId: string;
  accessToken: string;
}

export type UserCredential = firebase.auth.UserCredential;
