import { FirestoreDataConverter } from '@google-cloud/firestore';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { firestore } from 'firebase-admin';
import DocumentData = firestore.DocumentData;

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

export class Organization implements IOrganization, FirestoreDataConverter<Organization> {
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

  // eslint-disable-next-line class-methods-use-this
  fromFirestore(data: IOrganization): Organization {
    return Organization.factory(data);
  }

  // eslint-disable-next-line class-methods-use-this
  toFirestore(modelObject: Organization): IOrganization {
    return {
      name: modelObject.name,
      types: modelObject.types,
    };
  }
}
