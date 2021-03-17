import { IUser } from './IUser';
import { User } from './User';

export const UserFirestoreConverter: firebase.firestore.FirestoreDataConverter<User> = {
  fromFirestore: (
    data: firebase.firestore.QueryDocumentSnapshot<IUser>,
  ): User => User.factory(data.data()),
  toFirestore: (modelObject: User): firebase.firestore.DocumentData =>
    modelObject.toObject(),
};
