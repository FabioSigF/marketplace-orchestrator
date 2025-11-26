import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        clientId: data.clientId,
        sku: data.sku,
        title: data.title,
        description: data.description,
        price: data.price,
        available: data.available,
        variations: {
          create: data.variations.map((v) => ({
            sku: v.sku,
            color: v.color,
            size: v.size,
            stock: v.stock,
            price: v.price,
          })),
        },
      },
      include: { variations: true },
    });
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
