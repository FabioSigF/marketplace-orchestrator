/*
  Warnings:

  - Made the column `marketplaceUserId` on table `MarketplaceCredential` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MarketplaceCredential" ALTER COLUMN "marketplaceUserId" SET NOT NULL;
