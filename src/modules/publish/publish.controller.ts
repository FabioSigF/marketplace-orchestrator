import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PublishService } from './publish.service';
import { UpdatePublishDto } from './dto/update-publish.dto';
import { PublishJobDto } from './dto/publish-job.dto';

@Controller('publish')
export class PublishController {
  constructor(private readonly publishService: PublishService) {}

  @Post()
  async queuePublish(@Body() dto: PublishJobDto) {
    return this.publishService.publishProduct(dto);
  }

  @Get()
  findAll() {
    return this.publishService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.publishService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePublishDto: UpdatePublishDto) {
    return this.publishService.update(+id, updatePublishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.publishService.remove(+id);
  }
}
