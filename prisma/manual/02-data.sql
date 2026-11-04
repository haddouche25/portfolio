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
FROM `qcmexam`
WHERE `level` IS NOT NULL;

-- Domaine de Définition : Tronc commun, 1bac, 2bac
INSERT IGNORE INTO `qcm_exam_levels` (`id`, `examId`, `level`)
SELECT CONCAT('lvl_', SUBSTRING(MD5(RAND()), 1, 16)), id, 'tronc commun' 
FROM `qcmexam` WHERE slug LIKE '%domaine-definition%';

INSERT IGNORE INTO `qcm_exam_levels` (`id`, `examId`, `level`)
SELECT CONCAT('lvl_', SUBSTRING(MD5(RAND()), 1, 16)), id, '1bac' 
FROM `qcmexam` WHERE slug LIKE '%domaine-definition%';

INSERT IGNORE INTO `qcm_exam_levels` (`id`, `examId`, `level`)
SELECT CONCAT('lvl_', SUBSTRING(MD5(RAND()), 1, 16)), id, '2bac' 
FROM `qcmexam` WHERE slug LIKE '%domaine-definition%';

-- Dérivation (Partie 1) : 1bac, 2bac
INSERT IGNORE INTO `qcm_exam_levels` (`id`, `examId`, `level`)
SELECT CONCAT('lvl_', SUBSTRING(MD5(RAND()), 1, 16)), id, '1bac' 
FROM `qcmexam` WHERE slug LIKE '%derivation%';

INSERT IGNORE INTO `qcm_exam_levels` (`id`, `examId`, `level`)
SELECT CONCAT('lvl_', SUBSTRING(MD5(RAND()), 1, 16)), id, '2bac' 
FROM `qcmexam` WHERE slug LIKE '%derivation%';