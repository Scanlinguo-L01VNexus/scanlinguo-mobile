import { Module } from '@nestjs/common';
import { JsonStore } from '../common/json-store';
import { VocabularyController } from './vocabulary.controller';
import { VocabularyService } from './vocabulary.service';
@Module({controllers:[VocabularyController],providers:[VocabularyService,JsonStore]})
export class VocabularyModule {}
