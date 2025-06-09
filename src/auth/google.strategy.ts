// auth/google.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
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
    const existingUser = await this.usersService.checkUserExists(user.email);

    if (!existingUser) {
      // إذا المستخدم غير موجود، قم بإنشاء مستخدم جديد
      const newUser = await this.usersService.signUp({
        email: user.email,
        username: user.name,
        password: undefined,
        googleId: user.id,
      });
      const payload = {
        sub: newUser._id,
        email: newUser.email,
        role: newUser.role,
      };
      const appAccessToken = this.jwtService.sign(payload);
      return done(null, {
        user: newUser,
        access_token: appAccessToken,
      });
    }
    const oldUser = await this.usersService.findByEmail(user.email); // using findByEmail method just for return user information
    const payload = { sub: oldUser?._id, email: oldUser?.email };
    const appAccessToken = this.jwtService.sign(payload);
    done(null, {
      user: oldUser,
      access_token: appAccessToken, // ← أرسل JWT الخاص بك
    });
  }
}
