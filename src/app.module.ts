import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RecipeModule } from './recipe/recipe.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import * as Config from 'config';

@Module({
  imports: [
    UserModule,
    RecipeModule,
    MongooseModule.forRoot(
      Config.get<string>('mongodb.uri'),
      Config.get<MongooseModuleOptions>('mongodb.options')),
  ],
})
export class AppModule {
}
