import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Authentication } from '../entities/authentication.entity';
import { Contact } from '../../shared/entities/contact.entity';
import { Address } from '../../addresses/entities/address.entity';

export class CreateUserDto {
  @ApiProperty({
    example: 'John',
    description: 'The user first name',
  })
  @IsString()
  readonly firstName: string;

  @ApiProperty({
    example: 'Smith',
    description: 'The user last name',
  })
  @IsString()
  readonly lastName: string;

  @ApiProperty({
    example: 'johndoe',
    description: 'The username for the user',
  })
  @IsString()
  readonly username: string;

  @ApiProperty({
    example: 'https://reach4help.org/static/logo-78d2063bcc5e542bf67195e3c6fb6fcf.svg',
    description: 'The user\'s profile photo',
  })
  @IsString()
  readonly profilePhoto: string;

  readonly authentication: Authentication;
  readonly contact: Contact;
  readonly address: Address;
}
