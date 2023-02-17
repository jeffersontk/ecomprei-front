/*
  Warnings:

  - Added the required column `status` to the `CheckoutSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `CheckoutSession` ADD COLUMN `status` VARCHAR(191) NOT NULL;
