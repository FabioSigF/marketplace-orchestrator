/*
  Warnings:

  - A unique constraint covering the columns `[clientId,productId,marketplace]` on the table `Listing` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Listing_clientId_productId_marketplace_key" ON "Listing"("clientId", "productId", "marketplace");
