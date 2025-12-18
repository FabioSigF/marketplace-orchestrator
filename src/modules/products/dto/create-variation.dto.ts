import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsInt,
  Min,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateVariationDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  sku: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  color: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  size: string;

  @IsInt()
  @Min(0)
  stock: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  price: number;
}
