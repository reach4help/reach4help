import { IsEnum, IsNotEmpty, IsObject, IsString, validate, ValidateNested } from 'class-validator';
import * as functions from 'firebase-functions';
import { Change, EventContext } from 'firebase-functions/lib/cloud-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

import { IUser, User } from '../../users';
import { firestore } from 'firebase-admin';

export enum OfferStatus {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected',
}

export interface IOffer extends FirebaseFirestore.DocumentData {
  cavUserRef: FirebaseFirestore.DocumentReference<IUser>;
  pinUserRef: FirebaseFirestore.DocumentReference<IUser>;
  cavUserSnapshot: IUser;
  message: string;
  status: string;
}

export class Offer implements IOffer {

  @IsObject()
  private _cavUserRef: FirebaseFirestore.DocumentReference<IUser>;

  @IsObject()
  private _pinUserRef: FirebaseFirestore.DocumentReference<IUser>;

  @ValidateNested()
  private _cavUserSnapshot: User;

  @IsString()
  @IsNotEmpty()
  private _message: string;

  @IsEnum(OfferStatus)
  private _status: OfferStatus;

  constructor(
    cavUserRef: FirebaseFirestore.DocumentReference<IUser>,
    pinUserRef: FirebaseFirestore.DocumentReference<IUser>,
    cavUserSnapshot: User,
    message: string,
    status: OfferStatus,
  ) {
    this._cavUserRef = cavUserRef;
    this._pinUserRef = pinUserRef;
    this._cavUserSnapshot = cavUserSnapshot;
    this._message = message;
    this._status = status;
  }

  static factory = (data: IOffer): Offer => new Offer(
    data.cavUserRef,
    data.pinUserRef,
    User.factory(data.cavUserSnapshot),
    data.message,
    data.status as OfferStatus,
  );

  get cavUserRef(): FirebaseFirestore.DocumentReference<IUser> {
    return this._cavUserRef;
  }

  set cavUserRef(value: FirebaseFirestore.DocumentReference<IUser>) {
    this._cavUserRef = value;
  }

  get pinUserRef(): FirebaseFirestore.DocumentReference<IUser> {
    return this._pinUserRef;
  }

  set pinUserRef(value: FirebaseFirestore.DocumentReference<IUser>) {
    this._pinUserRef = value;
  }

  get cavUserSnapshot(): User {
    return this._cavUserSnapshot;
  }

  set cavUserSnapshot(value: User) {
    this._cavUserSnapshot = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get status(): OfferStatus {
    return this._status;
  }

  set status(value: OfferStatus) {
    this._status = value;
  }
}

// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
const queueStatusUpdateTriggers = (change: Change<DocumentSnapshot>, context: EventContext): Promise<void[]> => {
  const offerBefore = change.before ? change.before.data() as Offer : null;
  const offerAfter = change.after.data() ? change.after.data() as Offer : null;

  const operations: Promise<void>[] = [];

  // A request has just been accepted -- Update request with new information (CAV, new status)
  if (offerBefore && offerBefore.status !== OfferStatus.accepted && offerAfter && offerAfter.status === OfferStatus.accepted) {
    // TODO: Update the request with the current CAV as well as set it's status.
    // This will enable the CAV to access the address of the request.
    // const requestId = context.params.requestId;
    // Use the id to find the request and update it's status and current CAV
    operations.push(Promise.resolve());
  }

  return Promise.all(operations);
};

const validateOffer = (value: IOffer): Promise<void> => {
  return validate(Offer.factory(value))
    .then(() => {
      return Promise.resolve();
    });
};

export const triggerEventsWhenOfferIsCreated = functions.firestore.document('requests/{requestId}/offers/{offerId}')
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  .onCreate((snapshot: DocumentSnapshot, context: EventContext) => {
    return validateOffer(snapshot.data() as IOffer)
      .catch((errors) => {
        console.error('Invalid Offer Found: ', errors);
        return firestore()
          .collection('requests').doc(context.params.requestId)
          .collection('offers').doc(context.params.offerId)
          .delete();
      });
  });

export const triggerEventsWhenOfferIsUpdated = functions.firestore.document('requests/{requestId}/offers/{offerId}')
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  .onUpdate((change: Change<DocumentSnapshot>, context: EventContext) => {
    return validateOffer(change.after.data() as IOffer)
      .catch(errors => {
        console.error('Invalid Offer Found: ', errors);
        return firestore()
          .collection('requests').doc(context.params.requestId)
          .collection('offers').doc(context.params.offerId)
          .delete();
      })
      .then(() => {
        return Promise.all([
          queueStatusUpdateTriggers(change, context),
        ]);
      });
  });
