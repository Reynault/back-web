import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RecipyModule } from './recipy/recipy.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import * as Config from 'config';
import { RecipyDao } from './recipy/dao/recipy.dao';
import { UserDao } from './user/dao/user.dao';

@Module({
  imports: [
    UserModule,
    RecipyModule,
    MongooseModule.forRoot(
      Config.get<string>('mongodb.uri'),
      Config.get<MongooseModuleOptions>('mongodb.options'))
  ],
  controllers: [AppController],
  providers: [AppService, RecipyDao, UserDao],
})
export class AppModule {}
