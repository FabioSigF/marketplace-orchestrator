import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';

@Module({
  imports: [],
  controllers: [],
  providers: [ClientsService],
  exports: [ClientsService],
})
export class ClientsModule {}
