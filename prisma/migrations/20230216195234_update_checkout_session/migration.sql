/*
  Warnings:

  - Added the required column `clientAddressId` to the `CheckoutSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientEmail` to the `CheckoutSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientName` to the `CheckoutSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientPhone` to the `CheckoutSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productComplement` to the `CheckoutSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CheckoutSession` ADD COLUMN `clientAddressId` VARCHAR(191) NOT NULL,
    ADD COLUMN `clientEmail` VARCHAR(191) NOT NULL,
    ADD COLUMN `clientName` VARCHAR(191) NOT NULL,
    ADD COLUMN `clientPhone` VARCHAR(191) NOT NULL,
    ADD COLUMN `productComplement` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `ClientAddress` (
    `id` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `country` VARCHAR(191) NOT NULL,
    `line1` VARCHAR(191) NOT NULL,
    `line2` VARCHAR(191) NOT NULL,
    `postal_code` VARCHAR(191) NOT NULL,
    `state` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductsInCheckout` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NOT NULL,
    `checkoutSessionId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
