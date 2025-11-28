import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const product = await prisma.product.create({
    data: {
      title: 'Colar Prata 925',
      description: 'Elegante e resistente',
      sku: 'COLAR-001',
      price: 199.9,
      clientId: '1',

      images: {
        create: [
          {
            url: 'https://meu-bucket.s3.amazonaws.com/colar1.jpg',
            alt: 'Colar prata 925',
          },
          {
            url: 'https://meu-bucket.s3.amazonaws.com/colar1-detalhe.jpg',
            alt: 'Detalhe da corrente',
          },
        ],
      },
    },
  });

  console.log('Produto criado:', product);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
