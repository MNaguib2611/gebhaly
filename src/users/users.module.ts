import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { User, UserSchema } from './users.schema';
import { jwtConstants } from 'src/strategy/constants';
import { HashService } from 'src/users/hash.service';
import { AuthenticationService } from '../authentication/authentication.service';
import { JwtStrategy } from 'src/strategy/jwt.strategy';
import { LocalStrategy } from 'src/strategy/local.strategy';

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
  controllers: [UserController],
  providers: [UserService, HashService, AuthenticationService, JwtStrategy, LocalStrategy],
})
export class UserModule {}
