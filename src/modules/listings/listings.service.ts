import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import bull from 'bull';
import { UpdateListingDto } from './dto/update-listing.dto';

@Injectable()
export class ListingsService {
  constructor(
    @InjectQueue('publish-product')
    private publishQueue: bull.Queue,
  ) {}

  async publish(productId: string, clientId: string) {
    await this.publishQueue.add(
      {
        productId,
        clientId,
      },
      {
        attempts: 5, // retry automático
        backoff: 3000, // 3s entre tentativas
        removeOnComplete: true,
      },
    );

    return { message: 'Produto enviado para fila de publicação.' };
  }

  findAll() {
    return `This action returns all listings`;
  }

  findOne(id: number) {
    return `This action returns a #${id} listing`;
  }

  update(id: number, updateListingDto: UpdateListingDto) {
    return `This action updates a #${id} listing`;
  }

  remove(id: number) {
    return `This action removes a #${id} listing`;
  }
}
