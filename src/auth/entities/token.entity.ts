import { Exclude, Expose, Type } from 'class-transformer';
import { User } from '../schema/user.schema';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class TokenEntity {

  @ApiProperty({name: 'access_token', description: 'Le token', example:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuZ2VsYSIsImlhdCI6MTYwNjIyMDA4OSwiZXhwIjoxNjA2MjIwNDQ5fQ.XvgagyYmWd-vW1WGYoHPLGTpq-TUjFnJgbX16UYV2Rk'})
  @Exclude()
  @Type(() => String)
  access_token: string;

  @ApiProperty({name:'expiry', description:'Le temps avant expiration du token', example:'360000'})
  @Expose()
  @Type(() => String)
  expiry: number;

  @ApiProperty({name:'username', description:'Le nom d\'utilisateur', example:'Bob'})
  @Exclude()
  @Type(() => String)
  username: string;

  constructor(partial: User) {
    Object.assign(this, partial);
  }
}
