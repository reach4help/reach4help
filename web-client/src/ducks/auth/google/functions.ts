import firebase, { firebaseAuth } from 'src/firebase';

export const googleLoginWithFirebasePopUp = async (): Promise<firebase.auth.UserCredential> => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebaseAuth.signInWithPopup(provider);
};

export const loginWithFirebaseRedirect = (): void => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebaseAuth.signInWithRedirect(provider);
};

export const getRedirectResult = (): Promise<firebase.auth.UserCredential> =>
  firebaseAuth.getRedirectResult();
