import { Injectable, Logger } from '@nestjs/common';
import { CreateMarketplaceDto } from './dto/create-marketplace.dto';
import { UpdateMarketplaceDto } from './dto/update-marketplace.dto';
import { MercadoLivreAdapter } from './adapters/mercado-livre.adapter';

@Injectable()
export class MarketplacesService {
  constructor(private readonly mercadoLivre: MercadoLivreAdapter) {}

  private readonly logger = new Logger(MarketplacesService.name);

  handleMercadoLivreCallback(code: string, clientId_plataform: string) {
    return this.mercadoLivre.handleOAuthCallback(code, clientId_plataform);
  }

  getMercadoLivreAuthorizeUrl(clientId_plataform: string) {
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.ML_CLIENT_ID!,
      redirect_uri: process.env.ML_REDIRECT_URI!,
      state: clientId_plataform,
    });

    return {
      url: `https://auth.mercadolivre.com.br/authorization?${params.toString()}`,
    };
  }

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

  create(createMarketplaceDto: CreateMarketplaceDto) {
    return 'This action adds a new marketplace';
  }

  findAll() {
    return `This action returns all marketplaces`;
  }

  findOne(id: number) {
    return `This action returns a #${id} marketplace`;
  }

  update(id: number, updateMarketplaceDto: UpdateMarketplaceDto) {
    return `This action updates a #${id} marketplace`;
  }

  remove(id: number) {
    return `This action removes a #${id} marketplace`;
  }
}
