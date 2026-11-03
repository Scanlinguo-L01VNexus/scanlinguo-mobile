import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
export class CreateWordDto {
  @ApiProperty({ example: 'chair' }) @IsString() @IsNotEmpty() @MaxLength(100) word!: string;
  @ApiProperty({ example: 'cái ghế' }) @IsString() @IsNotEmpty() @MaxLength(300) meaning!: string;
  @ApiPropertyOptional({ example: 'This is a chair.' }) @IsOptional() @IsString() @MaxLength(500) example?: string;
  @ApiProperty({ description: 'UUID của category đã tạo' }) @IsUUID() categoryId!: string;
}
