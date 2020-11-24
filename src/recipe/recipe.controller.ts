import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { Observable } from 'rxjs';
import { RecipeEntity } from './entities/recipe.entity';
import { HandlerRecipe } from './validators/handler-recipe';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { ModifyRecipeDto } from './dto/modify-recipe.dto';
import { RecipeInterceptor } from './interceptors/recipe.interceptor';
import { JwtAuthGuard } from '../auth/strategies/jwt.strategy';
import { RecipeDao } from './dao/recipe.dao';
import { AuthDao } from '../auth/dao/auth.dao';

@UseInterceptors(RecipeInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('recipes')
export class RecipeController {

  constructor(private service: RecipeService,
              private dao: RecipeDao,
              private user: AuthDao) {
  }

  @Get()
  get(): Observable<RecipeEntity[] | void> {
    return this.service.find();
  }

  @Get(':id')
  getId(@Param() idParam: HandlerRecipe): Observable<RecipeEntity | void> {
    return this.service.findById(idParam.id);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  getFromUser(@Request() req): Observable<RecipeEntity[] | void> {
    return this.service.findFromUser(req.user.username);
  }

  @Get('has')
  @UseGuards(JwtAuthGuard)
  hasRecipe(@Request() req, @Query() idParam: HandlerRecipe): Observable<boolean> {
    return this.service.userHasRecipe(idParam.id, req.user.username);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  post(@Request() req, @Body() createRecipe: CreateRecipeDto): Observable<RecipeEntity | void> {
    return this.service.post(req.user.username, createRecipe);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Request() req, @Param() idParam: HandlerRecipe): Observable<void> {
    return this.service.delete(req.user.username, idParam.id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  put(@Request() req, @Param() idParam: HandlerRecipe, @Body() modifyRecipe: ModifyRecipeDto):
    Observable<RecipeEntity | void> {
    return this.service.put(req.user.username, idParam.id, modifyRecipe);
  }
}
