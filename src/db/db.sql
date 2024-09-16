-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: May 29, 2022 at 03:54 PM
-- Server version: 5.7.34
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejs_exam`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `group_id`, `user_id`) VALUES
(1, 2, 2),
(2, 3, 3),
(3, 3, 3),
(4, 1, 4),
(5, 1, 4),
(6, 4, 8),
(7, 5, 8),
(8, 5, 14),
(9, 5, 8),
(10, 8, 8),
(11, 8, 14),
(12, 5, 8),
(13, 2, 8);

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`id`, `group_id`, `amount`, `description`) VALUES
(1, 1, 300, 'car rental'),
(2, 2, 100, 'Dinner'),
(3, 2, 100, 'Lunch'),
(4, 2, 80, 'Breakfast'),
(5, 2, 20, 'ticket'),
(6, 2, 20, 'ticket'),
(7, 2, 20, 'ticket'),
(8, 8, 20, 'ticket'),
(9, 8, 200, 'plane tickets'),
(10, 8, 120, 'car rental'),
(11, 5, 90, 'Grocceries'),
(12, 5, 60, 'Swimming Pool'),
(13, 55, 50, 'drinks'),
(14, 55, 500, 'Kebabf'),
(15, 8, 100, 'drinks'),
(16, 8, 100, 'food'),
(20, 8, 500, 'snacks'),
(21, 8, 50, 'asdasd'),
(22, 8, 55, 'bar pool'),
(23, 8, 4545, 'rental'),
(24, 8, 12, 'asd'),
(25, 8, 45, 'asdsad'),
(26, 5, 777, 'Champage Papi'),
(27, 5, 50, 'car');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`) VALUES
(1, 'Trip to Spain'),
(2, 'Going to Alps'),
(3, 'Dinner in Belgium'),
(4, 'Trip to Finland'),
(5, 'New Years Party'),
(6, 'Trip to Malibu'),
(7, 'A night out in Singapore'),
(8, 'Day trip to Las Vegas');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `reg_timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `email`, `password`, `reg_timestamp`) VALUES
(2, 'Rokas Ruzevicius', 'rokasra@gmail.com', '$2a$10$OlwibALuvLU6YH5tD7Zqo.49wi8OBUHTu0HCNwJXZoe3u0wAh6D9G', '2022-05-25 19:59:34'),
(4, 'Didelis Krabas', 'labas@krabas.com', '$2a$10$nLsSpa99ccJ4RUOI2Cqdk.rS0E/HCki3BR.gAv9k.DKOpOOavfT6u', '2022-05-26 06:51:51'),
(7, 'Super mama', 'tavo@mama.lt', '$2a$10$H8.vsXPDDdVqyb2u7NnCc.SjrPK..2A.z4LQBG7xmJx284clneLce', '2022-05-27 07:51:35'),
(9, 'Ponas Tadas', 'hihihi@gmail.com', '$2a$10$9lGqGsFVjWNSz1DDCzqjq.OkOsgAQ/1U5hJPUSUDL3lwG.iezG9ke', '2022-05-28 07:30:11'),
(10, 'Kempiniukas Placiakelnis', 'hehehei@gmail.com', '$2a$10$ixcVbjDEsjrFb.UMegILj.SGi727FxAnV.yLi2OG.igsvoODoQgtu', '2022-05-28 07:35:34'),
(14, 'Petras Petraitis', 'petras@grazulis.lt', '$2a$10$Op0EyU/EZQ/EqOCxE0CICe78gwj/HaB/Bb9eiI7rIkPHaT.YrHMMO', '2022-05-28 10:17:56'),
(17, 'bandymas devyni', 'kazkelintas@bandymas.lt', '$2a$10$14qLluAhVlUmHv1hyQXyjecirzIUJWjE/IKkAs5CWQzEt0S4ab/fi', '2022-05-29 15:43:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
