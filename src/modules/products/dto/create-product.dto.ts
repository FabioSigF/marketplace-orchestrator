import {
  IsUUID,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  IsPositive,
  IsOptional,
  IsBoolean,
  IsArray,
  ArrayMinSize,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateVariationDto } from './create-variation.dto';
import { CreateProductImageDto } from './create-product-image.dto';

export class CreateProductDto {
  @IsUUID()
  @IsNotEmpty()
  clientId: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  sku: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(150)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(2000)
  description: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;

  @IsOptional()
  @IsBoolean()
  available?: boolean = true;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateVariationDto)
  variations?: CreateVariationDto[];

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateProductImageDto)
  images: CreateProductImageDto[];
}
