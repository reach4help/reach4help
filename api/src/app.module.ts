import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CountriesModule } from './countries/countries.module';
import { AddressesModule } from './addresses/addresses.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    UsersModule,
    CountriesModule,
    AddressesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
