import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
@ApiTags('Collection 1 - Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly service: CategoriesService) {}
  @Post() @ApiOperation({ summary: 'Tạo nhóm từ vựng' }) @ApiBody({ type: CreateCategoryDto })
  create(@Body() dto: CreateCategoryDto) { return this.service.create(dto); }
  @Get() @ApiOperation({ summary: 'Danh sách nhóm từ vựng' })
  findAll() { return this.service.findAll(); }
  @Get(':id') @ApiOperation({ summary: 'Chi tiết nhóm' }) @ApiParam({ name: 'id' })
  findOne(@Param('id') id: string) { return this.service.findOne(id); }
  @Patch(':id') @ApiOperation({ summary: 'Cập nhật nhóm' })
  update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) { return this.service.update(id, dto); }
  @Delete(':id') @ApiOperation({ summary: 'Xóa nhóm (khi chưa có từ vựng)' })
  remove(@Param('id') id: string) { return this.service.remove(id); }
}
