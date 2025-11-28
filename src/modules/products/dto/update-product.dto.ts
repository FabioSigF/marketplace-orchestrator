import { UpdateProductImageDto } from './update-product-image.dto';

export class UpdateProductDto {
  title?: string;
  description?: string;
  price?: number;
  available?: boolean;
  clientId?: string;
  sku?: string;
  images?: UpdateProductImageDto[];
  variations?: {
    id?: string; // presente = update, ausente = create
    sku: string;
    color: string;
    size: string;
    stock: number;
    price: number;
  }[];
}
