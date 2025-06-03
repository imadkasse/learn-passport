import { StudentModule } from './student/student.module';
import { StudentController } from './student/student.controller';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    StudentModule,
    DatabaseModule,
    JwtModule.register({
      secret: 'asdwqca',
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [StudentController],
  providers: [],
})
export class AppModule {}
