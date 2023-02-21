import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
    unique: true,
  })
  phone: string;

  @Prop({
    required: false,
    default: null,
  })
  address: string;
}

export const UserSchema = SchemaFactory.createForClass(User).set('toJSON', {
  versionKey: false,
  transform: function (doc, user) {
    delete user.password;
    return user;
  },
});
