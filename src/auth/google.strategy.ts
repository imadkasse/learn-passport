// auth/google.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: 'http://localhost:4000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos, id } = profile;

    const user = {
      id,
      email: emails[0].value,
      name: name.givenName + ' ' + name.familyName,
      picture: photos[0].value,
      access_token: accessToken,
    };
    const existenUser = await this.usersService.checkUserExists(user.email);
    if (!existenUser) {
      // إذا المستخدم غير موجود، قم بإنشاء مستخدم جديد
      const newUser = await this.usersService.signUp({
        email: user.email,
        username: user.name,
        password: undefined,
        googleId: user.id,
      });
      console.log('New user created:', profile);
      return done(null, {
        user: newUser,
        access_token: user.access_token,
      });
    }
    done(null, user);
  }
}
