import { Exclude, Expose, Type } from 'class-transformer';
import { IngredientEntity } from './ingredient.entity';
import { Recipe } from '../schemas/recipe.schema';

@Exclude()
export class RecipeEntity {
  @Expose()
  @Type(() => String)
  id: string;

  @Expose()
  @Type(() => String)
  title: string;

  @Expose()
  @Type(() => String)
  description: string;

  @Expose()
  @Type(() => IngredientEntity)
  ingredients: IngredientEntity[];

  @Expose()
  @Type(() => String)
  steps: string[];

  @Expose()
  @Type(() => String)
  linked: string[];

  constructor(partial: Recipe) {
    Object.assign(this, partial);
  }
}