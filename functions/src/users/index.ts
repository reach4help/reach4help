export interface IUser {
  averageRating: number;
  casesCompleted: number;
  requestsMade: number;
  username: string;
}

export class User implements IUser {
  private _averageRating: number;
  private _casesCompleted: number;
  private _requestsMade: number;
  private _username: string;

  constructor(averageRating: number, casesCompleted: number, requestsMade: number, username: string) {
    this._averageRating = averageRating;
    this._casesCompleted = casesCompleted;
    this._requestsMade = requestsMade;
    this._username = username;
  }

  static factory = (data: IUser): User => new User(
    data.averageRating,
    data.casesCompleted,
    data.requestsMade,
    data.username,
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
}
