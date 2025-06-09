import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);

    if (user && user.password === pass) {
      return user;
    }
    return null;
  }
  async login(user: User) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    return {
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
  async signUp(user: User): Promise<{
    user: User;
    access_token: string;
  }> {
    const newUser = await this.usersService.signUp(user);

    const payload = { email: newUser.email, sub: newUser._id };
    const access_token = this.jwtService.sign(payload);
    return {
      user: newUser,
      access_token: access_token,
    };
  }

  async me(userId: string): Promise<User> {
    return this.usersService.findMe(userId);
  }
}
