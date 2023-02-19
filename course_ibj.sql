-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.7.33 - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for course_ibj
DROP DATABASE IF EXISTS `course_ibj`;
CREATE DATABASE IF NOT EXISTS `course_ibj` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `course_ibj`;

-- Dumping structure for table course_ibj.admin
DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- Dumping data for table course_ibj.admin: ~1 rows (approximately)
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` (`id`, `name`, `email`, `password`) VALUES
	(1, 'admin', 'admin@ibj.com', '$2b$10$d0JOaC1BEnLPOdFH4oJEzuj3jWfv4Xrgg2GENUboSp7wzVhZtS4hy');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- Dumping structure for table course_ibj.akses_token
DROP TABLE IF EXISTS `akses_token`;
CREATE TABLE IF NOT EXISTS `akses_token` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `token_akses` text NOT NULL,
  `ip_address` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_akses_token_course_ibj.admin` (`user_id`) USING BTREE,
  CONSTRAINT `FK_akses_token_course_ibj.admin` FOREIGN KEY (`user_id`) REFERENCES `admin` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- Dumping data for table course_ibj.akses_token: ~0 rows (approximately)
/*!40000 ALTER TABLE `akses_token` DISABLE KEYS */;
INSERT INTO `akses_token` (`id`, `user_id`, `token_akses`, `ip_address`) VALUES
	(10, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnRydWUsImlhdCI6MTY3Njc4MjQ2MCwiZXhwIjoxNjc2Nzg0MjYwfQ.G42uBXkUSK4o879VsQYvMX_lwev_wZZPg5dDj44tmaw', '192.168.56.1');
/*!40000 ALTER TABLE `akses_token` ENABLE KEYS */;

-- Dumping structure for table course_ibj.courses
DROP TABLE IF EXISTS `courses`;
CREATE TABLE IF NOT EXISTS `courses` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  `course_category_id` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_course__courses_categories` (`course_category_id`),
  CONSTRAINT `FK_course__courses_categories` FOREIGN KEY (`course_category_id`) REFERENCES `course_categories` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Dumping data for table course_ibj.courses: ~5 rows (approximately)
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` (`id`, `title`, `course_category_id`) VALUES
	(1, 'Dasar pemrograman', 1),
	(2, 'Basic Internet of Things', 1),
	(3, 'Jaringan Komputer Dasar', 2),
	(4, 'Dasar Digital Marketing', 3),
	(5, 'Dasar Manajemen Keuangan', 4);
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;

-- Dumping structure for table course_ibj.course_categories
DROP TABLE IF EXISTS `course_categories`;
CREATE TABLE IF NOT EXISTS `course_categories` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Dumping data for table course_ibj.course_categories: ~4 rows (approximately)
/*!40000 ALTER TABLE `course_categories` DISABLE KEYS */;
INSERT INTO `course_categories` (`id`, `name`) VALUES
	(1, 'pemrograman'),
	(2, 'jaringan'),
	(3, 'digital marketing'),
	(4, 'manajemen');
/*!40000 ALTER TABLE `course_categories` ENABLE KEYS */;

-- Dumping structure for table course_ibj.users
DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Dumping data for table course_ibj.users: ~3 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
	(1, 'Dion', 'dion@email.com', '$2b$10$SQzsxmN58A15VQfCSktXDu5QPLbc95NdB36THDMSXDQHPLzg4N3TK'),
	(2, 'Naruto', 'naruto@email.com', '$2b$10$DhmIF6ViJx8YhDZvsJ1kvu2N5XO.pGx4tgOEQEjOeJZFJaTDhLbSa');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

-- Dumping structure for table course_ibj.user_courses
DROP TABLE IF EXISTS `user_courses`;
CREATE TABLE IF NOT EXISTS `user_courses` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL DEFAULT '0',
  `course_id` bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `FK_users_courses__users` (`user_id`),
  KEY `FK_users_courses__courses` (`course_id`) USING BTREE,
  CONSTRAINT `FK_user_courses__courses` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `FK_users_courses__users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- Dumping data for table course_ibj.user_courses: ~2 rows (approximately)
/*!40000 ALTER TABLE `user_courses` DISABLE KEYS */;
INSERT INTO `user_courses` (`id`, `user_id`, `course_id`) VALUES
	(1, 1, 2);
/*!40000 ALTER TABLE `user_courses` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
