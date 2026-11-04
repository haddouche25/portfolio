CREATE TABLE IF NOT EXISTS `qcm_exam_levels` (
    `id` VARCHAR(191) NOT NULL,
    `examId` VARCHAR(191) NOT NULL,
    `level` ENUM('3ac', 'tronc commun', '1bac', '2bac') NOT NULL,

    INDEX `qcm_exam_levels_level_idx`(`level`),
    UNIQUE INDEX `qcm_exam_levels_examId_level_key`(`examId`, `level`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `qcm_exam_levels` 
ADD CONSTRAINT `qcm_exam_levels_examId_fkey` 
FOREIGN KEY (`examId`) REFERENCES `qcmexam`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;