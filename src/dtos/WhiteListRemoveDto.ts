import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class WhiteListRemoveDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
