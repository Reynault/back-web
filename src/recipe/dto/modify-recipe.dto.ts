import { IsArray, IsInstance, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { RecipeIngredientDto } from './recipe-ingredient.dto';
import { Type } from 'class-transformer';

export class ModifyRecipeDto {
  @IsString({
    message:"Titre de type string"
  })
  @IsNotEmpty({
    message:"Titre vide"
  })
  @IsOptional()
  title?: string;

  @IsString({
    message:"Description de type string"
  })
  @IsNotEmpty({
    message:"Description non vide"
  })
  @IsOptional()
  description?: string;

  @IsInstance(RecipeIngredientDto, {
    each: true
  })
  @ValidateNested({
    each: true
  })
  @Type(() => RecipeIngredientDto)
  @IsOptional()
  ingredients?: RecipeIngredientDto[];

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
  @IsOptional()
  steps?: string[];
}