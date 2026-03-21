import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { ReqresApiService } from 'src/reqres-api/reqres-api.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserReqres } from 'src/reqres-api/reqres-api.types';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly reqresApi: ReqresApiService,
  ) {}

  async saveUser(id: number) {
    const user: UserReqres = await this.findUserReqresById(id);
    const userTosave: CreateUserDto = {
      userId: Number(user.id),
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      avatar: user.avatar,
    };
    const newUser = this.usersRepository.create(userTosave);
    const savedUser = await this.usersRepository.save(newUser);
    return this.findOne(savedUser.userId);
  }

  async findAllUsers() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findUserById(id: number): Promise<User> {
    const user: User = await this.findOne(id);
    return user;
  }

  async deleteUser(id: number) {
    try {
      await this.usersRepository.delete(id);
      return {
        message: 'User deleted',
      };
    } catch {
      throw new BadRequestException('Error deleting user');
    }
  }

  private async findOne(id: number) {
    const user = await this.usersRepository.findOne({
      where: { userId: id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  private async findUserReqresById(id: number): Promise<UserReqres> {
    const user = await this.reqresApi.getUserById(id);
    return user.data;
  }
}
