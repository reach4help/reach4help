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
  constructor(name: string, types: OrganizationType[]) {
    this._name = name;
    this._types = types;
  }

  @IsString()
  @IsNotEmpty()
  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  @IsArray()
  private _types: OrganizationType[];

  get types(): OrganizationType[] {
    return this._types;
  }

  set types(value: OrganizationType[]) {
    this._types = value;
  }

  static factory = (data: IOrganization): Organization =>
    new Organization(data.name, data.types);
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
