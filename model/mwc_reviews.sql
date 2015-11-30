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
-- Table structure for table `mwc_reviews`
--

CREATE TABLE IF NOT EXISTS `mwc_reviews` (
`review_id` int(11) NOT NULL,
  `review` varchar(1000) NOT NULL,
  `book` int(11) NOT NULL,
  `date` date NOT NULL,
  `reviewer` varchar(50) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `mwc_reviews`
--

INSERT INTO `mwc_reviews` (`review_id`, `review`, `book`, `date`, `reviewer`) VALUES
(1, 'An excellent portrayal of disctatorship in microcosm', 1, '2015-11-28', '1'),
(2, 'An excellent portrayal of disctatorship in microcosm', 1, '2015-11-28', '1'),
(3, 'An excellent portrayal of disctatorship in microcosm', 2, '2015-11-28', '1'),
(4, 'Need a little work though', 2, '2015-11-29', 'esi.kwame'),
(5, 'Perhaps need a touch of class', 2, '2015-11-29', 'ayew.davis'),
(6, 'Very Intuitive', 8, '2015-11-29', 'ayew.davis'),
(7, 'ghghghhghg', 5, '2015-11-29', 'ayew.davis'),
(8, 'Incredible', 7, '2015-11-29', 'ayew.davis'),
(9, 'Business minded', 7, '2015-11-29', 'ayew.davis'),
(10, 'Testing', 3, '2015-11-29', 'ayew.davis'),
(11, 'Good book', 9, '2015-11-29', 'ayew.davis'),
(12, 'blah blah', 2, '2015-11-30', 'ayew.davis'),
(13, 'An excellent of Kofi and Ama', 11, '2015-11-30', 'ayew.davis'),
(14, 'dshdsjhdshjdshjds', 3, '2015-11-30', 'kwaku.mintah');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `mwc_reviews`
--
ALTER TABLE `mwc_reviews`
 ADD PRIMARY KEY (`review_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `mwc_reviews`
--
ALTER TABLE `mwc_reviews`
MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=15;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
