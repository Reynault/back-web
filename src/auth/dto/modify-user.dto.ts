import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ModifyUserDto{
  @ApiProperty({name: 'email', description:"Email de l'utilisateur", example:'Bob@mail.com'})
  @MaxLength(50, {
    message:"Email too long"
  })
  @IsEmail()
  @IsNotEmpty({
    message:"Email must not be empty"
  })
  email?: string;

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
  firstname?: string;

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
  lastname?: string;

  @ApiPropertyOptional({name: 'password', description:'Mot de passe', example:'jZa8'})
  @MaxLength(200, {
    message:"Password too long"
  })
  @IsString({
    message:"Password must be a string"
  })
  @IsNotEmpty({
    message:"Password must not be empty"
  })
  @IsOptional()
  password?: string;
}

