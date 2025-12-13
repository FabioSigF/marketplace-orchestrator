import { Module } from '@nestjs/common';
import { PublishService } from './publish.service';
import { PublishController } from './publish.controller';
import { BullModule } from '@nestjs/bull';
import { PublishProcessor } from './publish.processor';
import { ClientsModule } from '../clients/clients.module';
import { MarketplacesModule } from '../marketplaces/marketplaces.module';
import { ListingsModule } from '../listings/listings.module';
import { PrismaModule } from '../prisma/prisma.module';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'publish-product',
    }),
    QueueModule,
    ClientsModule,
    MarketplacesModule,
    ListingsModule,
    PrismaModule,
  ],
  controllers: [PublishController],
  providers: [PublishService, PublishProcessor],
  exports: [PublishService],
})
export class PublishModule {}
