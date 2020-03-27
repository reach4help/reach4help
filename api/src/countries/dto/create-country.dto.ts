import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Country } from '../entities/country.entity';
import { Point } from '../../addresses/entities/address.entity';

export class CreateCountryDto {
  @ApiProperty({
    example: 'Romania',
    description: 'Name of the Country',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    example: 'RO',
    description: 'ISO-31661-Alpha2 Code',
  })
  @IsString()
  readonly code: string;
}
