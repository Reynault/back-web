import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RecipeIngredientDto{
  @IsString({
    message:"Nom de type string"
  })
  @IsNotEmpty({
    message:"Nom vide"
  })
  name: string;

  @IsNumber()
  @IsNotEmpty({
    message:"Quantité vide"
  })
  quantity: number;

  @IsString({
    message:"Unité de type string"
  })
  @IsNotEmpty({
    message:"Unité vide"
  })
  unit: string;
}