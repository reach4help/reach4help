import { firestore } from 'firebase';

import { MakePartial } from '../util';

export enum QuestionnaireType {
  pin = 'pin',
  cav = 'cav',
  org = 'org',
  team = 'team',
}

export interface Questionnaire {
  parentRef: firebase.firestore.DocumentReference<
    firebase.firestore.DocumentData
  >;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: { [key: string]: any };

  type: QuestionnaireType;
  version: string;
  createdAt: firebase.firestore.Timestamp;
}

/**
 * Initialize with default values
 */
export const initQuestionnaire = (
  q: MakePartial<Questionnaire, 'createdAt'>,
): Questionnaire => ({
  createdAt: firestore.Timestamp.now(),
  ...q,
});

export const QuestionnaireFirestoreConverter: firebase.firestore.FirestoreDataConverter<Questionnaire> = {
  fromFirestore: (
    data: firebase.firestore.QueryDocumentSnapshot<Questionnaire>,
  ) => data.data(),
  toFirestore: modelObject => modelObject,
};
