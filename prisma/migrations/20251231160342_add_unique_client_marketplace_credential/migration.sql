/*
  Warnings:

  - A unique constraint covering the columns `[clientId,marketplace]` on the table `MarketplaceCredential` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MarketplaceCredential" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE UNIQUE INDEX "MarketplaceCredential_clientId_marketplace_key" ON "MarketplaceCredential"("clientId", "marketplace");
