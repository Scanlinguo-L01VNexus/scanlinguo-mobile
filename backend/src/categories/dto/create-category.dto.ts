import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
export class CreateCategoryDto {
  @ApiProperty({ example: 'Household objects' })
  @IsString() @IsNotEmpty() @MaxLength(100) name!: string;
  @ApiPropertyOptional({ example: 'Đồ vật trong gia đình' })
  @IsOptional() @IsString() @MaxLength(500) description?: string;
}
