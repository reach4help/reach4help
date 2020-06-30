import { firebaseAuth } from 'src/firebase';

import { EmailAndPasswordPayload } from './types';

export const signIn = async ({ email, password }: EmailAndPasswordPayload) =>
  firebaseAuth.signInWithEmailAndPassword(email, password);

export const signUp = async ({ email, password }: EmailAndPasswordPayload) =>
  firebaseAuth.createUserWithEmailAndPassword(email, password);

export const fetchSignInMethods = async ({ email }: { email: string }) =>
  firebaseAuth.fetchSignInMethodsForEmail(email);
