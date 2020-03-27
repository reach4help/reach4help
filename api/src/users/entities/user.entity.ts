import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsUrl } from 'class-validator';
import { GenericEntity } from 'src/generic/generic.entity';
import { Authentication } from './authentication.entity';
import { Contact } from '../../shared/entities/contact.entity';
import { Address } from '../../addresses/entities/address.entity';

@Entity()
export class User extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @OneToOne(type => Authentication)
  @JoinColumn({ name: 'authentication_id' })
  authentication: Authentication;

  @OneToOne(type => Contact)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @OneToOne(type => Address)
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @Column({ name: 'username' })
  @IsString({ always: true })
  username: string;

  @Column({ name: 'profile_photo' })
  @IsUrl()
  profilePhoto: string;

  @Column({ name: 'first_name' })
  @IsString({ always: true })
  firstName: string;

  @Column({ name: 'middle_name' })
  @IsString()
  middleName: string;

  @Column({ name: 'last_name' })
  @IsString()
  lastName: string;
}
