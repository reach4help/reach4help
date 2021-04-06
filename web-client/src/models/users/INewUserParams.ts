import firebase from 'firebase/app';

export interface INewUserParams extends firebase.firestore.DocumentData {
  username: string;
  displayNickname: string;
  displayPicture: string | null;
}
