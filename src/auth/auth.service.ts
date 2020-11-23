import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConnectUserDto } from './dto/connect-user.dto';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { ModifyUserDto } from './dto/modify-user.dto';
import { AuthDao } from './dao/auth.dao';

@Injectable()
export class AuthService {

  private _alreadyExists = 'User already exists';
  private _notFound = 'User not found';

  constructor(
    private _dao: AuthDao,
    private _jwtService: JwtService,
    private _log: Logger,
  ) {
  }

  findUserAndValidate(givenUser: ConnectUserDto): Observable<UserEntity | void> {
    return this.find(givenUser.username).pipe(
      mergeMap(user =>
        of(this.comparePassword(givenUser.password, user.password)).pipe(
          map(_ => _ ? user : undefined),
        ),
      ),
    );
  }

  generateJWT(user: UserEntity): any {
    return { access_token: this._jwtService.sign({ username: user.username }) };
  }

  comparePassword(givenPass: string, userPass: string): Observable<boolean> {
    return bcrypt.compareSync(givenPass, userPass);
  }

  hashPassword(passToHash: string): any {
    return { password: bcrypt.hashSync(passToHash, 10) };
  }

  post(user: CreateUserDto): Observable<any> {
    return of(user).pipe(
      map(user => Object.assign(user, this.hashPassword(user.password))),
      mergeMap(user =>
        this._dao.save(user).pipe(
          map(_ => !!_ ? new UserEntity(_) : undefined),
          catchError(err =>
            err.code === 11000
              ? throwError(new ConflictException(this._alreadyExists))
              : throwError(new UnprocessableEntityException(err.message)),
          ),
        ),
      ),
      map(_ => this.generateJWT(_)),
    );
  }

  put(username: string, user: ModifyUserDto): Observable<UserEntity> {
    return of(user).pipe(
      map(user => Object.assign(user, this.hashPassword(user.password))),
      mergeMap(user =>
        this._dao.put(username, user).pipe(
          catchError(err =>
            err.code === 11000
              ? throwError(new ConflictException(this._alreadyExists))
              : throwError(new UnprocessableEntityException(err.message)),
          ),
          mergeMap(_ => !!_
            ? of(new UserEntity(_))
            : throwError(new NotFoundException(this._notFound)),
          ))));
  }

  delete(id: string): Observable<void> {
    return this._dao.delete(id).pipe(
      mergeMap(_ => !!_
        ? of(undefined)
        : throwError(new NotFoundException(this._notFound)),
      ),
    );
  }

  find(username: string): Observable<UserEntity> {
    return this._dao.findOneByLogin(username).pipe(
      map(_ => !!_ ? new UserEntity(_) : undefined),
      mergeMap(_ => !!_
        ? of(_)
        : throwError(new NotFoundException(this._notFound)),
      ),
    );
  }

  login(user: ConnectUserDto): Observable<any> {
    return of(user).pipe(
      mergeMap(_ => this.findUserAndValidate(_)),
      mergeMap(user => !!user
        ? of(this.generateJWT(user))
        : throwError(new UnauthorizedException('User not found')),
      ),
    );
  }
}
