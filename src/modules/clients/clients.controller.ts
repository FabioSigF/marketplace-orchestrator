import { Body, Controller, Post } from '@nestjs/common';
import { CreateMarketplaceCredentialDto } from './dto/create-marketplace-credential.dto';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  createClient(@Body() dto: CreateClientDto) {
    return this.clientsService.createClient(dto);
  }

  @Post('marketplace-credentials')
  createCredential(@Body() dto: CreateMarketplaceCredentialDto) {
    return this.clientsService.createMarketplaceCredential(dto);
  }
}
