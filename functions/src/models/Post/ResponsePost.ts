import { IsArray, IsEnum, IsObject, IsString } from 'class-validator';
import { firestore } from 'firebase';
import { firebaseFirestore as db } from 'src/firebaseConfig';
import { GenericPostStatus } from 'src/models/posts/GenericPostStatus';
import { IResponsePost } from 'src/models/posts/IResponsePost';
import { IResponsePost } from 'src/models/posts/IResponsePost';
import { Post } from 'src/models/posts/Post';
import { ResponsePostStatus } from 'src/models/posts/ResponsePostStatus';
import { IUser } from 'src/models/users/IUser';

export class ResponsePost extends Post implements IResponsePost {
  _responseStatus: ResponsePostStatus;

  postRef: any;

  constructor(responsePost: IResponsePost) {
    super(responsePost);
    this._creatorSnapshotResponse = responsePost.creatorSnapshot;
    this._creatorRef = responsePost.creatorRef;
    this._responseStatus = responsePost.responseStatus;
    this._streetAddress = responsePost.streetAddress;
  }

  @IsObject()
  private _creatorSnapshotResponse: IUser;

  get creatorSnapshot(): IUser {
    return this._creatorSnapshotResponse;
  }

  set creatorSnapshot(creatorSnapshot: IUser) {
    this._creatorSnapshotResponse = creatorSnapshot;
  }

  @IsString()
  private _creatorRef: string;

  get creatorRef(): string {
    return this._creatorRef;
  }

  set creatorRef(creatorRef: string) {
    this._creatorRef = creatorRef;
  }

  @IsArray()
  private _participants: string[];

  get participants(): string[] {
    return this._participants;
  }

  set participants(participants: string[]) {
    this._participants = participants;
  }

  public addParticipants(participant: string) {
    if (!this._participants.includes(participant)) {
      this._participants.push(participant);
    }
  }

  public removeParticipant(participant: string) {
    this._participants.splice(this._participants.indexOf(participant), 1);
  }

  @IsArray()
  private _rejected: string[];

  get rejected(): string[] {
    return this._rejected;
  }

  set rejected(rejected: string[]) {
    this._rejected = rejected;
  }

  public addRejection(rejection: string) {
    if (!this._rejected.includes(rejection)) {
      this._rejected.push(rejection);
    }
  }

  public removeRejection(rejection: string) {
    this._rejected.splice(this._rejected.indexOf(rejection), 1);
  }

  @IsEnum(GenericPostStatus)
  private _status: GenericPostStatus;

  get genericStatus(): GenericPostStatus {
    return this._status;
  }

  set genericStatus(status: GenericPostStatus) {
    this._status = status;
  }

  @IsString()
  private _streetAddress: string;

  get streetAddress(): string {
    return this._streetAddress;
  }

  set streetAddress(streetAddress: string) {
    this._streetAddress = streetAddress;
  }

  public static async fromPost(data: Post, path: string): Promise<ResponsePost> {
    const responsesData = await db
      .collection('posts')
      .where('parentRef', '==', db.doc(path))
      .get();

    const participants = [data.creatorRef.id];
    const rejected: string[] = [];

    for (const doc of responsesData.docs) {
      const response = Post.factory(doc.data() as IResponsePost);
      if (response.responseStatus === ResponsePostStatus.rejected) {
        rejected.push(response.creatorRef.id);
      } else {
        participants.push(response.creatorRef.id);
      }
    }

    return new ResponsePost(
      path,
      data.isRequest,
      data.isResponse,
      {
        displayName: data.creatorSnapshot.displayName || '',
        displayPicture: data.creatorSnapshot.displayPicture,
      },
      data.title,
      data.description,
      {
        latitude: data.latLng.latitude,
        longitude: data.latLng.longitude,
      },
      data.creatorRef.path,
      data.status,
      data.streetAddress,
      participants,
      rejected,
      data.createdAt.toDate(),
      data.updatedAt.toDate(),
    );
  }

  public static fromFirestore(
    data: firebase.firestore.DocumentData,
  ): ResponsePost {
    return new ResponsePost(data as IResponsePost);
  }

  public static fromAlgolia(data: Record<string, any>): ResponsePost {
    return new ResponsePost(data as IResponsePost);
  }

  public static getObjectId(postPath: string): string {
    return db.doc(postPath).id;
  }

  public static getParticipantId(userPath: string): string {
    return db.doc(userPath).id;
  }

  public static fromObject(data: IResponsePost): ResponsePost {
    return new ResponsePost(data as IResponsePost);
  }

  toObject(): IResponsePost {
    return { ...this }
  };

  toFirestore(): firebase.firestore.DocumentData {
    return {
      postRef: this.postRef,
      isRequest: this.isRequest,
      creatorSnapshot: this.creatorSnapshot,
      title: this.title,
      description: this.description,
      latLng: new firestore.GeoPoint(
        this.latLng.latitude,
        this.latLng.longitude,
      ),
      creatorRef: db.doc(this.creatorRef),
      status: this.genericStatus,
      streetAddress: this.streetAddress,
      participants: this.participants,
      rejected: this.rejected,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  toAlgolia(): object {
    return {
      postRef: this.postRef,
      isRequest: this.isRequest,
      objectID: db.doc(this.postRef).id,
      creatorSnapshot: this.creatorSnapshot,
      title: this.title,
      description: this.description,
      _geoloc: {
        lat: this.latLng.latitude,
        lng: this.latLng.longitude,
      },
      creatorRef: this.creatorRef,
      status: this.genericStatus,
      streetAddress: this.streetAddress,
      participants: this.participants,
      rejected: this.rejected,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
