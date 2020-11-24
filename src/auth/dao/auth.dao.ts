import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseDocument, Schema } from 'mongoose';
import { User } from '../schema/user.schema';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap, tap } from 'rxjs/operators';
import { CreateUserDto } from '../dto/create-user.dto';
import { ModifyUserDto } from '../dto/modify-user.dto';
import { RecipeDao } from '../../recipe/dao/recipe.dao';
import * as mongoose from 'mongoose';

@Injectable()
export class AuthDao {
  constructor(@InjectModel(User.name) private readonly _userModel: Model<User>,
              private readonly _recipeDao: RecipeDao,
              private readonly _log: Logger) {
  }

  findOneByLogin(username: string): Observable<User | void> {
    return from(this._userModel.findOne({ username: username })).pipe(
      map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
    );
  }

  save(user: CreateUserDto): Observable<User> {
    return of(user).pipe(
      mergeMap(user =>
        from(new this._userModel(user).save()).pipe(
          map(_ => _.toJSON()),
        )));
  }

  delete(username: string): Observable<User | void> {
    return from(this._userModel.findOneAndRemove({username: username})).pipe(
      map(_ => !!_ ? _.toJSON() : undefined),
      tap(_ => !!_ ? _.recipes.map(_ => this._recipeDao.deleteById(_)) : _),
    );
  }

  hasRecipe(recipeId: string, username: string): Observable<boolean> {
    return from(this._userModel.exists({
      username: username,
      recipes: {$in: [mongoose.Types.ObjectId(recipeId)]}
    }));
  }

  put(username: string, user: ModifyUserDto): Observable<User | void> {
    return from(this._userModel.findOneAndUpdate({username: username}, {password: user.password})).pipe(
      map(_ => !!_ ? _.toJSON() : undefined),
    );
  }

  addRecipe(recipeId: string, username: string): Observable<any>{
    return from(this._userModel.findOneAndUpdate(
      {username: username},
      {$addToSet : {recipes : mongoose.Types.ObjectId(recipeId)}})
    );
  }

  removeRecipe(recipeId: string, username: string): Observable<any>{
    return from(this._userModel.findOneAndUpdate(
      {username: username},
      {$pull : {recipes : mongoose.Types.ObjectId(recipeId)}})
    );
  }

  exists(username: string): Observable<boolean>{
    return from(this._userModel.exists({username: username}));
  }
}
