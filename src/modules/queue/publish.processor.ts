import { Process, Processor } from '@nestjs/bull';
import bull from 'bull';

@Processor('publish-product')
export class PublishProcessor {
  @Process()
  async handle(job: bull.Job) {
    console.log('PROCESSING JOB...', job.data);

    const { productId, clientId } = job.data;

    // 1 — Buscar produto
    // 2 — Buscar credenciais marketplace
    // 3 — Publicar no Mercado Livre
    // 4 — Atualizar tabela Listing
    // 5 — Retentar automaticamente se falhar

    return { ok: true };
  }
}
