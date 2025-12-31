import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { MercadoLivreOAuthResponse } from '../dto/mercado-livre-oauth-response.dto';
import { lastValueFrom } from 'rxjs';
import { MarketplaceType } from '@prisma/client';

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

    const { access_token, refresh_token, expires_in, user_id } = response.data;

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
        marketplaceUserId: String(user_id),
        accessToken: access_token,
        refreshToken: refresh_token,
        tokenExpiresAt,
      },
    });
  }
}
