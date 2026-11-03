import { Module, Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesModule } from './categories/categories.module';
import { VocabularyModule } from './vocabulary/vocabulary.module';

@ApiTags('Health')
@Controller()
class HealthController {
  @Get()
  @ApiOperation({ summary: 'Kiểm tra backend đang chạy' })
  status() { return { status: 'ok', name: 'Scanlinguo API', swagger: '/docs' }; }
}
@Module({ imports: [CategoriesModule, VocabularyModule], controllers: [HealthController] })
export class AppModule {}
