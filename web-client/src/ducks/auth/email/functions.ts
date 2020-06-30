import firebase, { firebaseAuth } from 'src/firebase';

export const emailLoginWithFirebasePopUp = async (): Promise<firebase.auth.UserCredential> => {
  const provider = new firebase.auth.EmailAuthProvider();
  return firebaseAuth.signInWithPopup(provider);
};

export const loginWithFirebaseRedirect = (): void => {
  const provider = new firebase.auth.EmailAuthProvider();
  firebaseAuth.signInWithRedirect(provider);
};

export const getRedirectResult = (): Promise<firebase.auth.UserCredential> =>
  firebaseAuth.getRedirectResult();
