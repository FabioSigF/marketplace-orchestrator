import { Injectable } from '@nestjs/common';
import { UpdatePublishDto } from './dto/update-publish.dto';
import { InjectQueue } from '@nestjs/bull';
import bull from 'bull';
import { PublishJobDto } from './dto/publish-job.dto';

@Injectable()
export class PublishService {
  constructor(
    @InjectQueue('publish-product')
    private readonly publishQueue: bull.Queue,
  ) {}

  async publishProduct(data: PublishJobDto) {
    await this.publishQueue.add('publish', data, {
      attempts: 5,
      backoff: 5000,
      removeOnComplete: true,
      removeOnFail: false,
    });

    return {
      message: 'Publish job successfully queued',
      data,
    };
  }

  findAll() {
    return `This action returns all publish`;
  }

  findOne(id: number) {
    return `This action returns a #${id} publish`;
  }

  update(id: number, updatePublishDto: UpdatePublishDto) {
    return `This action updates a #${id} publish`;
  }

  remove(id: number) {
    return `This action removes a #${id} publish`;
  }
}
