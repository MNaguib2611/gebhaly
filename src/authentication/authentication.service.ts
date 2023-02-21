import { UserService } from '../users/users.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/users/hash.service';

@Injectable()
export class AuthenticationService {
  constructor(private userService: UserService, private hashService: HashService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string) {
    const user = await this.userService.getUserByUsername(username);
    if (user && (await this.hashService.comparePassword(pass, user.password))) {
      return user;
    }
    return null;
  }

  async login(user) {
    const foundUser = await this.validateUser(user.username, user.password);
    const payload = {
      username: foundUser.username,
      sub: foundUser.id,
      name: foundUser.name,
      phone: foundUser.phone,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
