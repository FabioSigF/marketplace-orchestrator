import { Injectable } from '@nestjs/common';
import { UpdateListingDto } from './dto/update-listing.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  //Garante que você tenha apenas um registro de publicação (Listing) por produto em cada marketplace
  async upsertListing(data: {
    productId: string;
    clientId: string;
    marketplaceListingId: string;
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
