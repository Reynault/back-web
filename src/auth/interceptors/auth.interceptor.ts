import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { merge, Observable, of } from 'rxjs';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { FastifyReply } from 'fastify';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private readonly _logger: Logger) {
  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    const response: FastifyReply = context.switchToHttp().getResponse<FastifyReply>();
    const logCtx = `AuthInterceptor`;

    return next.handle().pipe(
      map(_ => of(_)),
      mergeMap((obs: Observable<any>) =>
        merge(
          obs.pipe(
            filter(_ => !!_),
            map(_ => _),
          ),
          obs.pipe(
            filter(_ => !_),
            map(_ => _),
            // définir le comportement quand on ne trouve rien (NO CONTENT)
            tap(() => response.status(204))
          )
        ),
      ),
      tap(
        _ => this._logger.log(!!_ ? _ : 'NO CONTENT', logCtx),
        _ => this._logger.error(_.message, JSON.stringify(_), logCtx),
      ),
    );
  }

}
