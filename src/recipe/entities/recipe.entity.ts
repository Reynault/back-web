import { Exclude, Expose, Type } from 'class-transformer';
import { IngredientEntity } from './ingredient.entity';
import { Recipe } from '../schemas/recipe.schema';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class RecipeEntity {
  @ApiProperty({ name: 'id', description: 'Identifiant unique de la base de données', example: '5fba95ff72378169c129493d' })
  @Expose()
  @Type(() => String)
  id: string;

  @ApiProperty({ name: 'username', description: "nom de l'utilisateur", example: 'bob' })
  @Expose()
  @Type(() => String)
  username: string;

  @ApiProperty({ name: 'title', description: 'Titre', example: 'Crêpes' })
  @Expose()
  @Type(() => String)
  title: string;

  @ApiProperty({ name: 'description', description: 'Descrition', example: 'Superbe recette des crêpes' })
  @Expose()
  @Type(() => String)
  description: string;

  @ApiProperty({ name: 'ingredients', description: 'Ingrédients', example: [{"name":"Oeufs","quantity":3,"unit":"entier(s)"},{"name":"Farine","quantity":300,"unit":"g"},{"name":"Lait","quantity":60,"unit":"cl"}], type:[IngredientEntity]})
  @Expose()
  @Type(() => IngredientEntity)
  ingredients: IngredientEntity[];

  @ApiProperty({ name: 'steps', description: 'Etapes', example: '[\'Mélange la farine, les oeufs et le lait.\',\'Cuire les crêpes dans une poêle chaude\']', type:[String] })
  @Expose()
  @Type(() => String)
  steps: string[];

  constructor(partial: Recipe) {
    Object.assign(this, partial);
  }
}
