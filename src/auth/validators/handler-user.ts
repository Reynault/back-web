import { IsNotEmpty } from 'class-validator';

export class HandlerUser {
  @IsNotEmpty({
    message: 'Username must not be empty',
  })
  username: string;
}
