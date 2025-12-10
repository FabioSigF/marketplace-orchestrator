import { MarketplaceType } from '@prisma/client';
export class CreateMarketplaceCredentialDto {
  clientId: string;
  marketplace: MarketplaceType;
  accessToken: string;
  refreshToken: string;
}
