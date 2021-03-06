import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { ModifyUserDto } from './dto/modify-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from './strategies/jwt.strategy';
import { ConnectUserDto } from './dto/connect-user.dto';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TokenEntity } from './entities/token.entity';
import { HandlerUser } from './validators/handler-user';
import { AuthInterceptor } from './interceptors/auth.interceptor';


@ApiTags('authentification')
@Controller()
@UseInterceptors(AuthInterceptor)
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

  constructor(private _service: AuthService, private _log: Logger) {
  }

  @ApiCreatedResponse({ description: 'La connexion a bien été effectué', type: TokenEntity })
  @ApiBadRequestResponse({ description: 'Cet utilisateur n\'existe pas' })
  @Post('login')
  login(@Body() dto: ConnectUserDto): Observable<TokenEntity | void> {
    return this._service.login(dto);
  }


  @ApiOkResponse({ description: 'Retourne le profil de l\'utilisateur', type: UserEntity })
  @ApiUnauthorizedResponse({ description: 'Aucun utilisateur n\'est connecté.' })
  @Get('profile/:username')
  find(@Param() user: HandlerUser): Observable<UserEntity | void> {
    this._log.log(user.username);
    return this._service.find(user.username);
  }

  @ApiCreatedResponse({ description: 'Le profil a bien été supprimé', type: TokenEntity })
  @ApiUnauthorizedResponse({ description: 'Aucun utilisateur n\'est connecté.' })
  @ApiConflictResponse({ description: 'L\'utilisateur existe déjà dans la base de données.' })
  @ApiBadRequestResponse({ description: 'Les données envoyées ne sont pas correctes' })
  @Post('subscribe')
  post(@Body() user: CreateUserDto): Observable<TokenEntity | void> {
    return this._service.post(user);
  }

  @ApiOkResponse({ description: 'La connexion a bien été effectué' })
  @ApiUnauthorizedResponse({ description: 'Aucun utilisateur n\'est connecté.' })
  @Delete('profile')
  @UseGuards(JwtAuthGuard)
  delete(@Request() req): Observable<void> {
    return this._service.delete(req.user.username);
  }

  @ApiOkResponse({ description: 'La connexion a bien été effectué', type: UserEntity })
  @ApiUnauthorizedResponse({ description: 'Aucun utilisateur n\'est connecté.' })
  @ApiBadRequestResponse({ description: 'Les données envoyées ne sont pas correctes' })
  @Put('profile')
  @UseGuards(JwtAuthGuard)
  put(@Request() req, @Body() user: ModifyUserDto): Observable<UserEntity> {
    return this._service.put(req.user.username, user);
  }
}
