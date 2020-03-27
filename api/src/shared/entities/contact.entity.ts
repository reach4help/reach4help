import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, IsPhoneNumber } from 'class-validator';
import { GenericEntity } from 'src/generic/generic.entity';

@Entity()
export class Contact extends GenericEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ name: 'email' })
  @IsEmail()
  email: string;

  @Column({ name: 'phone' })
  @IsPhoneNumber('ZZ', { always: true })
  phoneNumber: string;
}
