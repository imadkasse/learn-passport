import {
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_MODEL') private readonly usersModel: Model<User>, // Replace 'any' with the actual type of your user model
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersModel.findOne({ email: email });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }
  async signUp(user: CreateUserDto): Promise<User> {
    const newUser = await this.usersModel.create(user);
    return newUser;
  }
  async findMe(userId: string): Promise<User> {
    const me = await this.usersModel.findById(userId).select('-password');
    if (!me) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return me;
  }
}
