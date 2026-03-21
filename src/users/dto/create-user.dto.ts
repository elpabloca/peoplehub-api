import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsUrl,
  IsNumber,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  avatar: string;
}
