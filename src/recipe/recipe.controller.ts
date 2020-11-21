import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Observable } from 'rxjs';
import { RecipeEntity } from './entities/recipe.entity';
import { HandlerRecipe } from './validators/handler-recipe';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { ModifyRecipeDto } from './dto/modify-recipe.dto';
import { RecipeInterceptor } from './interceptors/recipe.interceptor';

@UseInterceptors(RecipeInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('recipes')
export class RecipeController {

  constructor(private service: RecipeService) {
  }

  @Get()
  get(): Observable<RecipeEntity[] | void> {
    return this.service.find();
  }

  @Get(':id')
  getId(@Param() idParam: HandlerRecipe): Observable<RecipeEntity | void>{
    return this.service.findById(idParam.id);
  }

  @Delete(':id')
  delete(@Param() idParam: HandlerRecipe): Observable<void> {
    return this.service.delete(idParam.id);
  }

  @Post()
  post(@Body() createRecipe: CreateRecipeDto): Observable<RecipeEntity | void> {
    return this.service.post(createRecipe);
  }

  @Put(':id')
  put(@Param() idParam: HandlerRecipe, @Body() modifyRecipe: ModifyRecipeDto): Observable<RecipeEntity | void> {
    return this.put(idParam, modifyRecipe);
  }
}
