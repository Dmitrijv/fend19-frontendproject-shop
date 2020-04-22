-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 22, 2020 at 10:46 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `currency`
--

CREATE TABLE `currency` (
  `id` char(12) NOT NULL,
  `shorthand` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `currency`
--

INSERT INTO `currency` (`id`, `shorthand`) VALUES
('SEK', 'kr');

-- --------------------------------------------------------

--
-- Table structure for table `image`
--

CREATE TABLE `image` (
  `file_name` varchar(255) NOT NULL DEFAULT '''placeholder.png'''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `image`
--

INSERT INTO `image` (`file_name`) VALUES
('2-cover.jpg'),
('3-cover.jpg'),
('4-cover.jpg'),
('5-cover.jpg'),
('5B1vlLe.jpg'),
('5cm_wallpaper_03.png'),
('7-cover.jpg'),
('8-cover.jpg'),
('obl.jpg'),
('spike2.jpg'),
('spike3.jpg'),
('tumblr_lz6o21vKYj1rpqeqto1_400.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `image_of_product`
--

CREATE TABLE `image_of_product` (
  `product_id` int(11) NOT NULL,
  `file_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `image_of_product`
--

INSERT INTO `image_of_product` (`product_id`, `file_name`) VALUES
(29, '2-cover.jpg'),
(29, 'spike2.jpg'),
(29, 'spike3.jpg'),
(30, '3-cover.jpg'),
(31, '5-cover.jpg'),
(32, '7-cover.jpg'),
(33, '8-cover.jpg'),
(34, '5B1vlLe.jpg'),
(35, '5cm_wallpaper_03.png'),
(37, '4-cover.jpg'),
(41, 'obl.jpg'),
(42, 'tumblr_lz6o21vKYj1rpqeqto1_400.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `ordered_product`
--

CREATE TABLE `ordered_product` (
  `product_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `price` double NOT NULL,
  `currency_id` char(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `order_of_products`
--

CREATE TABLE `order_of_products` (
  `id` int(11) NOT NULL,
  `date_ordered_at` datetime NOT NULL,
  `status` int(11) NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `email` text NOT NULL,
  `phone` text NOT NULL,
  `deliveryadress` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `order_status`
--

CREATE TABLE `order_status` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_status`
--

INSERT INTO `order_status` (`id`, `name`) VALUES
(1, 'Ny'),
(2, 'Behandlas'),
(3, 'Slutförd');

-- --------------------------------------------------------

--
-- Table structure for table `price_of_product`
--

CREATE TABLE `price_of_product` (
  `product_id` int(11) NOT NULL,
  `currency_id` char(12) NOT NULL,
  `amount` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `price_of_product`
--

INSERT INTO `price_of_product` (`product_id`, `currency_id`, `amount`) VALUES
(29, 'SEK', 1000),
(30, 'SEK', 500),
(31, 'SEK', 1500),
(32, 'SEK', 999.99),
(33, 'SEK', 400),
(34, 'SEK', 800),
(35, 'SEK', 8000),
(37, 'SEK', 100),
(41, 'SEK', 22),
(42, 'SEK', 999);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `title` text NOT NULL,
  `description` text NOT NULL,
  `category_id` int(11) DEFAULT 1,
  `number_in_stock` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `title`, `description`, `category_id`, `number_in_stock`) VALUES
(29, 'Spike', 'this is a desert spike yo', 1, 5),
(30, 'Pastell Förälskelse', 'elephants in love', 1, 1),
(31, 'Dimensional Shift', 'it\'s a shift hue hue', 6, 12),
(32, 'Tales of the Past', 'some tales of bullshit', 6, 3),
(33, 'Horse', 'here comes horsy', 1, 3),
(34, 'Horde Baloon', 'smh over here', 1, 2),
(35, 'Clouds', 'lalala clouds yo', 1, 1),
(37, 'Some Nonsense', 'it\'s a nonsense not gona lie', 1, 3),
(41, 'Oblivion', '123123', 1, 11),
(42, 'Nice', 'brrrrrrrrrrrrr', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `product_category`
--

CREATE TABLE `product_category` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_category`
--

INSERT INTO `product_category` (`id`, `name`) VALUES
(1, 'Diverse'),
(4, 'Naturmotiv'),
(5, 'Djur Tavlor'),
(6, 'Abstrakt');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`file_name`);

--
-- Indexes for table `image_of_product`
--
ALTER TABLE `image_of_product`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `file_name` (`file_name`);

--
-- Indexes for table `ordered_product`
--
ALTER TABLE `ordered_product`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `currency` (`currency_id`);

--
-- Indexes for table `order_of_products`
--
ALTER TABLE `order_of_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status` (`status`);

--
-- Indexes for table `order_status`
--
ALTER TABLE `order_status`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `price_of_product`
--
ALTER TABLE `price_of_product`
  ADD KEY `product` (`product_id`),
  ADD KEY `currency` (`currency_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `product_category`
--
ALTER TABLE `product_category`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `order_of_products`
--
ALTER TABLE `order_of_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `product_category`
--
ALTER TABLE `product_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `image_of_product`
--
ALTER TABLE `image_of_product`
  ADD CONSTRAINT `imagenameek` FOREIGN KEY (`file_name`) REFERENCES `image` (`file_name`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `productkeyy` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ordered_product`
--
ALTER TABLE `ordered_product`
  ADD CONSTRAINT `currencykey` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `orderkey` FOREIGN KEY (`order_id`) REFERENCES `order_of_products` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `productkey` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `order_of_products`
--
ALTER TABLE `order_of_products`
  ADD CONSTRAINT `ordstatusfkey` FOREIGN KEY (`status`) REFERENCES `order_status` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `price_of_product`
--
ALTER TABLE `price_of_product`
  ADD CONSTRAINT `currency_key` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `product_key` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `category_foreignk` FOREIGN KEY (`category_id`) REFERENCES `product_category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
