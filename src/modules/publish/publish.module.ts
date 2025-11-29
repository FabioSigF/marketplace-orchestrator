import { Module } from '@nestjs/common';
import { PublishService } from './publish.service';
import { PublishController } from './publish.controller';
import { BullModule } from '@nestjs/bull';
import { PublishProcessor } from './publish.processor';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'publish-product',
    }),
  ],
  controllers: [PublishController],
  providers: [PublishService, PublishProcessor, PrismaService],
  exports: [PublishService],
})
export class PublishModule {}
