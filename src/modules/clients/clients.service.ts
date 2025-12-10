import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMarketplaceCredentialDto } from './dto/create-marketplace-credential.dto';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async createClient(dto: CreateClientDto) {
    return this.prisma.client.create({
      data: {
        name: dto.name,
        email: dto.email,
      },
    });
  }

  async createMarketplaceCredential(dto: CreateMarketplaceCredentialDto) {
    const client = await this.prisma.client.findUnique({
      where: { id: dto.clientId },
    });

    if (!client) {
      throw new NotFoundException(`Cliente ${dto.clientId} não encontrado`);
    }

    return this.prisma.marketplaceCredential.create({
      data: {
        clientId: dto.clientId,
        marketplace: dto.marketplace,
        accessToken: dto.accessToken,
        refreshToken: dto.refreshToken,
      },
    });
  }

  async getMarketplaceCredentials(clientId: string) {
    const credentials = await this.prisma.marketplaceCredential.findMany({
      where: { clientId },
    });

    if (!credentials || credentials.length === 0) {
      throw new NotFoundException(
        `Nenhuma credencial de marketplace encontrada para o client ${clientId}`,
      );
    }

    return credentials;
  }
}
