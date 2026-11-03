import { Module } from '@nestjs/common';
import { JsonStore } from '../common/json-store';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
@Module({controllers:[CategoriesController],providers:[CategoriesService,JsonStore]})
export class CategoriesModule {}
