import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class IngredientEntity{
  @ApiProperty({ name: 'name', description: 'Nom de l\'ingrédient', example: 'Farine' })
  @Expose()
  @Type(() => String)
  name: string;

  @ApiProperty({ name: 'quantity', description: 'Quantité', example: '500' })
  @Expose()
  @Type(() => Number)
  quantity: number;

  @ApiProperty({ name: 'unit', description: 'Unité', example: 'g' })
  @Expose()
  @Type(() => String)
  unit: string;
}
