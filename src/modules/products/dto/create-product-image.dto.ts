import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateProductImageDto {
  @IsUrl()
  @IsNotEmpty()
  url: string;
  @IsOptional()
  @IsString()
  @MaxLength(150)
  alt?: string;
}
