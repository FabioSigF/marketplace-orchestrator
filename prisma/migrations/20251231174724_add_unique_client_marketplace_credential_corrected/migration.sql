/*
  Warnings:

  - A unique constraint covering the columns `[marketplaceUserId,marketplace]` on the table `MarketplaceCredential` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "MarketplaceCredential" ADD COLUMN     "marketplaceUserId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "MarketplaceCredential_marketplaceUserId_marketplace_key" ON "MarketplaceCredential"("marketplaceUserId", "marketplace");
