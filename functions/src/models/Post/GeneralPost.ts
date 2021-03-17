import { IsEnum } from 'class-validator';
import { firestore } from 'firebase';
import { firebaseFirestore as db } from 'src/firebaseConfig';

import { GenericPostStatus } from './GenericPostStatus';
import { IGeneralPost } from './IGeneralPost';
import { Post } from './Post';

export class GeneralPost extends Post implements IGeneralPost {
  constructor(generalPost: IGeneralPost) {
    super(generalPost);
    this._genericPostStatus = generalPost.genericStatus;
  }

  @IsEnum(GenericPostStatus)
  private _genericPostStatus: GenericPostStatus;

  get genericStatus(): GenericPostStatus {
    return this._genericPostStatus;
  }

  set genericStatus(status: GenericPostStatus) {
    this._genericPostStatus = status;
  }

  public static fromFirestore(
    data: firebase.firestore.DocumentData,
  ): GeneralPost {
    return new GeneralPost(data as IGeneralPost);
  }

  public static fromAlgolia(data: Record<string, any>): GeneralPost {
    return new GeneralPost(data as GeneralPost);
  }

  public static getObjectId(postPath: string): string {
    return db.doc(postPath).id;
  }

  public static getParticipantId(userPath: string): string {
    return db.doc(userPath).id;
  }

  public static fromObject(data: IGeneralPost): GeneralPost {
    return new GeneralPost(data);
  }

  toObject(): IGeneralPost {
    return { ...this };
  }

  toFirestore(): firebase.firestore.DocumentData {
    return {
      postRef: db.doc(this.postRef),
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
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
