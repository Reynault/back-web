import { IsArray, IsInstance, IsNotEmpty, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { RecipeIngredientDto } from './recipe-ingredient.dto';
import { Type } from 'class-transformer';

export class ModifyRecipeDto {

  @IsString({
    message:"Title must be a string"
  })
  @IsNotEmpty({
    message:"Title must not be empty"
  })
  @IsOptional()
  title?: string;

  @IsString({
    message:"Description must be a string"
  })
  @IsNotEmpty({
    message:"Description must not be empty"
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
    message:"Steps must be an array of strings"
  })
  @IsNotEmpty({
    each: true,
    message:"Steps must not be empty"
  })
  @IsString({
    each: true,
    message: "Each step must be a string"
  })
  @IsOptional()
  steps?: string[];
}