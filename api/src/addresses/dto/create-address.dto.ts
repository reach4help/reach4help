import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Country } from '../../countries/entities/country.entity';
import { Point } from '../entities/address.entity';
import { CreateCountryDto } from '../../countries/dto/create-country.dto';

export class CreateAddressDto {
  @ApiProperty({
    example: '123 Main St.',
    description: 'The first line of the street address',
  })
  @IsString()
  readonly address1: string;

  @ApiProperty({
    example: 'Suite 1000',
    description: 'The second line of the street address',
  })
  @IsString()
  readonly address2: string;

  @ApiProperty({
    example: '',
    description: 'The third line of the street address',
  })
  @IsString()
  readonly address3: string;

  @ApiProperty({
    example: 'Los Angeles',
    description: 'The city associated with the address',
  })
  @IsString()
  readonly locality: string;

  @ApiProperty({
    example: 'CA',
    description: 'The state or provence associated with the address',
  })
  @IsString()
  readonly administrativeArea1: string;

  @ApiProperty({
    example: 'Los Angeles County',
    description: 'The county or additional subdivision of administrativeArea1',
  })
  @IsString()
  readonly administrativeArea2: string;

  @ApiProperty()
  readonly country: Country;

  @ApiProperty()
  readonly latLng: Point;
}
