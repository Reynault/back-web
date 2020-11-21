import { Logger, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserDao } from './dao/user.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema,
    }],
  )],
  providers: [UserService, UserDao, Logger],
  controllers: [UserController],
})
export class UserModule {
}
