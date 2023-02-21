import { Match } from './../../common/decorators/match.decorator';
import { IsString, Matches, MinLength, MaxLength } from 'class-validator';

export class UpdateUserPasswordDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Match('password', { message: 'password_confirmation must match password' })
  password_confirmation: string;
}
