import { Inject, Injectable } from '@nestjs/common';
import { COUNTRY_REPOSITORY } from '../constants';
import { Country } from './entities/country.entity';
import { CreateCountryDto } from './dto/create-country.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CountriesService {
  constructor(
    @Inject(COUNTRY_REPOSITORY)
    private countriesRepository: Repository<Country>,
  ) {
  }

  findAll(): Promise<Country[]> {
    return this.countriesRepository.find();
  }

  findOne(id: number): Promise<Country> {
    return this.countriesRepository.findOne(id);
  }

  create(createCountryDto: CreateCountryDto): Promise<Country> {
    const country = new Country();
    country.code = createCountryDto.code;
    country.name = createCountryDto.name;
    return this.countriesRepository.save(country);
  }

  async remove(id: number): Promise<void> {
    await this.countriesRepository.delete(id);
  }
}
