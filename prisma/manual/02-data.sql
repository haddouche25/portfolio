-- 1. Reprise des niveaux initiaux
INSERT IGNORE INTO `qcm_exam_levels` (`id`, `examId`, `level`)
SELECT 
    CONCAT('lvl_', SUBSTRING(MD5(CONCAT(id, level, RAND())), 1, 16)),
    id,
    CASE level
        WHEN '3AC' THEN '3ac'
        WHEN 'COLLEGE_3AC' THEN '3ac'
        WHEN '3ac' THEN '3ac'
        WHEN 'Tronc commun' THEN 'tronc commun'
        WHEN 'TRONC_COMMUN' THEN 'tronc commun'
        WHEN 'tronc commun' THEN 'tronc commun'
        WHEN '1bac SM' THEN '1bac'
        WHEN '1bac S' THEN '1bac'
        WHEN 'BAC1_SM' THEN '1bac'
        WHEN 'BAC1_S' THEN '1bac'
        WHEN '1bac' THEN '1bac'
        WHEN '2bac SM' THEN '2bac'
        WHEN '2bac S' THEN '2bac'
        WHEN 'BAC2_SM' THEN '2bac'
        WHEN 'BAC2_S' THEN '2bac'
        WHEN '2bac' THEN '2bac'
    END
FROM `QcmExam`
WHERE `level` IS NOT NULL;

-- 2. Multi-niveaux : Domaine de définition
INSERT IGNORE INTO `qcm_exam_levels` (`id`, `examId`, `level`)
SELECT CONCAT('lvl_', SUBSTRING(MD5(CONCAT(id, 'tc', RAND())), 1, 16)), id, 'tronc commun' 
FROM `QcmExam` WHERE slug LIKE '%domaine-definition%';

INSERT IGNORE INTO `qcm_exam_levels` (`id`, `examId`, `level`)
SELECT CONCAT('lvl_', SUBSTRING(MD5(CONCAT(id, '1b', RAND())), 1, 16)), id, '1bac' 
FROM `QcmExam` WHERE slug LIKE '%domaine-definition%';

INSERT IGNORE INTO `qcm_exam_levels` (`id`, `examId`, `level`)
SELECT CONCAT('lvl_', SUBSTRING(MD5(CONCAT(id, '2b', RAND())), 1, 16)), id, '2bac' 
FROM `QcmExam` WHERE slug LIKE '%domaine-definition%';

-- 3. Multi-niveaux : Dérivation
INSERT IGNORE INTO `qcm_exam_levels` (`id`, `examId`, `level`)
SELECT CONCAT('lvl_', SUBSTRING(MD5(CONCAT(id, '1b_d', RAND())), 1, 16)), id, '1bac' 
FROM `QcmExam` WHERE slug LIKE '%derivation%';

INSERT IGNORE INTO `qcm_exam_levels` (`id`, `examId`, `level`)
SELECT CONCAT('lvl_', SUBSTRING(MD5(CONCAT(id, '2b_d', RAND())), 1, 16)), id, '2bac' 
FROM `QcmExam` WHERE slug LIKE '%derivation%';