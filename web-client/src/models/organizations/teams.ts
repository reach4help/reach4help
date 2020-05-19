import { firestore } from 'firebase';

import { MakePartial } from '../util';
import { OrganizationType } from './index';

export interface Team {
  name: string;
  types: OrganizationType[];
  createdAt: firebase.firestore.Timestamp;
}

/**
 * Initialize with default values
 */
export const initTeam = (team: MakePartial<Team, 'createdAt'>): Team => ({
  createdAt: firestore.Timestamp.now(),
  ...team,
});

export const TeamFirestoreConverter: firebase.firestore.FirestoreDataConverter<Team> = {
  fromFirestore: (data: firebase.firestore.QueryDocumentSnapshot<Team>) =>
    data.data(),
  toFirestore: modelObject => modelObject,
};
