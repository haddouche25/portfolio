-- AlterTable
ALTER TABLE `Student` ADD COLUMN `firstName` VARCHAR(191) NULL,
    ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `lastLoginAt` DATETIME(3) NULL,
    ADD COLUMN `lastName` VARCHAR(191) NULL,
    ADD COLUMN `level` ENUM('3ac', 'tronc commun', '1bac', '2bac') NULL,
    ADD COLUMN `mustChangePassword` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `passwordHash` VARCHAR(191) NULL,
    ADD COLUMN `phone` VARCHAR(191) NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- CreateTable
CREATE TABLE `WeeklySchedule` (
    `id` VARCHAR(191) NOT NULL,
    `mondayDate` DATETIME(3) NOT NULL,
    `matrix` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `WeeklySchedule_mondayDate_key`(`mondayDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Reservation` (
    `id` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `mondayDate` DATETIME(3) NOT NULL,
    `jour` VARCHAR(191) NOT NULL,
    `horaire` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Reservation_studentId_idx`(`studentId`),
    INDEX `Reservation_mondayDate_idx`(`mondayDate`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ScheduleTemplate` (
    `id` VARCHAR(191) NOT NULL DEFAULT 'default',
    `matrix` JSON NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Student_level_idx` ON `Student`(`level`);

-- CreateIndex
CREATE INDEX `Student_isActive_idx` ON `Student`(`isActive`);

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

