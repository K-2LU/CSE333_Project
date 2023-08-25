-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: localhost    Database: hospital
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
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `dept_id` varchar(20) NOT NULL,
  `dept_name` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`dept_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES ('DEPT-001','General Practition(GP)'),('DEPT-002','Diagnostic Medicine'),('DEPT-003','Surgery'),('DEPT-004','Nephrology'),('DEPT-005','Cardiology'),('DEPT-006','Hematology'),('DEPT-007','Neurology'),('DEPT-008','Oncology'),('DEPT-009','Orthopedics');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `id` varchar(20) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `degree` varchar(64) DEFAULT NULL,
  `college` varchar(64) DEFAULT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  `dept_id` varchar(64) DEFAULT NULL,
  `room_no` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES ('DOC-0001','Ibn Sina','MD','Sylhet Osmani Medical College','01712345662','ibn_sina','DEPT-001','102A'),('DOC-0002','Murli Prasad Sharma','MBBS','Sylhet Osmani Medical College','01712345667','munnavai','DEPT-001','101A'),('DOC-0003','Dr. Gregory House','MD','Prinston Medical College','01189998819991197253','house1234','DEPT-002','201A'),('DOC-0004','Arthur Morgan','MD','Rajshahi Medical College','01737917913','wOsCcVct','DEPT-002','201A'),('DOC-0005','Dutch Van Der Linde','MS','Rangpur Medical College','01955408443','z6nrQiaZ','DEPT-002','301A'),('DOC-0006','Hosea Mathews','MRCP','Comilla Medical College','01451421055','Wjc9QT5D','DEPT-009','210A'),('DOC-0007','Lenny Summers','MBBS','Khulna Medical College','01271118115','WrIdgOwg','DEPT-009','101A'),('DOC-0008','John Marston','MRCP','Khulna Medical College','01954897856','x6wrYzpi','DEPT-002','210A'),('DOC-0009','Charles Smith','DO','Chittagong Medical College','01441870042','EdQq2pTA','DEPT-008','220A'),('DOC-0010','Javier Escuella','MBBS','Sylhet MAG Osmani Medical College','01793867598','D3LpUnvk','DEPT-005','101A'),('DOC-0011','Bill Williamson','MS','Sher-E-Bangla Medical College','01738928361','rdRjBklr','DEPT-007','301A'),('DOC-0012','Oli Haque','MBBS','Sher-E-Bangla Medical College','01393927472','IiR5gR6g','DEPT-003','101A'),('DOC-0013','Naimul Ibrahim','MRCP','Chittagong Medical College','01157973468','1HHdDQKZ','DEPT-004','210A'),('DOC-0014','Shahriar Mehedi','MRCP','Sylhet MAG Osmani Medical College','01904020175','w6961HwS','DEPT-002','210A'),('DOC-0015','Mainul Haque','MBBS','Mymensingh Medical College','01023459601','zx98G7WG','DEPT-003','101A'),('DOC-0016','Mainul Haque','DO','Rajshahi Medical College','01321175307','wm124ZkR','DEPT-008','220A'),('DOC-0017','Nazrul Haque','DO','Dhaka Medical College','01295527344','fv6YGrMv','DEPT-005','220A'),('DOC-0018','Oli Islam','MD','Sher-E-Bangla Medical College','01403715388','zsmZoG0O','DEPT-003','201A'),('DOC-0019','Naimul Haque','MBBS','Rajshahi Medical College','01846701039','lzWb5DHz','DEPT-001','101A'),('DOC-0020','Oli Mahmud','DO','Rajshahi Medical College','01762244000','EoRTdPuF','DEPT-003','220A'),('DOC-0021','Naimul Islam','MS','Rangpur Medical College','01582978318','51KMk9bz','DEPT-006','301A'),('DOC-0022','Oli Mehedi','MBBS','Chittagong Medical College','01494163698','vbh9povC','DEPT-007','101A'),('DOC-0023','Naimul Hasan','MBBS','Rangpur Medical College','01357023471','H6VoQvjY','DEPT-006','101A'),('DOC-0024','Khaled Haque','MRCP','Mymensingh Medical College','01102870681','Ed26NdBj','DEPT-004','210A'),('DOC-0025','Shahriar Mehedi','MS','Dhaka Medical College','01287689757','bFOUlAQI','DEPT-003','301A'),('DOC-0026','Muntasir Mehedi','MD','Comilla Medical College','01235007215','RTttwKmA','DEPT-006','201A'),('DOC-0027','Tahmid Islam','MS','Rangpur Medical College','01829967985','MJPxHIQt','DEPT-005','301A'),('DOC-0028','Khaled Haque','MRCP','Comilla Medical College','01913489721','t3SNos0A','DEPT-001','210A'),('DOC-0029','Nazrul Mahmud','DO','Rangpur Medical College','01281517994','SILN3Vwu','DEPT-007','220A'),('DOC-0030','Tahsinul Haque','MBBS','Dhaka Medical College','01111416047','UOk40hWM','DEPT-004','101A'),('DOC-0031','Naimul Islam','MRCP','Mymensingh Medical College','01653229882','LvNU661I','DEPT-002','210A');
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `id` varchar(15) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES ('01234567890','Muntasir Mamun Nahid','Dm3DGxjj'),('01601022186','Rigan Mahmud Chowdhury','FF8qQfbJ'),('01983848302','John Marston','ripvanwinkle'),('09876543212','Nazrul Islam','SuRgP2iZ'),('123123123','Md Kamrujjaman Mobin','rCFFB8me'),('12313131231231','Rigan Mahmud Chowdhury','gkDNFwi2'),('12345612','Md Kamrujjaman Mobin','31FQfuta'),('2019331026','AR Joy','xspTqthE'),('2019331044','Md Kamrujjaman Mobin','YYWJuXwL'),('2019331046','Sadik Al Barid','kc8fbCiX'),('2019331110','Nazrul Islam','nazrulvai'),('2019331119','Muntasir Mamun Nahid','uqns7V0w');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `receptionist`
--

DROP TABLE IF EXISTS `receptionist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receptionist` (
  `id` varchar(20) NOT NULL,
  `name` varchar(64) DEFAULT NULL,
  `phone` varchar(64) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receptionist`
