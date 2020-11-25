import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { RecipeDao } from './dao/recipe.dao';
import { from, Observable, of, throwError } from 'rxjs';
import { RecipeEntity } from './entities/recipe.entity';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';
import { ModifyRecipeDto } from './dto/modify-recipe.dto';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { AuthDao } from '../auth/dao/auth.dao';

@Injectable()
export class RecipeService {
  private _notFound = 'Recipe not Found';
  private _alreadyExist = 'Recipe already exists';
  private _unauthorized = 'Unauthorized user';

  constructor(private readonly _dao: RecipeDao,
              private readonly _user: AuthDao,
              private readonly _log: Logger) {
  }

  find(): Observable<RecipeEntity[] | void> {
    return this._dao.find().pipe(
      map(_ => !!_
        ? _.map(_ => new RecipeEntity(_))
        : undefined),
    );
  }

  findById(id: string): Observable<RecipeEntity | void> {
    return this._dao.findById(id).pipe(
      map(_ => !!_ ? new RecipeEntity(_) : undefined),
      mergeMap(_ => !!_
        ? of(_)
        : throwError(new NotFoundException(this._notFound)),
      ),
    );
  }

  findFromUser(username: string): Observable<RecipeEntity[] | void>{
    return this._user.find(username).pipe(
      mergeMap(_ => !!_
        ? this._dao.findByUser(_.recipes).pipe(
          map(_ => !!_
            ? _.map(_ => new RecipeEntity(_))
            : undefined
          )
        )
        : throwError(new NotFoundException(this._notFound))
      )
    );
  }

  delete(username: string, id: string): Observable<void> {
    return this._user.hasRecipe(id, username).pipe(
      mergeMap(_ => _
        ? this._dao.deleteById(id).pipe(
          // vérification de la suppression
          mergeMap(_ => !!_
            ? this._user.removeRecipe(id, username)
            : throwError(new NotFoundException(this._notFound)),
          ),
        )
        : throwError(new UnauthorizedException(this._unauthorized)),
      ),
      map(() => undefined),
    );
  }

  put(username: string, id: string, modifyRecipyDto: ModifyRecipeDto): Observable<RecipeEntity | void> {
    return this._user.hasRecipe(id, username).pipe(
      mergeMap(_ => _
        ? this._dao.updateById(id, modifyRecipyDto).pipe(
          map(_ => !!_ ? new RecipeEntity(_) : undefined),
          // gestion des erreurs
          catchError(err =>
            err.code === 11000 // erreur en cas de valeur indexée non présente (ici le titre)
              ? throwError(new ConflictException(this._alreadyExist))
              : throwError(new UnprocessableEntityException(err.message)),
          ),
          // vérification de la présence de la nouvelle recette
          mergeMap(_ => !!_
            ? of(_)
            : throwError(new NotFoundException(this._notFound)),
          ),
        )
        : throwError(new UnauthorizedException(this._unauthorized)),
      ),
    );
  }

  post(username: string, createRecipyDto: CreateRecipeDto): Observable<RecipeEntity> {
    return this._dao.save(createRecipyDto).pipe(
      map(_ => new RecipeEntity(_)),
      tap(recipe => this._user.addRecipe(recipe.id, username).subscribe()),
      // gestion des erreurs
      catchError(err => // erreur inconnue lors de l'insertion
        err.code === 11000
          ? throwError(new ConflictException(this._alreadyExist))
          : throwError(new UnprocessableEntityException(err.message)),
      ),
    );
  }

  userHasRecipe(recipeId: string, username: string): Observable<boolean>{
    return this._user.hasRecipe(recipeId, username);
  }
}
