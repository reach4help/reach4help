import firebase, { firebaseAuth } from 'src/firebaseConfig';

export const observeUser = (nextValue: Function): firebase.Unsubscribe =>
  firebaseAuth.onAuthStateChanged((user: firebase.User | null) => {
    nextValue(user);
  });

export const signOutCurrentUser = (): Promise<void> => firebaseAuth.signOut();
