import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'publish-product', // nome da fila
    }),
  ],
  exports: [BullModule],
})
export class QueueModule {}
