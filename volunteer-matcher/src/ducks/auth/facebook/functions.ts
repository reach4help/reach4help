import firebase, { firebaseAuth } from 'src/firebase';

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
