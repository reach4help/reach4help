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

/*

Note: Facebook enforces HTTPS and does not allow login with insecure hosts.
When using Facebook in development mode with an http://localhost origin, you need to ensure that development mode is turned on for this Facebook App.
In addition, sign-in will only be allowed with Facebook test accounts.

*/

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
