import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import { ListingsModule } from './modules/listings/listings.module';
import { PublishModule } from './modules/publish/publish.module';
import { ClientsModule } from './modules/clients/clients.module';
import { BullModule } from '@nestjs/bull';
import { ClientsController } from './modules/clients/clients.controller';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),

    AuthModule,
    PrismaModule,
    ProductsModule,
    ListingsModule,
    PublishModule,
    ClientsModule,
  ],
  controllers: [AppController, ClientsController],
  providers: [AppService],
})
export class AppModule {}
