import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getQueueToken } from '@nestjs/bull';
import { setupBullBoard } from './bull-board';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const publishQueue = app.get(getQueueToken('publish-product'));

  setupBullBoard(app.getHttpAdapter().getInstance(), [publishQueue]);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
