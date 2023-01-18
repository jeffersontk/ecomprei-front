/*
  Warnings:

  - You are about to drop the column `variant` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `variant`;

-- CreateTable
CREATE TABLE `variantProduct` (
    `id` VARCHAR(191) NOT NULL,
    `variant` VARCHAR(191) NULL,
    `productId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
