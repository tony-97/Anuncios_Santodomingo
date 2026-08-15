-- CreateTable
CREATE TABLE `usuarios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `telefono` VARCHAR(9) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `verificado` BOOLEAN NOT NULL DEFAULT false,
    `creado_en` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizado_en` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuarios_telefono_key`(`telefono`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `anuncios` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria` ENUM('EMPLEO', 'ALQUILER') NOT NULL,
    `distrito` VARCHAR(50) NOT NULL,
    `titulo` VARCHAR(100) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `telefono` VARCHAR(9) NOT NULL,
    `color` ENUM('CELESTE', 'AMARILLO', 'VERDE', 'ROSADO') NOT NULL DEFAULT 'CELESTE',
    `pin` VARCHAR(255) NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `expira_en` DATETIME(3) NOT NULL,
    `creado_en` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `actualizado_en` DATETIME(3) NOT NULL,
    `user_id` INTEGER NOT NULL,

    INDEX `anuncios_categoria_idx`(`categoria`),
    INDEX `anuncios_distrito_idx`(`distrito`),
    INDEX `anuncios_activo_expira_en_idx`(`activo`, `expira_en`),
    INDEX `anuncios_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `otp_codes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `telefono` VARCHAR(9) NOT NULL,
    `codigo` VARCHAR(6) NOT NULL,
    `expira_en` DATETIME(3) NOT NULL,
    `usado` BOOLEAN NOT NULL DEFAULT false,
    `creado_en` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `otp_codes_telefono_codigo_idx`(`telefono`, `codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `anuncios` ADD CONSTRAINT `anuncios_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
