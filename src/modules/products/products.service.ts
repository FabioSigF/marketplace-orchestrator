/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdateVariationDto } from './dto/update-variation.dto';

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

  async findAll() {
    return this.prisma.product.findMany({ include: { variations: true } });
  }

  findOne(id: string) {
    return this.prisma.product.findUnique({
      where: { id },
      include: { variations: true },
    });
  }

  async update(id: string, data: UpdateProductDto) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    // Validar clientId se enviado
    if (data.clientId) {
      const client = await this.prisma.client.findUnique({
        where: { id: data.clientId },
      });
      if (!client) {
        throw new BadRequestException(
          `Client with id ${data.clientId} does not exist`,
        );
      }
    }

    // Construir objeto de atualização APENAS com campos enviados
    const updateData: any = {};

    if (data.clientId !== undefined) updateData.clientId = data.clientId;
    if (data.sku !== undefined) updateData.sku = data.sku;
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined)
      updateData.description = data.description;
    if (data.price !== undefined) updateData.price = data.price;
    if (data.available !== undefined) updateData.available = data.available;

    // Tratar variações
    if (data.variations) {
      updateData.variations = {
        update: data.variations
          .filter((v) => v.id) // só os que têm ID → update
          .map((v) => ({
            where: { id: v.id },
            data: {
              sku: v.sku,
              color: v.color,
              size: v.size,
              stock: v.stock,
              price: v.price,
            },
          })),

        create: data.variations
          .filter((v) => !v.id) // sem id → create
          .map((v) => ({
            sku: v.sku,
            color: v.color,
            size: v.size,
            stock: v.stock,
            price: v.price,
          })),
      };
    }

    return this.prisma.product.update({
      where: { id },
      data: updateData,
      include: { variations: true },
    });
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
