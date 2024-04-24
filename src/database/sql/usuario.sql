CREATE TABLE `tbl_usuario` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'Identificador numério',
  `nome` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `login` varchar(30) NOT NULL COMMENT 'nome do usuario para acessar o sistema',
  `password` varchar(15) NOT NULL DEFAULT (_utf8mb4'banco1234') COMMENT 'senha do usuário para acessar o sistema',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_usuario_UN` (`login`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='Define as pessoas que poderão utilizar o sistema';