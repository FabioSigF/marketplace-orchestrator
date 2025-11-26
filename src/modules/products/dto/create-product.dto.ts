import { CreateVariationDto } from './create-variation.dto';

export class CreateProductDto {
  clientId: string;
  sku: string;
  title: string;
  description: string;
  price: number;
  available?: boolean = true;
  variations: CreateVariationDto[];
}
