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
-- Temporary view structure for view `view_filtro`
--

DROP TABLE IF EXISTS `view_filtro`;
/*!50001 DROP VIEW IF EXISTS `view_filtro`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_filtro` AS SELECT 
 1 AS `ChaveProcesso`,
 1 AS `Titulo`,
 1 AS `Status`,
 1 AS `Prioridade`,
 1 AS `ChaveSistema`,
 1 AS `Sistema`,
 1 AS `Solicitante`,
 1 AS `DataCriacao`,
 1 AS `Tipo`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_conatagem_dados`
--

DROP TABLE IF EXISTS `view_conatagem_dados`;
/*!50001 DROP VIEW IF EXISTS `view_conatagem_dados`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_conatagem_dados` AS SELECT 
 1 AS `usuarios`,
 1 AS `sistemas`,
 1 AS `tickets`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `view_filtro`
--

/*!50001 DROP VIEW IF EXISTS `view_filtro`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_filtro` AS select `i`.`ChaveProcesso` AS `ChaveProcesso`,`i`.`Titulo` AS `Titulo`,`i`.`Status` AS `Status`,`i`.`Prioridade` AS `Prioridade`,`i`.`ChaveSistema` AS `ChaveSistema`,`i`.`Sistema` AS `Sistema`,`i`.`Solicitante` AS `Solicitante`,`i`.`DataCriacao` AS `DataCriacao`,'Incidente' AS `Tipo` from `incidente` `i` union select `p`.`ChaveProcesso` AS `ChaveProcesso`,`p`.`Titulo` AS `Titulo`,`p`.`Status` AS `Status`,`p`.`Prioridade` AS `Prioridade`,`p`.`ChaveSistema` AS `ChaveSistema`,`p`.`Sistema` AS `Sistema`,`p`.`Solicitante` AS `Solicitante`,`p`.`DataCriacao` AS `DataCriacao`,'Problema' AS `Tipo` from `problema` `p` union select `m`.`ChaveProcesso` AS `ChaveProcesso`,`m`.`Titulo` AS `Titulo`,`m`.`Status` AS `Status`,`m`.`TipoMudanca` AS `TipoMudanca`,`m`.`ChaveSistema` AS `ChaveSistema`,`m`.`Sistema` AS `Sistema`,`m`.`Solicitante` AS `Solicitante`,`m`.`DataCriacao` AS `DataCriacao`,'Mudança' AS `Tipo` from `mudanca` `m` union select `r`.`ChaveProcesso` AS `ChaveProcesso`,`r`.`Titulo` AS `Titulo`,`r`.`Status` AS `Status`,`r`.`Prioridade` AS `Prioridade`,`r`.`ChaveSistema` AS `ChaveSistema`,`r`.`Sistema` AS `Sistema`,`r`.`Solicitante` AS `Solicitante`,`r`.`DataCriacao` AS `DataCriacao`,'Requisição' AS `Tipo` from `requisicao` `r` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_conatagem_dados`
--

/*!50001 DROP VIEW IF EXISTS `view_conatagem_dados`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_conatagem_dados` AS select (select count(0) from `usuarios`) AS `usuarios`,(select count(0) from `sistemas`) AS `sistemas`,(select sum(`subquery`.`total_tickets`) AS `tickets` from (select count(0) AS `total_tickets` from `incidente` union all select count(0) AS `total_tickets` from `requisicao` union all select count(0) AS `total_tickets` from `mudanca` union all select count(0) AS `total_tickets` from `problema`) `subquery`) AS `tickets` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-29 12:35:59
