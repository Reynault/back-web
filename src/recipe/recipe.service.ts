import {
  ClassSerializerInterceptor,
  ConflictException,
  Injectable, Logger, NotFoundException,
  UnprocessableEntityException,
  UseInterceptors,
} from '@nestjs/common';
import { RecipeDao } from './dao/recipe.dao';
import { Observable, of, throwError } from 'rxjs';
import { RecipeEntity } from './entities/recipe.entity';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { ModifyRecipeDto } from './dto/modify-recipe.dto';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(private readonly _dao: RecipeDao,
              private readonly _log: Logger){}

  find(): Observable<RecipeEntity[] | void>{
    return this._dao.find().pipe(
      map(_ => !!_
        ? _.map(_ => new RecipeEntity(_))
        : undefined)
    );
  }

  findById(id: string): Observable<RecipeEntity | void>{
    return this._dao.findById(id).pipe(
      map(_ => !!_ ? new RecipeEntity(_) : undefined)
    );
  }

  delete(id: string): Observable<void>{
    return this._dao.deleteById(id).pipe(
      // vérification de la suppression
      mergeMap( _ => !!_
        ? of(undefined)
        : throwError(
          new NotFoundException("Recette non trouvée")
        )
      )
    );
  }

  put(id: string, modifyRecipyDto: ModifyRecipeDto): Observable<RecipeEntity | void>{
    return this._dao.updateById(id, modifyRecipyDto).pipe(
      map(_ => !!_ ? new RecipeEntity(_) : undefined),
      // gestion des erreurs
      catchError(err =>
        err === 11000 // erreur en cas de valeur indexée non présente (ici le titre)
          ? throwError(new ConflictException("La recette doit posséder un titre"))
          : throwError(new UnprocessableEntityException(err.message))
      ),
      // vérification de la présence de la nouvelle recette
      mergeMap(_ => !!_
        ? of(_)
        : throwError(new NotFoundException("Recette non trouvée"))
      )
    );
  }

  post(createRecipyDto: CreateRecipeDto): Observable<RecipeEntity>{
    return this._dao.save(createRecipyDto).pipe(
      map(_ => new RecipeEntity(_)),
      // gestion des erreurs
      catchError(err => // erreur inconnue lors de l'insertion
        throwError(new UnprocessableEntityException(err.message))
      ),
    );
  }
}
