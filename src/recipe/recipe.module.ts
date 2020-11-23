import { forwardRef, Logger, Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './schemas/recipe.schema';
import { RecipeDao } from './dao/recipe.dao';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{
        name: Recipe.name,
        schema: RecipeSchema,
      }],
    )],
  providers: [RecipeService, RecipeDao, Logger],
  controllers: [RecipeController],
  exports: [RecipeDao]
})
export class RecipeModule {
}
