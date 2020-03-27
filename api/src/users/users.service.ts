import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm/repository/Repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { USER_REPOSITORY } from 'src/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY)
    private usersRepository: Repository<User>,
  ) {
  }

  findAll(relations = []): Promise<User[]> {
    return this.usersRepository.find({ relations });
  }

  findOne(id: number, relations = []): Promise<User> {
    return this.usersRepository.findOne(id, { relations });
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();

    user.authentication = createUserDto.authentication;
    user.contact = createUserDto.contact;
    user.address = createUserDto.address;

    user.profilePhoto = createUserDto.profilePhoto;
    user.username = createUserDto.username;
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return this.usersRepository.save(user)
      .then((result) => {
        return this.findOne(result.id, ['address', 'authentication', 'contact'])
      })
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
