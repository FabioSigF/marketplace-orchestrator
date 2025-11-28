import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { PublishProcessor } from './publish.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'publish-product', // nome da fila
    }),
  ],
  providers: [PublishProcessor],
  exports: [BullModule],
})
export class QueueModule {}
