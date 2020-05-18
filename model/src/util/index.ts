import {
  DocumentReference as AdminDocumentReference,
  Timestamp as AdminTimestamp,
} from '@google-cloud/firestore';
import { firestore } from 'firebase';
import * as t from 'io-ts';

import FrontendDocumentReference = firestore.DocumentReference;
import FrontendTimestamp = firestore.Timestamp;

export type DocumentReference<T> =
  | FrontendDocumentReference<T>
  | AdminDocumentReference<T>;

const isDocumentReference = <T>(v: unknown): v is DocumentReference<T> =>
  v instanceof FrontendDocumentReference || v instanceof AdminDocumentReference;

/**
 * TODO: extend this with the ability to tie this type to a specific document
 * type, checking that the path of the document ref is as expected.
 */
export const DocumentReferenceCodec = <T>() =>
  new t.Type<DocumentReference<T>, DocumentReference<T>, unknown>(
    'DocumentReference',
    isDocumentReference,
    (input, context) =>
      isDocumentReference<T>(input)
        ? t.success(input)
        : t.failure(input, context),
    t.identity,
  );

export type Timestamp = FrontendTimestamp | AdminTimestamp;

const isTimestamp = (v: unknown): v is Timestamp =>
  v instanceof FrontendTimestamp || v instanceof AdminTimestamp;

export const TimestampCodec = new t.Type<Timestamp, Timestamp, unknown>(
  'Timestamp',
  isTimestamp,
  (input, context) =>
    isTimestamp(input) ? t.success(input) : t.failure(input, context),
  t.identity,
);
