import { IsMongoId, IsNotEmpty } from 'class-validator';

export class HandlerRecipe{
  @IsMongoId({
    message : "L'id doit correspondre à un identifiant de MongoDB"
  })
  @IsNotEmpty({
    message : "L'id ne doit pas être vide"
  })
  id: string;
}