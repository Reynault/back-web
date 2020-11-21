import { IsArray, IsInstance, IsNotEmpty, IsString, MaxLength, ValidateNested } from 'class-validator';
import { RecipeIngredientDto } from './recipe-ingredient.dto';
import { Type } from 'class-transformer';

export class CreateRecipeDto {

  @IsString({
    message:"Titre de type string"
  })
  @IsNotEmpty({
    message:"Titre vide"
  })
  title: string;

  @IsString({
    message:"Description de type string"
  })
  @IsNotEmpty({
    message:"Description non vide"
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
    message:"Les étapes doivent être sous la forme d'une liste"
  })
  @IsNotEmpty({
    each: true,
    message:"Chaque étape ne doit pas être vide"
  })
  @IsString({
    each: true,
    message: "Chaque étape doit être une string"
  })
  steps: string[];

}