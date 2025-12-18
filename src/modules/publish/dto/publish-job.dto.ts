import { IsNotEmpty, IsUUID } from 'class-validator';

export class PublishJobDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;
  @IsUUID()
  @IsNotEmpty()
  clientId: string;
}
