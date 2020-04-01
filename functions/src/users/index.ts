export interface IUser {
  averageRating: number;
  casesCompleted: number;
  requestsMade: number;
  username: string;
  displayName: string | null;
}

export class User implements IUser {
  private _averageRating: number;
  private _casesCompleted: number;
  private _requestsMade: number;
  private _username: string;
  private _displayName: string | null;

  constructor(
    averageRating: number,
    casesCompleted: number,
    requestsMade: number,
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
