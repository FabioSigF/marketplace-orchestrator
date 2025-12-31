import { Module } from '@nestjs/common';
import { MarketplacesService } from './marketplaces.service';
import { MarketplacesController } from './marketplaces.controller';
import { MercadoLivreAdapter } from './adapters/mercado-livre.adapter';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [MarketplacesController],
  providers: [MarketplacesService, MercadoLivreAdapter],
  exports: [MarketplacesService, MercadoLivreAdapter],
})
export class MarketplacesModule {}
