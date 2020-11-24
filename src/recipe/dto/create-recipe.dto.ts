import { IsArray, IsInstance, IsNotEmpty, IsString, MaxLength, ValidateNested } from 'class-validator';
import { RecipeIngredientDto } from './recipe-ingredient.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IngredientEntity } from '../entities/ingredient.entity';

export class CreateRecipeDto {

  @ApiProperty({name: 'title', description: 'Titre', example: 'Crêpes'})
  @IsString({
    message:"Title must be string"
  })
  @IsNotEmpty({
    message:"Title must not be empty"
  })
  title: string;

  @ApiProperty({name: 'desciption', description: 'Description', example: 'Superbe recette de crêpes'})
  @IsString({
    message:"Description must be string"
  })
  @IsNotEmpty({
    message:"Description must not be empty"
  })
  description: string;

  @ApiProperty({name: 'ingredients', description: 'Ingredients', example: [{"name":"Oeufs","quantity":3,"unit":"entier(s)"},{"name":"Farine","quantity":300,"unit":"g"},{"name":"Lait","quantity":60,"unit":"cl"}], type:[IngredientEntity]})
  @IsInstance(RecipeIngredientDto, {
    each: true
  })
  @ValidateNested({
    each: true
  })
  @Type(() => RecipeIngredientDto)
  ingredients: RecipeIngredientDto[];

  @ApiProperty({name: 'steps', description: 'Etapes', example: '[\'Mélange la farine, les oeufs et le lait.\',\'Cuire les crêpes dans une poêle chaude\']'})
  @IsArray({
    message: "Steps must be an array of strings"
  })
  @IsNotEmpty({
    each: true,
    message:"Steps must not be empty"
  })
  @IsString({
    each: true,
    message: "Each step must be a string"
  })
  steps: string[];

}
