import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsString, IsEmail } from 'class-validator';
import { GenericEntity } from 'src/generic/generic.entity';

@Entity()
export class User extends GenericEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  @IsString({ always: true })
  firstName: string;

  @Column({ name: 'last_name' })
  @IsString()
  lastName: string;

  @Column()
  @IsEmail()
  email: string;

}