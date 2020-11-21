import { IsMongoId, IsNotEmpty } from 'class-validator';

export class HandlerRecipe{
  @IsMongoId()
  @IsNotEmpty()
  id: string;
}