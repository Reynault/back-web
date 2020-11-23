import { IsArray, IsInstance, IsNotEmpty, IsString, MaxLength, ValidateNested } from 'class-validator';
import { RecipeIngredientDto } from './recipe-ingredient.dto';
import { Type } from 'class-transformer';

export class CreateRecipeDto {

  @IsString({
    message:"Title must be string"
  })
  @IsNotEmpty({
    message:"Title must not be empty"
  })
  title: string;

  @IsString({
    message:"Description must be string"
  })
  @IsNotEmpty({
    message:"Description must not be empty"
  })
  description: string;

  @IsInstance(RecipeIngredientDto, {
    each: true
  })
  @ValidateNested({
    each: true
  })
  @Type(() => RecipeIngredientDto)
  ingredients: RecipeIngredientDto[];

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