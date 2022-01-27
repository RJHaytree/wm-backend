-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2021 at 03:56 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `workstation_man_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_departments`
--

CREATE TABLE `tbl_departments` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_departments`
--

INSERT INTO `tbl_departments` (`id`, `name`, `description`) VALUES
(1, 'Reception', 'Handle immediate customer enqueries'),
(2, 'IT Help Desk', 'Handle internal computer issues and queries');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_workstations`
--

CREATE TABLE `tbl_workstations` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `ip_address` varchar(50) NOT NULL,
  `cpu` varchar(50) NOT NULL,
  `motherboard` varchar(50) NOT NULL,
  `ram` varchar(10) NOT NULL,
  `hdd` varchar(10) NOT NULL,
  `ssd` varchar(10) NOT NULL,
  `conn_type` varchar(10) NOT NULL,
  `department_id` int(11) NOT NULL,
  `type` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_workstations`
--

INSERT INTO `tbl_workstations` (`id`, `name`, `ip_address`, `cpu`, `motherboard`, `ram`, `hdd`, `ssd`, `conn_type`, `department_id`, `type`) VALUES
(1, 'IT_M_1', '192.168.1.19', 'AMD Ryzen 5 5700X', 'Gigabyte A320M-H', '16GB 2800R', '2TB', '500GB', 'Ethernet', 1, 'desktop'),
(2, 'IT_M_2', '192.168.1.20', 'AMD Ryzen 5 5600G', 'Asus LPX', '16GB', '1TB', '256GB', 'Wireless', 1, 'laptop');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_departments`
--
ALTER TABLE `tbl_departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_workstations`
--
ALTER TABLE `tbl_workstations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department_id` (`department_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_departments`
--
ALTER TABLE `tbl_departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_workstations`
--
ALTER TABLE `tbl_workstations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_workstations`
--
ALTER TABLE `tbl_workstations`
  ADD CONSTRAINT `tbl_workstations_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `tbl_departments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
