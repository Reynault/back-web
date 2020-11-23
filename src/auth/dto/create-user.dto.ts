import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto{
  @MaxLength(50, {
    message:"Username too long"
  })
  @IsString({
    message:"Username must be a string"
  })
  @IsNotEmpty({
    message:"Username must not be empty"
  })
  username: string;

  @MaxLength(200, {
    message:"Password too long"
  })
  @IsString({
    message:"Password must be a string"
  })
  @IsNotEmpty({
    message:"Password must not be empty"
  })
  password: string;
}