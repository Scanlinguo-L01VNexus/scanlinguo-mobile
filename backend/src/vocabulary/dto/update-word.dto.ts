import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
export class UpdateWordDto {
  @ApiPropertyOptional({ example: 'table' }) @IsOptional() @IsString() @IsNotEmpty() @MaxLength(100) word?: string;
  @ApiPropertyOptional({ example: 'cái bàn' }) @IsOptional() @IsString() @IsNotEmpty() @MaxLength(300) meaning?: string;
  @ApiPropertyOptional({ example: 'This is a table.' }) @IsOptional() @IsString() @MaxLength(500) example?: string;
  @ApiPropertyOptional() @IsOptional() @IsUUID() categoryId?: string;
}
