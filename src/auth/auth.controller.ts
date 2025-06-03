import {
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from 'src/users/interfaces/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signUp(@Request() req) {
    return this.authService.signUp(req.body);
  }
  @Post('/login')
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async me(@Request() req): Promise<{ user: User }> {
    return {
      user: await this.authService.me(req.user.userId),
    };
  }
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Request() req) {
    // Google redirect page
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Request() req) {
    return req.user; // هنا يجيك الداتا من validate()
  }
}
