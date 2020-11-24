import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserDto{
  @ApiProperty({name: 'username', description:'Nom d\'utilisateur', example:'Bob'})
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

  @ApiProperty({name: 'password', description:'Mot de passe', example:'jZa8'})
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

