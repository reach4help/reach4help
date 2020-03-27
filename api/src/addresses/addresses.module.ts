import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { AddressesService } from './addresses.service';
import { AddressesController } from './addresses.controller';
import { addressProvider } from './addresses.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [AddressesController],
  providers: [...addressProvider, AddressesService],
})
export class AddressesModule {
}