--

LOCK TABLES `receptionist` WRITE;
/*!40000 ALTER TABLE `receptionist` DISABLE KEYS */;
/*!40000 ALTER TABLE `receptionist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertype`
--

DROP TABLE IF EXISTS `usertype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertype` (
  `id` varchar(20) NOT NULL,
  `u_type` varchar(10) DEFAULT NULL,
  `password` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertype`
--

LOCK TABLES `usertype` WRITE;
/*!40000 ALTER TABLE `usertype` DISABLE KEYS */;
INSERT INTO `usertype` VALUES ('01234567890','patient','Dm3DGxjj'),('01601022186','patient','FF8qQfbJ'),('09876543212','patient','SuRgP2iZ'),('123123123','patient','rCFFB8me'),('12313131231231','patient','gkDNFwi2'),('12345612','patient','31FQfuta'),('2019331026','patient','xspTqthE'),('2019331044','patient','YYWJuXwL'),('2019331046','patient','kc8fbCiX'),('2019331110','patient','nazrulvai'),('2019331119','patient','uqns7V0w'),('DOC-0001','Doc','ibn_sina'),('DOC-0002','Doc','munnavai'),('DOC-0003','Doc','house1234'),('DOC-0012','Doc','IiR5gR6g'),('DOC-0013','Doc','1HHdDQKZ'),('DOC-0014','Doc','w6961HwS'),('DOC-0015','Doc','zx98G7WG'),('DOC-0016','Doc','wm124ZkR'),('DOC-0017','Doc','fv6YGrMv'),('DOC-0018','Doc','zsmZoG0O'),('DOC-0019','Doc','lzWb5DHz'),('DOC-0020','Doc','EoRTdPuF'),('DOC-0021','Doc','51KMk9bz'),('DOC-0022','Doc','vbh9povC'),('DOC-0023','Doc','H6VoQvjY'),('DOC-0024','Doc','Ed26NdBj'),('DOC-0025','Doc','bFOUlAQI'),('DOC-0026','Doc','RTttwKmA'),('DOC-0027','Doc','MJPxHIQt'),('DOC-0028','Doc','t3SNos0A'),('DOC-0029','Doc','SILN3Vwu'),('DOC-0030','Doc','UOk40hWM'),('DOC-0031','Doc','LvNU661I');
/*!40000 ALTER TABLE `usertype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visit`
--

DROP TABLE IF EXISTS `visit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visit` (
  `id` varchar(20) NOT NULL,
  `p_id` varchar(20) DEFAULT NULL,
  `d_id` varchar(20) DEFAULT NULL,
  `serial` int NOT NULL,
  `a_status` tinyint(1) DEFAULT NULL,
  `p_name` varchar(45) DEFAULT NULL,
  `p_sex` varchar(10) DEFAULT NULL,
  `p_age` varchar(10) DEFAULT NULL,
  `a_time` date DEFAULT NULL,
  `p_phone` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visit`
--

LOCK TABLES `visit` WRITE;
/*!40000 ALTER TABLE `visit` DISABLE KEYS */;
INSERT INTO `visit` VALUES ('1sR3my7lrW','01601022186','DOC-0002',2,0,'Sadik Al Barid','Male','25','2023-08-25','09123123123123'),('6I4wrueJUk','2019331044','DOC-0002',4,0,'Md Kamrujjaman Mobin','Male','23','2023-08-24','2019331044'),('8wcRf5LtKB','01601022186','DOC-0002',1,0,'Rigan Mahmud Chowdhury','Male','22','2023-08-26','01601022186'),('AirZlL3OLX','2019331026','DOC-0001',2,0,'AR Joy','Male','23','2023-08-24','2019331026'),('CxGuaSoV8P','01601022186','DOC-0003',2,1,'Rigan Mahmud Chowdhury','Male','22','2023-08-24','01601022186'),('EI1G9AcLMR','12345612','DOC-0019',1,0,'Md Kamrujjaman Mobin','Male','23','2023-08-28','12345612'),('GacbLOI5NA','2019331026','DOC-0001',4,0,'AR Joy','Male','23','2023-08-24','2019331026'),('GGOobI9tws','QBWO8xm2vF','DOC-0002',2,0,'Rigan Mahmud Chowdhury','Male','22','2023-08-24',NULL),('IYO0qRH7VE','01601022186','DOC-0003',1,1,'Rigan Mahmud Chowdhury','Male','22','2023-08-24','01601022186'),('NIVwleGhEO','2019331119','DOC-0001',1,1,'Muntasir Mamun Nahid','Male','23','2023-08-24','2019331119'),('No2yuWkost','01601022186','DOC-0004',1,0,'Rigan Mahmud Chowdhury','Male','22','2023-08-25','01601022186'),('NXp3Fd3INT','12313131231231','DOC-0003',1,0,'Rigan Mahmud Chowdhury','Male','22','2023-08-25','12313131231231'),('O8TE5hmsHb','2019331046','DOC-0003',3,0,'Sadik Al Barid','Male','25','2023-08-24','2019331046'),('pkMpoFsSIU','2019331110','DOC-0002',1,0,'Nazrul Islam','Male','45','2023-08-30','01976022186'),('QUS85QQ9jx','2019331026','DOC-0001',3,0,'AR Joy','Male','23','2023-08-24','2019331026'),('ui7Ly6fpDx','CeLfrVCXgb','DOC-0002',1,0,'Rigan Mahmud Chowdhury','Male','22','2023-08-24',NULL),('xE0oDdifsj','01601022186','DOC-0003',1,0,'Rigan Mahmud Chowdhury','Male','22','2023-08-26','01601022186'),('YmDUNP3LIH','QBWO8xm2vF','DOC-0002',1,0,'Hosea Mathews','Male','56','2023-08-25',NULL),('zhpRlVbz79','2019331110','DOC-0001',1,0,'Nazrul Islam','Male','23','2023-08-25','2019331110');
/*!40000 ALTER TABLE `visit` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-26  0:48:06
