import { IsString, IsNotEmpty, IsAlphanumeric } from 'class-validator';

export class LoginUserDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
