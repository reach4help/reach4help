import { GeneralPost } from './GeneralPost';
import { IGeneralPost } from './IGeneralPost';

export const GeneralPostFirestoreConverter: firebase.firestore.FirestoreDataConverter<GeneralPost> = {
  fromFirestore: (
    data: firebase.firestore.QueryDocumentSnapshot<IGeneralPost>,
  ): GeneralPost => GeneralPost.fromFirestore(data.data()),
  toFirestore: (modelObject: GeneralPost): firebase.firestore.DocumentData =>
    modelObject.toFirestore(),
};
