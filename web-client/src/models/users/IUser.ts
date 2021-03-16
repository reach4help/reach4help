export interface IUser extends firebase.firestore.DocumentData {
  username: string;
  casesCompleted?: number;
  postsMade?: number;
  displayName?: string | null;
  displayPicture?: string | null;
  createdAt?: firebase.firestore.Timestamp;
}
