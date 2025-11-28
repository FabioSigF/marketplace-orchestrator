import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProductsModule } from './modules/products/products.module';
import { ListingsModule } from './modules/listings/listings.module';

@Module({
  imports: [AuthModule, PrismaModule, ProductsModule, ListingsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
