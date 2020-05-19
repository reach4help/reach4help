import { firestore } from 'firebase';

import { MakePartial } from '../util';

export enum OrganizationType {
  healthCare = 'health_care',
  socialServices = 'social_services',
  welfare = 'welfare',
  mutualAid = 'mutual_aid',
}

export interface Organization {
  name: string;
  types: OrganizationType[];
  createdAt: firebase.firestore.Timestamp;
}

/**
 * Initialize with default values
 */
export const initOrganization = (
  org: MakePartial<Organization, 'createdAt'>,
): Organization => ({
  createdAt: firestore.Timestamp.now(),
  ...org,
});

export const OrganizationFirestoreConverter: firebase.firestore.FirestoreDataConverter<Organization> = {
  fromFirestore: (
    data: firebase.firestore.QueryDocumentSnapshot<Organization>,
  ) => data.data(),
  toFirestore: modelObject => modelObject,
};
