import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Country } from './entities/country.entity';
import { CreateCountryDto } from './dto/create-country.dto';
import { CountriesService } from './countries.service';

@ApiTags('countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async create(@Body() createCountry: CreateCountryDto): Promise<Country> {
    return this.countriesService.create(createCountry);
  }

  @Get()
  findAll(): Promise<Country[]> {
    return this.countriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Country> {
    return this.countriesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.countriesService.remove(id);
  }
}
