import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { User, UserSchema } from '../users/users.schema';
import { jwtConstants } from '../strategy/constants';
import { UsersService } from '../users/users.service';
import { HashService } from '../users/hash.service';
import { LocalStrategy } from '../strategy/local.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '60d',
      },
    }),
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, UsersService, LocalStrategy, HashService],
})
export class AuthenticationModule {}
