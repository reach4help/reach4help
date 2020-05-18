import { firestore } from 'firebase';
import * as t from 'io-ts';

import FrontendDocumentReference = firestore.DocumentReference;
import FrontendTimestamp = firestore.Timestamp;

export type DocumentReference<T> = FrontendDocumentReference<T>;

const isDocumentReference = <T>(v: unknown): v is DocumentReference<T> =>
  v instanceof FrontendDocumentReference;

/**
 * TODO: extend this with the ability to tie this type to a specific document
 * type, checking that the path of the document ref is as expected.
 */
export const DocumentReferenceCodec = new t.Type<
  DocumentReference<unknown>,
  DocumentReference<unknown>,
  unknown
>(
  'DocumentReference',
  isDocumentReference,
  (input, context) =>
    isDocumentReference<unknown>(input)
      ? t.success(input)
      : t.failure(input, context),
  t.identity,
);

export type Timestamp = FrontendTimestamp;

const isTimestamp = (v: unknown): v is Timestamp =>
  v instanceof FrontendTimestamp;

export const TimestampCodec = new t.Type<Timestamp, Timestamp, unknown>(
  'Timestamp',
  isTimestamp,
  (input, context) =>
    isTimestamp(input) ? t.success(input) : t.failure(input, context),
  t.identity,
);
