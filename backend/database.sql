DROP TABLE IF EXISTS `user`;

DROP TABLE IF EXISTS `book_list`;

DROP TABLE IF EXISTS `book`;

CREATE TABLE IF NOT EXISTS `user` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `username` VARCHAR(64) NOT NULL,
        `email` VARCHAR(128) NOT NULL,
        `hashedPassword` VARCHAR(255) NOT NULL,
        `profileimage` VARCHAR(255) NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `book` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `title` VARCHAR(255) NOT NULL,
        `volume_id` VARCHAR(128) NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

CREATE TABLE IF NOT EXISTS `book_list` (
`user_id` INT NOT NULL,
`book_id` INT NOT NULL,
PRIMARY KEY (`user_id`, `book_id`),
CONSTRAINT `fk_book_list_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `fk_book_list_book` FOREIGN KEY (`book_id`) REFERENCES `book` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;


