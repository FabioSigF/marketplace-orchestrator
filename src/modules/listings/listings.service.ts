import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import bull from 'bull';
import { UpdateListingDto } from './dto/update-listing.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ListingsService {
  constructor(
    @InjectQueue('publish-product')
    private publishQueue: bull.Queue,
    private readonly prisma: PrismaService,
  ) {}

  async publish(productId: string, clientId: string) {
    await this.publishQueue.add(
      {
        productId,
        clientId,
      },
      {
        attempts: 5, // retry automático
        backoff: 3000, // 3s entre tentativas
        removeOnComplete: true,
      },
    );

    return { message: 'Produto enviado para fila de publicação.' };
  }

  //Garante que você tenha apenas um registro de publicação (Listing) por produto em cada marketplace
  async upsertListing(data: {
    productId: string;
    clientId: string;
    externalListingId: string;
    permalink: string;
    marketplace: string;
    status: string;
  }) {
    return this.prisma.listing.upsert({
      where: {
        clientId_productId_marketplace: {
          clientId: data.clientId,
          productId: data.productId,
          marketplace: data.marketplace,
        },
      },
      create: data,
      update: data,
    });
  }

  findAll() {
    return `This action returns all listings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listing`;
  }

  update(id: number, updateListingDto: UpdateListingDto) {
    return `This action updates a #${id} listing`;
  }

  remove(id: number) {
    return `This action removes a #${id} listing`;
  }
}
