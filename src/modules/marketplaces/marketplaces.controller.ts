import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarketplacesService } from './marketplaces.service';
import { CreateMarketplaceDto } from './dto/create-marketplace.dto';
import { UpdateMarketplaceDto } from './dto/update-marketplace.dto';

@Controller('marketplaces')
export class MarketplacesController {
  constructor(private readonly marketplacesService: MarketplacesService) {}

  @Post()
  create(@Body() createMarketplaceDto: CreateMarketplaceDto) {
    return this.marketplacesService.create(createMarketplaceDto);
  }

  @Get()
  findAll() {
    return this.marketplacesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketplacesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMarketplaceDto: UpdateMarketplaceDto) {
    return this.marketplacesService.update(+id, updateMarketplaceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketplacesService.remove(+id);
  }
}
