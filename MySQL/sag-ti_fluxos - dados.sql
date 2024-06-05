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
-- Dumping data for table `fluxos`
--

LOCK TABLES `fluxos` WRITE;
/*!40000 ALTER TABLE `fluxos` DISABLE KEYS */;
INSERT INTO `fluxos` VALUES (1,'Novo','incidente','Priorizado','Cancelado;Em espera'),(2,'Priorizado','incidente','Em andamento','Cancelado;Em espera'),(3,'Em andamento','incidente','Resolvido','Cancelado;Em espera'),(4,'Resolvido','incidente','Encerrado','Cancelado'),(5,'Novo','problema','Em análise','Cancelado'),(6,'Em análise','problema','Análise concluída','Cancelado'),(7,'Análise concluída','problema','Encerrado','Cancelado'),(8,'Encerrado','problema','',''),(9,'Encerrado','incidente','',''),(10,'Em espera','incidente','Priorizado','Cancelado;Priorizado'),(11,'Novo','mudanca','Em planejamento','Cancelado'),(12,'Em planejamento','mudanca','Em autorização','Cancelado'),(13,'Em autorização','mudanca','Autorizado','Cancelado'),(14,'Autorizado','mudanca','Em execução','Cancelado'),(15,'Em execução','mudanca','Em validação','Cancelado'),(16,'Em validação','mudanca','Encerrado','Cancelado'),(17,'Encerrado','mudanca','',''),(18,'Cancelado','mudanca','',''),(19,'Cancelado','incidente','',''),(20,'Cancelado','problema','',''),(21,'Novo','requisicao','Ativo','Cancelado;Aguardando Informações'),(22,'Ativo','requisicao','Em andamento','Cancelado;Aguardando informações'),(23,'Em andamento','requisicao','Resolvido','Cancelado;Aguardando informações'),(24,'Resolvido','requisicao','Encerrado','Cancelado'),(25,'Encerrado','requisicao','',''),(26,'Aguardando informações','requisicao','Ativo','Cancelado;Ativo'),(27,'Cancelado','requisicao','','');
/*!40000 ALTER TABLE `fluxos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-06-05 16:11:42
