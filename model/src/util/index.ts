import { DocumentReference as AdminDocumentReference } from '@google-cloud/firestore';
import { firestore } from 'firebase';

import FrontendDocumentReference = firestore.DocumentReference;

export type DocumentReference<T> =
  | FrontendDocumentReference<T>
  | AdminDocumentReference<T>;
