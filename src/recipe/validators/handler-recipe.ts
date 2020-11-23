import { IsMongoId, IsNotEmpty } from 'class-validator';

export class HandlerRecipe{
  @IsMongoId({
    message : "Id must be a mongoDB id"
  })
  @IsNotEmpty({
    message : "Id must not be empty"
  })
  id: string;
}