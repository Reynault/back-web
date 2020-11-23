import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { AppConfig } from './interfaces/app-config.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './interfaces/swagger-config.interface';
import * as Config from 'config';
import { RecipeModule } from './recipe/recipe.module';
import { AuthModule } from './auth/auth.module';

async function bootstrap(config: AppConfig, swaggerConfig: SwaggerConfig) {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  // enable CORS for our front-end app
  app.enableCors({ origin: config.cors });

  // use global pipe validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // create swagger options
  const options = new DocumentBuilder()
    .setTitle(swaggerConfig.title)
    .setDescription(swaggerConfig.description)
    .setVersion(swaggerConfig.version)
    .addTag(swaggerConfig.tag)
    .build();

  // create swagger document
  const peopleDocument = SwaggerModule.createDocument(app, options, {
    include: [RecipeModule, AuthModule],
  });

  // setup swagger module
  SwaggerModule.setup(swaggerConfig.path, app, peopleDocument);

  await app.listen(config.port, config.host);
  Logger.log(`Application served at http://${config.host}:${config.port}`, 'bootstrap');
}

bootstrap(Config.get<AppConfig>('server'), Config.get<SwaggerConfig>('swagger'));
