-- phpMyAdmin SQL Dump
-- version 4.2.11
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Nov 30, 2015 at 08:13 PM
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
-- Table structure for table `mwc_book_users`
--

CREATE TABLE IF NOT EXISTS `mwc_book_users` (
  `username` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mwc_book_users`
--

INSERT INTO `mwc_book_users` (`username`, `password`, `email`, `phone`) VALUES
('$username', '$password', '$email', NULL),
('adjoa', 'sally.biney', 'sizzlerbee@yahoo.com', NULL),
('ayew.davis', 'ayew.davis', 'ayew@yahoo.com', NULL),
('esi.kwame', 'esi.kwame', 'sizzlerbee@yahoo.com', NULL),
('k.m', 'k.m', 'kenneth.mensah62@gmail.com', '233200393945'),
('Kenneth Mintah Mensah', 'kaymint', 'kenneth.mensah@ashesi.edu.gh', NULL),
('kenneth.mensah', 'kaymint', 'kenneth.mensah62@gmail.com', NULL),
('kwaku.mintah', 'kaymint', 'kenneth.mensah62@gmail.com', '233200393945'),
('kwame.papa', 'sally.biney', 'sizzlerbee@yahoo.com', NULL),
('kwasi.davis', 'kwasi.davis', 'kenneth.mensah@ashesi.edu.gh', NULL),
('papano', 'sally.biney', 'sizzlerbee@yahoo.com', NULL),
('sally.biney', 'sally.biney', 'sizzlerbee@yahoo.com', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mwc_book_users`
--
ALTER TABLE `mwc_book_users`
 ADD PRIMARY KEY (`username`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
