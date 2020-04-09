import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { firestore } from 'firebase-admin';
import DocumentData = firestore.DocumentData;
import QueryDocumentSnapshot = firestore.QueryDocumentSnapshot;

export enum OrganizationType {
  healthCare = 'health_care',
  socialServices = 'social_services',
  welfare = 'welfare',
  mutualAid = 'mutual_aid',
}

export interface IOrganization extends DocumentData {
  name: string;
  types: OrganizationType[];
}

export class Organization implements IOrganization {
  @IsString()
  @IsNotEmpty()
  private _name: string;

  @IsArray()
  private _types: OrganizationType[];

  constructor(name: string, types: OrganizationType[]) {
    this._name = name;
    this._types = types;
  }

  static factory = (data: IOrganization): Organization => new Organization(
    data.name,
    data.types,
  );

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get types(): OrganizationType[] {
    return this._types;
  }

  set types(value: OrganizationType[]) {
    this._types = value;
  }
}

export const OrganizationFirestoreConverter: FirestoreDataConverter<Organization> = {
  fromFirestore: (data: QueryDocumentSnapshot<IOrganization>): Organization => {
    return Organization.factory(data.data());
  },
  toFirestore: (modelObject: Organization): IOrganization => {
    return {
      name: modelObject.name,
      types: modelObject.types,
    };
  },
};
