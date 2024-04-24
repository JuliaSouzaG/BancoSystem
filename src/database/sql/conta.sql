-- financeiro.tbl_conta definition

CREATE TABLE `tbl_conta` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `id_agencia` int unsigned NOT NULL,
  `numero` varchar(15) NOT NULL,
  `cpf` varchar(11) NOT NULL,
  `nome_completo` varchar(100) NOT NULL,
  `password` varchar(15) NOT NULL DEFAULT '123456',
  `saldo` decimal(10,0) DEFAULT '0',
  `limite_especial` decimal(10,0) DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_conta_UN` (`numero`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;