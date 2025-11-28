import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ClientCredentialsService {
  constructor(private prisma: PrismaService) {}

  async getMarketplaceCredentials(clientId: string) {
    const credentials = await this.prisma.marketplaceCredentials.findUnique({
      where: { clientId },
    });

    if (!credentials) {
      throw new NotFoundException(
        `Credenciais de marketplace não encontradas para o client ${clientId}`,
      );
    }

    return credentials;
  }
}
