import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { MercadoLivreOAuthResponse } from '../dto/mercado-livre-oauth-response.dto';
import { lastValueFrom } from 'rxjs';
import { MarketplaceCredential, MarketplaceType } from '@prisma/client';
import { MercadoLivreRefreshResponse } from '../dto/mercado-livre-refresh-response.dto';

@Injectable()
export class MercadoLivreAdapter {
  constructor(
    private readonly prisma: PrismaService,
    private readonly http: HttpService,
  ) {}

  async handleOAuthCallback(code: string, clientId_plataform: string) {
    const response = await lastValueFrom(
      this.http.post<MercadoLivreOAuthResponse>(
        'https://api.mercadolibre.com/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: process.env.ML_CLIENT_ID,
          client_secret: process.env.ML_CLIENT_SECRET,
          code,
          redirect_uri: process.env.ML_REDIRECT_URI,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    const { access_token, refresh_token, expires_in } = response.data;

    const tokenExpiresAt = new Date(Date.now() + expires_in * 1000);

    return this.prisma.marketplaceCredential.upsert({
      where: {
        clientId_plataform: {
          clientId: clientId_plataform,
          marketplace: MarketplaceType.MERCADO_LIVRE,
        },
      },
      update: {
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenExpiresAt,
      },
      create: {
        clientId: clientId_plataform,
        marketplace: MarketplaceType.MERCADO_LIVRE,
        marketplaceUserId: String(process.env.ML_CLIENT_ID),
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenExpiresAt,
      },
    });
  }

  async getValidAccessToken(clientId: string): Promise<string> {
    const credential = await this.prisma.marketplaceCredential.findUnique({
      where: {
        clientId_marketplace: {
          marketplaceUserId: String(process.env.ML_CLIENT_ID),
          marketplace: 'MERCADO_LIVRE',
        },
      },
    });

    if (!credential) {
      throw new Error('Mercado Livre credentials not found');
    }

    // Token ainda válido
    if (
      credential.tokenExpiresAt &&
      credential.tokenExpiresAt.getTime() > Date.now()
    ) {
      return credential.accessToken;
    }

    // Token expirado → refresh
    return this.refreshAccessToken(credential);
  }

  private async refreshAccessToken(
    credential: MarketplaceCredential,
  ): Promise<string> {
    if (!credential.refreshToken) {
      throw new Error('Refresh token not available');
    }

    const response = await lastValueFrom(
      this.http.post<MercadoLivreRefreshResponse>(
        'https://api.mercadolibre.com/oauth/token',
        {
          grant_type: 'refresh_token',
          client_id: process.env.ML_CLIENT_ID,
          client_secret: process.env.ML_CLIENT_SECRET,
          refresh_token: credential.refreshToken,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );

    const { access_token, refresh_token, expires_in } = response.data;

    const tokenExpiresAt = new Date(Date.now() + expires_in * 1000);

    await this.prisma.marketplaceCredential.update({
      where: { id: credential.id },
      data: {
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenExpiresAt,
      },
    });

    return access_token;
  }
}
