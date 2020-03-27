import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CountriesService } from './countries.service';
import { CountriesController } from './countries.controller';
import { countryProvider } from './countries.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CountriesController],
  providers: [...countryProvider, CountriesService],
})
export class CountriesModule {
}
