-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: sag-ti
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `mudanca`
--

DROP TABLE IF EXISTS `mudanca`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mudanca` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ChaveProcesso` varchar(45) DEFAULT NULL,
  `Titulo` varchar(90) NOT NULL,
  `Descricao` varchar(120) NOT NULL,
  `Status` varchar(45) NOT NULL,
  `TipoMudanca` varchar(45) DEFAULT NULL,
  `Sistema` varchar(45) NOT NULL,
  `ChaveSistema` varchar(45) NOT NULL,
  `Solicitante` varchar(45) NOT NULL,
  `ResponsavelTI` varchar(45) DEFAULT NULL,
  `AprovadorMudanca` varchar(45) DEFAULT NULL,
  `DataCriacao` date DEFAULT NULL,
  `DataMudancaIni` date DEFAULT NULL,
  `HorarioMudancaIni` varchar(45) DEFAULT NULL,
  `DataMudancaFim` date DEFAULT NULL,
  `HorarioMudancaFim` varchar(45) DEFAULT NULL,
  `DataAutorizacao` date DEFAULT NULL,
  `Desenvolvedor` varchar(45) DEFAULT NULL,
  `DataClassificacao` date DEFAULT NULL,
  `DataExecucaoIni` date DEFAULT NULL,
  `HorarioExecucaoIni` varchar(45) DEFAULT NULL,
  `DataExecucaoFim` date DEFAULT NULL,
  `HorarioExecucaoFim` varchar(45) DEFAULT NULL,
  `DataEncerramento` date DEFAULT NULL,
  `NotaEncerramento` varchar(120) DEFAULT NULL,
  `NotaCancelamento` varchar(120) DEFAULT NULL,
  `DataCancelamento` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ChaveProcesso_UNIQUE` (`ChaveProcesso`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-05 16:12:59
