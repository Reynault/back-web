import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
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
import { Token } from './interfaces/token.interface';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {

  constructor(private _service: AuthService, private _log: Logger) {
  }

  @Post('login')
  login(@Body() dto: ConnectUserDto): Observable<Token | void> {
    return this._service.login(dto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  find(@Request() req): Observable<UserEntity | void> {

    return this._service.find(req.user.username);
  }

  @Post('subscribe')
  post(@Body() user: CreateUserDto): Observable<Token | void> {
    return this._service.post(user);
  }

  @Delete('profile')
  @UseGuards(JwtAuthGuard)
  delete(@Request() req): Observable<void> {
    return this._service.delete(req.user.username);
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  put(@Request() req, @Body() user: ModifyUserDto): Observable<UserEntity> {
    return this._service.put(req.user.username, user);
  }
}
