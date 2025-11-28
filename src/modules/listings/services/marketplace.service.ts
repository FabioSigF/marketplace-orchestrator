import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MarketplaceService {
  private readonly logger = new Logger(MarketplaceService.name);

  async publishToMercadoLivre(product: any, credentials: any) {
    this.logger.log(`Simulando publicação no Mercado Livre...`);

    // Aqui futuramente entra o axios para API real
    await new Promise((r) => setTimeout(r, 1500));

    return {
      listingId: 'MLB-' + product.id,
      permalink: 'https://www.mercadolivre.com.br/item/' + product.id,
      status: 'active',
    };
  }
}
