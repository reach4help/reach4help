import { IsInt, IsNotEmpty, IsNumber, IsString, Max, Min, validate } from 'class-validator';
import { firestore } from 'firebase-admin';
import * as functions from 'firebase-functions';
import { EventContext } from 'firebase-functions/lib/cloud-functions';
import { DocumentSnapshot } from 'firebase-functions/lib/providers/firestore';

export interface IUser {
  averageRating: number;
  casesCompleted: number;
  requestsMade: number;
  username: string;
  displayName: string | null;
}

export class User implements IUser {

  @IsNumber()
  @Min(1)
  @Max(5)
  private _averageRating: number;

  @IsInt()
  @Min(0)
  private _casesCompleted: number;

  @IsInt()
  @Min(0)
  private _requestsMade: number;

  @IsString()
  @IsNotEmpty()
  private _username: string;

  @IsString()
  private _displayName: string | null;

  constructor(
    averageRating: number,
    casesCompleted = 0,
    requestsMade = 0,
    username: string,
    displayName: string | null = null,
  ) {
    this._averageRating = averageRating;
    this._casesCompleted = casesCompleted;
    this._requestsMade = requestsMade;
    this._username = username;
    this._displayName = displayName;
  }

  static factory = (data: IUser): User => new User(
    data.averageRating,
    data.casesCompleted,
    data.requestsMade,
    data.username,
    data.displayName,
  );

  get averageRating(): number {
    return this._averageRating;
  }

  set averageRating(value: number) {
    this._averageRating = value;
  }

  get casesCompleted(): number {
    return this._casesCompleted;
  }

  set casesCompleted(value: number) {
    this._casesCompleted = value;
  }

  get requestsMade(): number {
    return this._requestsMade;
  }

  set requestsMade(value: number) {
    this._requestsMade = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get displayName(): string | null {
    return this._displayName;
  }

  set displayName(value: string | null) {
    this._displayName = value;
  }
}

const validateUser = (value: IUser): Promise<void> => {
  return validate(User.factory(value))
    .then(() => {
      return Promise.resolve();
    });
};

export const triggerEventsWhenOfferIsCreated = functions.firestore.document('users/{userId}')
  // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
  .onCreate((snapshot: DocumentSnapshot, context: EventContext) => {
    return validateUser(snapshot.data() as IUser)
      .catch(errors => {
        console.error('Invalid User Found: ', errors);
        return firestore().collection('users').doc(context.params.userId)
          .delete();
      });
  });
