import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';
import { Address } from './entities/address.entity';

@ApiTags('addresses')
@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {
  }

  @Post()
  @ApiOperation({ summary: 'Create user' })
  async create(@Body() createCountry: CreateAddressDto): Promise<Address> {
    return this.addressesService.create(createCountry);
  }

  @Get()
  findAll(): Promise<Address[]> {
    return this.addressesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Address> {
    return this.addressesService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.addressesService.remove(id);
  }
}
