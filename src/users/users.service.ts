import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HashService } from './hash.service';
import { User, UserDocument } from './users.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private hashService: HashService) {}

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find({}).exec();
  }

  async getUserByUserId(_id: string) {
    return this.userModel
      .findOne({
        _id,
      })
      .exec();
  }

  async updateUserPassByUserId(_id: string, passwordPlain: string) {
    const password = await this.hashService.hashPassword(passwordPlain);
    return this.userModel
      .updateOne(
        {
          _id,
        },
        { password },
      )
      .exec();
  }

  async getUserByUsername(username: string) {
    return this.userModel
      .findOne({
        username,
      })
      .exec();
  }

  async getUserByPhone(phone) {
    return this.userModel.findOne({ phone }).exec();
  }

  async registerUser(createUserDto: CreateUserDto) {
    // validate DTO

    const createUser = new this.userModel(createUserDto);
    // check if user exists
    const username = await this.getUserByUsername(createUser.username);
    const phone = await this.getUserByPhone(createUser.phone);

    if (username) {
      throw new BadRequestException('This username is already taken');
    } else if (phone) {
      throw new BadRequestException('This phone is already taken');
    }
    // Hash Password
    createUser.password = await this.hashService.hashPassword(createUser.password);

    return createUser.save();
  }
}
