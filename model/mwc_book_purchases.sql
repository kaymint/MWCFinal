-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 30, 2015 at 08:12 PM
-- Server version: 5.6.21
-- PHP Version: 5.6.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `mobile_web`
--

-- --------------------------------------------------------

--
-- Table structure for table `mwc_book_purchases`
--

CREATE TABLE IF NOT EXISTS `mwc_book_purchases` (
  `book_id` int(11) NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `cost` float NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mwc_book_purchases`
--

INSERT INTO `mwc_book_purchases` (`book_id`, `user_id`, `cost`, `date`) VALUES
(2, '1', 23, '2015-11-28'),
(2, '1', 23, '2015-11-28'),
(2, 'ayew.davis', 23, '2015-11-29'),
(9, 'ayew.davis', 39, '2015-11-29'),
(11, 'ayew.davis', 23, '2015-11-30'),
(2, 'kwaku.mintah', 23, '2015-11-30'),
(3, 'kwaku.mintah', 3909, '2015-11-30'),
(2, 'k.m', 23, '2015-11-30');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
