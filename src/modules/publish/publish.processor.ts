import { Process, Processor } from '@nestjs/bull';
import bull from 'bull';
import { PublishJobDto } from './dto/publish-job.dto';
import { Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ClientsService } from '../clients/clients.service';
import { MarketplacesService } from '../marketplaces/marketplaces.service';
import { ListingsService } from '../listings/listings.service';

@Processor('publish-product')
export class PublishProcessor {
  private readonly logger = new Logger(PublishProcessor.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly clientsService: ClientsService,
    private readonly marketplace: MarketplacesService,
    private readonly listings: ListingsService,
  ) {}

  @Process('publish')
  async handle(job: bull.Job<PublishJobDto>) {
    try {
      const { productId, clientId } = job.data;

      this.logger.log(`Iniciando processamento do produto ${productId}`);

      // 1 — Buscar produto
      const product = await this.prisma.product.findUnique({
        where: { id: productId },
        include: { variations: true, images: true },
      });

      if (!product) {
        throw new Error(`Product ${productId} not found`);
      }

      // 2 — Buscar credenciais
      const credentials =
        await this.clientsService.getMarketplaceCredentials(clientId);

      if (!credentials) {
        throw new Error(`Credentials for client ${clientId} not found`);
      }

      // 3 — Publicar no Mercado Livre
      const publishResult = await this.marketplace.publishToMercadoLivre(
        product,
        credentials,
      );

      // 4 — Atualizar tabela Listing
      await this.listings.upsertListing({
        productId,
        clientId,
        marketplace: 'MERCADO_LIVRE',
        marketplaceListingId: publishResult.listingId,
        permalink: publishResult.permalink,
        status: publishResult.status,
      });

      this.logger.log(`Produto ${productId} publicado com sucesso!`);

      // 5 — Retornar resultado final
      return { success: true, publishResult };
    } catch (error) {
      this.logger.error(
        `Erro ao processar o job ${job.id} para o produto ${job.data.productId}: ${error}`,
      );
      throw error;
    }
  }
}
