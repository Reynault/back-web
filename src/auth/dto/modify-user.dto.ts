import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ModifyUserDto{
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

