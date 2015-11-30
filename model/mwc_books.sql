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
-- Table structure for table `mwc_books`
--

CREATE TABLE IF NOT EXISTS `mwc_books` (
`id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `author` varchar(200) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `isbn` varchar(20) NOT NULL,
  `year` year(4) NOT NULL,
  `price` float NOT NULL,
  `genre` varchar(20) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mwc_books`
--

INSERT INTO `mwc_books` (`id`, `title`, `author`, `description`, `isbn`, `year`, `price`, `genre`) VALUES
(2, 'Ant Hills of the Savannah', 'Chinua Achebe', 'A very Good book', '1909-9090-1', 1987, 23, NULL),
(3, '$title', '$author', '$desc', '$isbn', 0000, 3909, NULL),
(4, 'test', 'test', 'test', '134500990', 1967, 1.9, NULL),
(5, 'The Art of War', 'Sun Tzu', '                            ', '192-345-23', 1997, 39, NULL),
(6, 'As a Man Thinketh', 'James Allen', '                            ', 'None', 2003, 45, NULL),
(7, 'Game Theory', 'Michael Mashler', '', '978-1-107-00548-8', 1927, 39, NULL),
(8, 'Game Theory', 'Michael Mashler', '', '978-1-107-00548-8', 1927, 39, NULL),
(9, 'Game Theory', 'Michael Mashler', '', '978-1-107-00548-8', 1927, 39, NULL),
(10, 'fhdjhjfdjhfdhj', 'dfdfdfjhdfjhhj', 'fdhjdfjjhfdhjdfjh', '189-0989', 0000, 7878, NULL),
(11, 'Ama and Kofi', 'Samuel Agyemang', 'Kofi Beat Ama', '1980-909-89', 2015, 23, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mwc_books`
--
ALTER TABLE `mwc_books`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mwc_books`
--
ALTER TABLE `mwc_books`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=12;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
