import { firestore } from 'firebase';

import { IUser } from './IUser';

export class User implements IUser {
  casesCompleted: number;

  createdAt: firestore.Timestamp;

  displayNickname?: string | null;

  displayPicture?: string | null;

  postsMade: number;

  username: string;

  constructor(
    username: string,
    casesCompleted = 0,
    postsMade = 0,
    displayNickname: string | null = null,
    displayPicture: string | null = null,
    createdAt = firestore.Timestamp.now(),
  ) {
    this.postsMade = postsMade;
    this.username = username;
    this.displayNickname = displayNickname;
    this.displayPicture = displayPicture;
    this.createdAt = createdAt;
    this.casesCompleted = casesCompleted;
    this.postsMade = postsMade;
  }

  static factory = (data: IUser): User =>
    new User(data.username, data.casesCompleted, data.postsMade, data.displayNickname, data.displayPicture, data.createdAt);

  toObject = (): object => ({
    username: this.username,
    casesCompleted: this.casesCompleted,
    postsMade: this.postsMade,
    displayNickname: this.displayNickname,
    displayPicture: this.displayPicture,
    createdAt: this.createdAt,
  });
}
