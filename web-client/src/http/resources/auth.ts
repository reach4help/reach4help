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

export const facebookLoginWithFirebasePopUp = async (): Promise<
  string | undefined
> => {
  const provider = new firebase.auth.FacebookAuthProvider();
  const result = await firebaseAuth.signInWithPopup(provider);
  const token = await result.user?.getIdToken();
  return token;
};

export const facebookLoginWithFirebaseRedirect = (): void => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebaseAuth.signInWithRedirect(provider);
};

export const completeLoginWithFirebaseRedirect = async (
  payload: firebase.auth.UserCredential | { user: firebase.User },
): Promise<string | undefined> => {
  const token = await payload.user?.getIdToken();
  return token;
};

export interface LoginResponse {
  userId: string;
  accessToken: string;
}
