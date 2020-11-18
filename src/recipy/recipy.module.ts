import { Module } from '@nestjs/common';
import { RecipyService } from './recipy.service';
import { RecipyController } from './recipy.controller';

@Module({
  providers: [RecipyService],
  controllers: [RecipyController]
})
export class RecipyModule {}
