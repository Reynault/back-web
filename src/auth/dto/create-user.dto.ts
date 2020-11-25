import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

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

  @ApiProperty({name: 'email', description:"Email de l'utilisateur", example:'Bob@mail.com'})
  @MaxLength(50, {
    message:"Email too long"
  })
  @IsEmail()
  @IsNotEmpty({
    message:"Email must not be empty"
  })
  email: string;

  @ApiProperty({name: 'email', description:"Nom de l'utilisateur", example:'Ross'})
  @MaxLength(50, {
    message:"Firstname too long"
  })
  @IsString({
    message:"Firstname must be a string"
  })
  @IsNotEmpty({
    message:"Firstname must not be empty"
  })
  firstname: string;

  @ApiProperty({name: 'lastname', description:"Prénom de l'utilisateur", example:'Bob'})
  @MaxLength(50, {
    message:"Lastname too long"
  })
  @IsString({
    message:"Lastname must be a string"
  })
  @IsNotEmpty({
    message:"Lastname must not be empty"
  })
  lastname: string;

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

