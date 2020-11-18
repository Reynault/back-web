import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RecipyModule } from './recipy/recipy.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { User } from './user';
import { Recipy } from './recipy';
import { Recipy.Dao } from './recipy.dao';
import { User.Dao } from './user.dao';
import * as Config from 'config';

@Module({
  imports: [
    UserModule,
    RecipyModule,
    MongooseModule.forRoot(
      Config.get<string>('mongodb.uri'),
      Config.get<MongooseModuleOptions>('mongodb.options'))
  ],
  controllers: [AppController],
  providers: [AppService, User, Recipy, Recipy.Dao, User.Dao],
})
export class AppModule {}
