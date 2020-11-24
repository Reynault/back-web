import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseDocument } from 'mongoose';
import { Recipe } from '../schemas/recipe.schema';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ModifyRecipeDto } from '../dto/modify-recipe.dto';
import { CreateRecipeDto } from '../dto/create-recipe.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class RecipeDao {
  constructor(@InjectModel(Recipe.name) private readonly _recipeModel: Model<Recipe>,
              private readonly _log: Logger) {
  }

  find(): Observable<Recipe[] | void> {
    return from(this._recipeModel.find({})).pipe(
      map((docs: MongooseDocument[]) =>
        (!!docs && docs.length > 0) ?
          docs.map(_ => _.toJSON()) :
          undefined,
      ),
    );
  }

  findById(id: string): Observable<Recipe | void> {
    return from(this._recipeModel.findById(id)).pipe(
      map((doc: MongooseDocument) =>
        !!doc ?
          doc.toJSON() :
          undefined,
      ),
    );
  }

  deleteById(id: string): Observable<Recipe | void> {
    return from(this._recipeModel.findByIdAndRemove(id)).pipe(
      map((doc: MongooseDocument) => !!doc ? doc.toJSON() : undefined),
    );
  }

  updateById(id: string, modif: ModifyRecipeDto): Observable<Recipe | void> {
    return from(this._recipeModel.findByIdAndUpdate(id, modif)).pipe(
      map((doc: MongooseDocument) => !!doc
        ? doc.toJSON()
        : undefined,
      ));
  }

  save(createRecipeDto: CreateRecipeDto): Observable<Recipe> {
    return from(new this._recipeModel(createRecipeDto).save()).pipe(
      map((doc: MongooseDocument) => doc.toJSON()));
  }

  findByUser(recipes: mongoose.Types.ObjectId[]): Observable<Recipe[] | void>{
    return from(this._recipeModel.find({_id : {$in : recipes}})).pipe(
      map((docs : MongooseDocument[]) => (docs.length > 0 && !!docs)
        ? docs.map(_ => _.toJSON())
        : undefined
      )
    );
  }

}
