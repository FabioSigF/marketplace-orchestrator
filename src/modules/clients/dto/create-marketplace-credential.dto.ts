import { MarketplaceType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
export class CreateMarketplaceCredentialDto {
  @IsUUID()
  @IsNotEmpty()
  clientId: string;
  @IsEnum(MarketplaceType)
  @IsNotEmpty()
  marketplace: MarketplaceType;
  @IsString()
  @IsNotEmpty()
  accessToken: string;
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
