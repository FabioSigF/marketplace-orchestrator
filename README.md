# MarketPlace Orchestrator - API para integração de marketplaces
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descrição

O Marketplace Orchestrator é uma plataforma centralizada desenvolvida para facilitar a integração de produtos, pedidos e credenciais entre múltiplos marketplaces, como Mercado Livre, Shopee, Amazon, entre outros.

O objetivo é fornecer uma camada única de orquestração capaz de:
- Cadastrar e gerenciar produtos localmente.
- Criar, atualizar e sincronizar anúncios em diversos marketplaces.
- Controlar credenciais e tokens de autenticação de cada plataforma.
- Gerenciar filas de atualização (com Bull/Redis).
- Registrar logs de erros e status de cada publicação.
- Unificar dados para futuras integrações de pedidos e estoque.

Este projeto servirá como o backend central para uma aplicação que automatiza o fluxo operacional de vendedores multi-plataforma.

## Objetivos do Projeto

- Criar uma API modular, escalável e extensível usando NestJS.
- Centralizar produtos de um cliente e distribuir para marketplaces.
- Orquestrar interações assíncronas (ex.: criação de anúncios, atualizações de preço/estoque).
- Gerenciar credenciais via OAuth2/APPs oficiais de cada marketplace.
- Armazenar imagens e arquivos usando infraestrutura compatível com S3 (MinIO).
- Usar filas para processamento de eventos intensivos.
- Fornecer uma base sólida para fases futuras (sincronização de pedidos, faturamento e estoque).

## Tecnologias Utilizadas

### Backend
- **NestJS** — framework modular e escalável para Node.js.
- **Prisma ORM** — modelagem, migrations e acesso ao PostgreSQL.
- **Axios** — integração com APIs externas.
- **Swagger (NestJS Swagger)** — documentação automática da API.

### Infraestrutura Local (Docker)
- **PostgreSQL** — banco de dados principal.
- **Redis** — filas de processamento com Bull.
- **MinIO** — armazenamento de arquivos compatível com Amazon S3.
  
### DevOps
- **Docker Compose** — orquestração local.
- **GitHub Actions CI** — pipeline com:
    - `npm install`
    - `npm run build`
    - `prisma migrate`
    - `npm test`
      
### Outras Tecnologias Importantes
- **Bull Queue + @nestjs/bull** — processamento assíncrono (criação/atualização de listings).
- **Dotenv + @nestjs/config** — gerenciamento de variáveis de ambiente.
- **UUID** — identificação única de entidades.

## Estrutura do projeto
```text
marketplace-orchestrator/
├─ src/
│  ├─ app.module.ts
│  ├─ main.ts
│  ├─ config/
│  │  └─ configuration.ts
│  ├─ modules/
│  │  ├─ auth/
│  │  ├─ products/
│  │  │  ├─ products.controller.ts
│  │  │  ├─ products.service.ts
│  │  │  ├─ entities/product.entity.ts
│  │  ├─ marketplaces/
│  │  │  ├─ marketplace.module.ts
│  │  │  ├─ adapters/
│  │  │  │  ├─ marketplace-adapter.ts (interface)
│  │  │  │  └─ mercadolivre.adapter.ts
│  │  │  ├─ mercadolivre/
│  │  │  │  ├─ mercadolivre.controller.ts (OAuth callback, webhook)
│  │  │  │  └─ mercadolivre.service.ts
│  │  ├─ publish/
│  │  │  ├─ publish.controller.ts
│  │  │  └─ publish.service.ts
│  │  ├─ queue/
│  │  │  ├─ queue.module.ts
│  │  │  └─ processors/
│  │  │     └─ publish.processor.ts
│  ├─ common/
│  │  └─ dtos, utils, exceptions
├─ migrations/
├─ docker-compose.yml
├─ Dockerfile
├─ package.json
└─ .env.example
```

## Setup do Projeto

### Instalação

#### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/auth-aut-nestjs-api.git
```

#### 2. Acesse o diretório do projeto:

```bash
cd auth-aut-nestjs-api
```

#### 3. Instale as dependências

```bash
npm install
```
```bash
$ npm install
```

### Configuração do Banco de Dados (Prisma)

#### 1. Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```bash
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"
AUTH_JWT_SECRET="chave-secreta-segura"
AUTH_JWT_ISSUER="issuer"
AUTH_JWT_AUDIENCE="audience"
```

#### 2. Gere o cliente Prisma e execute as migrações:

```bash
npx prisma generate
npx prisma migrate dev
```

### Subir a infra local (Postgres + Redis + MinIO)

Execute:

```sh
docker-compose up -d
```

Isso sobe:
- PostgreSQL
- Redis
- MinIO (compatível com S3)

A interface do MinIO estará disponível em:

http://localhost:9001
(user: minio, pass: minio123)

### Rode o projeto

#### Desenvolvimento

```bash
npm run start:dev
```

Inicia o servidor com hot reload (modo desenvolvimento).

#### Produção

```bash
npm run build
npm run start:prod
```

Compila e inicia a aplicação em modo de produção.

### Pipeline CI (GitHub Actions)

O repositório já contém:
```bash
.github/workflows/ci.yml
```

O pipeline executa automaticamente:
- npm install
- npm run build
- prisma migrate (dev ou deploy)
- npm test

Sempre que houver:
- push em main
- pull request para main

