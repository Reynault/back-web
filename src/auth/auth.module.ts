import { forwardRef, Logger, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from '../constants';
import { AuthDao } from './dao/auth.dao';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { RecipeModule } from '../recipe/recipe.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{
        name: User.name,
        schema: UserSchema,
      }],
    ),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expireTime },
    }),
    PassportModule,
    forwardRef(() => RecipeModule),
  ],
  providers: [AuthService, AuthDao, JwtStrategy, Logger],
  controllers: [AuthController],
  exports: [AuthDao],
})
export class AuthModule {
}
