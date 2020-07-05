import firebase, { firebaseAuth } from 'src/firebase';

export const observeUser = (nextValue: Function): firebase.Unsubscribe =>
  firebaseAuth.onAuthStateChanged((user: firebase.User | null) => {
    console.log('auth state has changed: ', user);
    nextValue(user);
  });

export const signOutCurrentUser = (): Promise<void> => firebaseAuth.signOut();
