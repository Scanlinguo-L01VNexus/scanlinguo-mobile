import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { VocabularyService } from './vocabulary.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
@ApiTags('Collection 2 - Vocabulary')
@Controller('vocabulary')
export class VocabularyController {
  constructor(private readonly service: VocabularyService) {}
  @Post() @ApiOperation({ summary: 'Thêm từ vựng' }) @ApiBody({ type: CreateWordDto })
  create(@Body() dto: CreateWordDto) { return this.service.create(dto); }
  @Get() @ApiOperation({ summary: 'Xem danh sách hoặc lọc theo categoryId' })
  @ApiQuery({ name: 'categoryId', required: false, type: String })
  findAll(@Query('categoryId') categoryId?: string) { return this.service.findAll(categoryId); }
  @Get(':id') @ApiOperation({ summary: 'Chi tiết từ vựng' })
  findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Patch(':id') @ApiOperation({ summary: 'Cập nhật từ vựng' })
  update(@Param('id') id: string, @Body() dto: UpdateWordDto) { return this.service.update(id, dto); }
  @Delete(':id') @ApiOperation({ summary: 'Xóa từ vựng' })
  remove(@Param('id') id: string) { return this.service.remove(id); }
}
