import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ModifyUserDto{
  @IsString({
    message:"Username must be a string"
  })
  @IsNotEmpty({
    message:"Username must not be empty"
  })
  username: string;

  @IsString({
    message:"Password must be a string"
  })
  @IsNotEmpty({
    message:"Password must not be empty"
  })
  @IsOptional()
  password?: string;
}