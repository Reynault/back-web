import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import * as Config from 'config';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      Config.get<string>('mongodb.uri'),
      Config.get<MongooseModuleOptions>('mongodb.options')),
    AuthModule,
    RecipeModule,
  ],
})
export class AppModule {
}
