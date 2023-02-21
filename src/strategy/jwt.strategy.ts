import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const user = await this.usersService.getUserByUsername(payload.username);
    if (!user) {
      throw new NotFoundException('This user does not exist');
    }
    return {
      userId: payload.sub,
      username: payload.username,
      phone: payload.username,
      name: payload.name,
    };
  }
}
