import { UpdateProductImageDto } from './update-product-image.dto';
import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  IsNumber,
  IsPositive,
  IsBoolean,
  IsUUID,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateVariationDto } from './update-variation.dto';

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(150)
  title?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  description?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price?: number;

  @IsOptional()
  @IsBoolean()
  available?: boolean;

  @IsOptional()
  @IsUUID()
  clientId?: string;

  @IsOptional()
  @IsString()
  @MaxLength(50)
  sku?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateProductImageDto)
  images?: UpdateProductImageDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateVariationDto)
  variations?: UpdateVariationDto[];
}
