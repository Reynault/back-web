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
import {
  ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiHeader,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse, ApiParam,
  ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('recipes')
@UseInterceptors(RecipeInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('recipes')
export class RecipeController {

  constructor(private service: RecipeService,
              private dao: RecipeDao,
              private user: AuthDao) {
  }

  @ApiOkResponse({description: 'Retourne un tableau de recettes', type: RecipeEntity, isArray: true})
  @ApiNoContentResponse( {description: 'Aucune recette dans la base de données'} )
  @Get()
  get(): Observable<RecipeEntity[] | void> {
    return this.service.find();
  }

  @ApiOkResponse({description: 'Retourne la recettes correspondant à l\'"id" donné', type: RecipeEntity})
  @ApiNotFoundResponse( {description: 'La recette avec l\'"id" donnée n\'existe pas dans la base de données.'} )
  @ApiBadRequestResponse({description: 'Le paramètre fourni n\'est pas correct'})
  @ApiParam({
    name: 'id',
    description: 'identifiant unique de la base de données',
    type: String,
    allowEmptyValue: false,
  })
  @Get(':id')
  getId(@Param() idParam: HandlerRecipe): Observable<RecipeEntity | void> {
    return this.service.findById(idParam.id);
  }

  @ApiOkResponse({description: 'Retourne toutes les recettes de l\'utilisateur', type: RecipeEntity, isArray: true})
  @ApiNoContentResponse({description: 'L\'utilisateur n\'a pas de recette'})
  @ApiUnauthorizedResponse({description: 'Aucun utilisateur n\'est connecté.'})
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

  @ApiCreatedResponse({ description: 'La recette a été créé correctement.', type: RecipeEntity })
  @ApiConflictResponse({ description: 'La recette existe déjà dans la base de données.' })
  @ApiBadRequestResponse({ description: 'Les données fournises ne sont pas correctes.' })
  @ApiBody({ description: 'Les données pour créer une nouvelle recette', type: CreateRecipeDto })
  @Post()
  @UseGuards(JwtAuthGuard)
  post(@Request() req, @Body() createRecipe: CreateRecipeDto): Observable<RecipeEntity | void> {
    return this.service.post(req.user.username, createRecipe);
  }

  @ApiNoContentResponse({ description: 'La recette a été correctement supprimée.' })
  @ApiNotFoundResponse({ description: 'La recette correspondant à l\'"id" donné n\'existe pas.' })
  @ApiBadRequestResponse({ description: 'Les données passées en paramètres ne sont pas correctes.' })
  @ApiParam({
    name: 'id',
    description: 'Identifiant unique d\'une recette dans la base de données',
    type: String,
    allowEmptyValue: false,
  })
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Request() req, @Param() idParam: HandlerRecipe): Observable<void> {
    return this.service.delete(req.user.username, idParam.id);
  }

  @ApiOkResponse({ description: 'La recette a été correctement modifiée', type: RecipeEntity })
  @ApiNotFoundResponse({ description: 'La recette correspondant à l\'"id" n\'existe pas' })
  @ApiConflictResponse({ description: 'La recette existe déjà dans la base de donnée.' })
  @ApiBadRequestResponse({ description: 'Les données en paramètre ne sont pas corrects.' })
  @ApiParam({
    name: 'id',
    description: 'Indentifiant unique de la recette dans la base de données.',
    type: String,
    allowEmptyValue: false,
  })
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  put(@Request() req, @Param() idParam: HandlerRecipe, @Body() modifyRecipe: ModifyRecipeDto):
    Observable<RecipeEntity | void> {
    return this.service.put(req.user.username, idParam.id, modifyRecipe);
  }
}
