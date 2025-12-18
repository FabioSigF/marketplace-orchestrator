import { CreateVariationDto } from './create-variation.dto';
import { IsUUID, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateVariationDto extends PartialType(CreateVariationDto) {
  @IsOptional()
  @IsUUID()
  id?: string;
}
