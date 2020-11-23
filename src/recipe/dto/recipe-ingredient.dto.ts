import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RecipeIngredientDto{
  @IsString({
    message:"Name must be a string"
  })
  @IsNotEmpty({
    message:"Name must not be empty"
  })
  name: string;

  @IsNumber()
  @IsNotEmpty({
    message:"Empty quantity"
  })
  quantity: number;

  @IsString({
    message:"Unit must be a string"
  })
  @IsNotEmpty({
    message:"Empty unit"
  })
  unit: string;
}