export interface IUser extends firebase.firestore.DocumentData {
  username: string;
  casesCompleted: number;
  postsMade: number;
  displayNickname: string | null;
  displayPicture: string | null;
  createdAt: firebase.firestore.Timestamp;
  toObject: () => object;
}
