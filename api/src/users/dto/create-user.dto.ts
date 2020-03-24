import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
    example: 'example@domain.com',
    description: 'The user email',
  })
  @IsEmail()
  readonly email: string;
}
