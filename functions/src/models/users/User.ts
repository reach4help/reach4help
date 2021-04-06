import firebase from 'firebase/app';
import { INewUserParams } from './INewUserParams';

import { IUser } from './IUser';

// TODO: [REFACTOR] Remove IUser
export class User implements IUser {
  casesCompleted: number;

  createdAt: firebase.firestore.Timestamp;

  displayNickname: string | null;

  displayPicture: string | null;

  postsMade: number;

  username: string;

  constructor(
    username: string,
    displayNickname: string | null = null,
    displayPicture: string | null = null,
  ) {
    this.username = username;
    this.displayNickname = displayNickname;
    this.displayPicture = displayPicture;
    this.createdAt = firebase.firestore.Timestamp.now();
    this.casesCompleted = 0;
    this.postsMade = 0;
  }

  static factory = (data: INewUserParams): User =>
    new User(data.username, data.displayNickname, data.displayPicture);

  toObject = (): object => ({
    username: this.username,
    casesCompleted: this.casesCompleted,
    postsMade: this.postsMade,
    displayNickname: this.displayNickname,
    displayPicture: this.displayPicture,
    createdAt: this.createdAt,
  });
}
