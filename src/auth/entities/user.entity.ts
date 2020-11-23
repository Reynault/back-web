import { Exclude, Expose, Type } from 'class-transformer';
import { User } from '../schema/user.schema';

@Exclude()
export class UserEntity {
  @Exclude()
  @Type(() => String)
  id: string;

  @Expose()
  @Type(() => String)
  username: string;

  @Exclude()
  @Type(() => String)
  password: string;

  constructor(partial: User) {
    Object.assign(this, partial);
  }
}