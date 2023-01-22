-- CreateTable
CREATE TABLE `ImageUrl` (
    `id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `variantProduct` (
    `id` VARCHAR(191) NOT NULL,
    `variant` VARCHAR(191) NULL,
    `productId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sizeProduct` (
    `id` VARCHAR(191) NOT NULL,
    `size` VARCHAR(191) NULL,
    `productId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `discount` INTEGER NULL,
    `shipping` VARCHAR(191) NOT NULL,
    `category` VARCHAR(191) NOT NULL,
    `subCategory` VARCHAR(191) NULL,
    `shopUrl` VARCHAR(191) NOT NULL,
    `ImageUrl` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,
    `highlighted` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
