CREATE TABLE `tbl_banco` (
  `id` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'Idenficador sequencial',
  `numero` varchar(10) NOT NULL,
  `nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tbl_banco_UN` (`numero`)
) 