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

export const facebookLoginWithFirebasePopUp = async (): Promise<firebase.auth.UserCredential> => {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebaseAuth.signInWithPopup(provider);
};

export const loginWithFirebaseRedirect = (): void => {
  const provider = new firebase.auth.FacebookAuthProvider();
  firebaseAuth.signInWithRedirect(provider);
};
export const getRedirectResult = (): Promise<firebase.auth.UserCredential> =>
  firebaseAuth.getRedirectResult();

export const observeUser = (nextValue: Function): firebase.Unsubscribe =>
  firebaseAuth.onAuthStateChanged((user: firebase.User | null) => {
    nextValue(user);
  });

// export const completeLoginWithFirebaseRedirect = (
//   payload: firebase.auth.UserCredential | { user: firebase.User },
// ): Promise<string | undefined> => payload.user;

export interface LoginResponse {
  userId: string;
  accessToken: string;
}
