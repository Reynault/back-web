import { Exclude, Expose, Type } from 'class-transformer';

@Exclude()
export class IngredientEntity{
  @Expose()
  @Type(() => String)
  name: string;

  @Expose()
  @Type(() => Number)
  quantity: number;

  @Expose()
  @Type(() => String)
  unit: string;
}