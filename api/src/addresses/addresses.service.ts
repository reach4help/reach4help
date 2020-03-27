import { Inject, Injectable } from '@nestjs/common';
import { ADDRESS_REPOSITORY } from '../constants';
import { Repository } from 'typeorm';
import { Address } from './entities/address.entity';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressesService {
  constructor(
    @Inject(ADDRESS_REPOSITORY)
    private addressesRepository: Repository<Address>,
  ) {
  }

  findAll(): Promise<Address[]> {
    return this.addressesRepository.find({ relations: ["country"]});
  }

  findOne(id: number): Promise<Address> {
    return this.addressesRepository.findOne(id, { relations: ["country"]});
  }

  create(createAddressDto: CreateAddressDto): Promise<Address> {
    const address = new Address();

    address.address1 = createAddressDto.address1;
    address.address2 = createAddressDto.address2;
    address.address3 = createAddressDto.address3;
    address.locality = createAddressDto.locality;
    address.administrativeArea1 = createAddressDto.administrativeArea1;
    address.administrativeArea2 = createAddressDto.administrativeArea2;
    address.country = createAddressDto.country;
    address.latLng = createAddressDto.latLng;

    return this.addressesRepository.save(address)
      .then((result): Promise<Address> => {
        return this.findOne(result.id);
      })
  }

  async remove(id: number): Promise<void> {
    await this.addressesRepository.delete(id);
  }
}
