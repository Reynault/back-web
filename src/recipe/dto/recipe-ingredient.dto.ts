import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RecipeIngredientDto{

  @ApiProperty({name: 'name', description:'Nom', example:'Farine'})
  @IsString({
    message:"Name must be a string"
  })
  @IsNotEmpty({
    message:"Name must not be empty"
  })
  name: string;

  @ApiProperty({name: 'quantity', description:'Quantité', example:'500'})
  @IsNumber()
  @IsNotEmpty({
    message:"Empty quantity"
  })
  quantity: number;

  @ApiProperty({name: 'unit', description:'Unité', example:'g'})
  @IsString({
    message:"Unit must be a string"
  })
  @IsNotEmpty({
    message:"Empty unit"
  })
  unit: string;
}
