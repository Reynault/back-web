import { Exclude, Expose, Type } from 'class-transformer';
import { User } from '../schema/user.schema';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UserEntity {
  @ApiProperty({name: 'id', description: 'Identifiant unique dans la base de données', example:'5fbcf8ed6a14c9ae26e46d85'})
  @Exclude()
  @Type(() => String)
  id: string;

  @ApiProperty({name:'username', description:'Identifiant', example:'Bob'})
  @Expose()
  @Type(() => String)
  username: string;

  @ApiProperty({name:'email', description:'Email', example:'Bob@mail.com'})
  @Expose()
  @Type(() => String)
  email: string;

  @ApiProperty({name:'firstname', description:'Nom', example:'Bob'})
  @Expose()
  @Type(() => String)
  firstname: string;

  @ApiProperty({name:'lastname', description:'Prénom', example:'Ross'})
  @Expose()
  @Type(() => String)
  lastname: string;

  @ApiProperty({name:'password', description:'Mot de passe', example:'jZa8'})
  @Exclude()
  @Type(() => String)
  password: string;

  constructor(partial: User) {
    Object.assign(this, partial);
  }
}
