import { Injectable, Logger } from '@nestjs/common';
import { CreateMarketplaceDto } from './dto/create-marketplace.dto';
import { UpdateMarketplaceDto } from './dto/update-marketplace.dto';

@Injectable()
export class MarketplacesService {
  private readonly logger = new Logger(MarketplacesService.name);

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
