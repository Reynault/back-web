import { Logger, Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Recipe, RecipeSchema } from './schemas/recipe.schema';
import { RecipeDao } from './dao/recipe.dao';

@Module({
  imports: [MongooseModule.forFeature([{
    name: Recipe.name,
    schema: RecipeSchema}]
  )],
  providers: [RecipeService, Logger, RecipeDao],
  controllers: [RecipeController]
})
export class RecipeModule {}
