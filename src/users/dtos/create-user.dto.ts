import { IsString, IsNotEmpty, IsPhoneNumber, IsAlphanumeric, IsStrongPassword, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsAlphanumeric()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('EG')
  phone: string;

  @IsOptional()
  @IsString()
  address: string;
}
