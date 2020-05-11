-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 11, 2020 at 02:42 PM
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
-- Table structure for table `active_order_of_products`
--

CREATE TABLE `active_order_of_products` (
  `id` int(11) NOT NULL,
  `date_ordered_at` datetime NOT NULL,
  `status` int(11) NOT NULL,
  `customer_data_id` varchar(32) NOT NULL,
  `free_shipping` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `active_order_of_products`
--

INSERT INTO `active_order_of_products` (`id`, `date_ordered_at`, `status`, `customer_data_id`, `free_shipping`) VALUES
(11, '2020-04-29 19:18:10', 1, '944cfba9624a1bc8ce6075f0e3eb153b', 1),
(12, '2020-04-29 19:19:53', 1, '944cfba9624a1bc8ce6075f0e3eb153b', 1),
(13, '2020-04-29 19:21:06', 2, '944cfba9624a1bc8ce6075f0e3eb153b', 1),
(14, '2020-04-29 19:23:22', 1, '944cfba9624a1bc8ce6075f0e3eb153b', 1),
(15, '2020-04-29 19:24:09', 2, '944cfba9624a1bc8ce6075f0e3eb153b', 1),
(16, '2020-04-29 19:50:59', 1, '944cfba9624a1bc8ce6075f0e3eb153b', 1),
(18, '2020-04-29 19:59:52', 1, '944cfba9624a1bc8ce6075f0e3eb153b', 1),
(19, '2020-04-29 20:00:10', 1, '944cfba9624a1bc8ce6075f0e3eb153b', 1),
(20, '2020-04-29 21:35:55', 2, 'f80c2a7db8b9d8b577a30dcd82f79f5c', 1),
(21, '2020-04-29 21:45:54', 2, 'bebc504d09417ac4b773c5dd790020f8', 1),
(23, '2020-04-30 11:38:28', 2, '4aa256929e8b5a020a811dc8466a9dec', 1),
(24, '2020-04-30 22:41:33', 1, 'e5c61cfa480ca6ce8e99048c5df746d5', 0),
(25, '2020-04-30 22:44:47', 1, 'de7005d0b36832d1071d3972366fe1c3', 1),
(26, '2020-04-30 22:55:19', 1, '944cfba9624a1bc8ce6075f0e3eb153b', 1),
(27, '2020-05-01 12:11:43', 1, '4ed26ab9cf6dffce6e6019a39b61889f', 1),
(28, '2020-05-02 14:35:16', 1, 'cbbc8fd5c48b0ab9532e8b775175f745', 0),
(30, '2020-05-02 15:16:22', 1, '5ca3fd495fcd290573855f2a3417f3e1', 1),
(31, '2020-05-02 15:17:09', 1, '4a995b336c8ac19b6049972fd4d8d2be', 1),
(32, '2020-05-02 15:17:26', 2, 'f7711dd6f98dc16205a89813b6ac37fd', 1),
(33, '2020-05-02 15:17:53', 1, '1e75e5a214e6c8516242c43cd0ffdf27', 1),
(34, '2020-05-02 15:18:35', 1, '9fa5f2daf1c3ecfc5e8cac1640ea994c', 1),
(36, '2020-05-02 15:20:10', 1, '5094749814d5f4b8311de4de7f4062d0', 1),
(37, '2020-05-03 17:59:58', 2, '3ad5e1abfc0071a262ccdf4d1194550d', 1),
(38, '2020-05-04 11:16:05', 1, 'f7711dd6f98dc16205a89813b6ac37fd', 0),
(39, '2020-05-04 11:36:38', 1, 'e875d112d9ac8071139bf1aee148e108', 1),
(40, '2020-05-04 11:39:48', 1, '3ad5e1abfc0071a262ccdf4d1194550d', 1),
(41, '2020-05-04 11:41:50', 2, '4aa256929e8b5a020a811dc8466a9dec', 1),
(42, '2020-05-04 11:42:26', 1, '365ee95800b5884229c5c930d194d2cd', 0),
(47, '2020-05-04 14:11:57', 1, '3ad5e1abfc0071a262ccdf4d1194550d', 1),
(48, '2020-05-08 10:34:45', 1, 'f7711dd6f98dc16205a89813b6ac37fd', 0),
(49, '2020-05-08 10:40:50', 1, 'f7711dd6f98dc16205a89813b6ac37fd', 0),
(50, '2020-05-08 10:41:49', 1, '228c403b2aeba85d0c242d669beee48d', 1),
(52, '2020-05-08 14:51:00', 1, 'f013129a2d14ab0eedbfe8b35f5bb436', 1),
(53, '2020-05-08 22:01:28', 1, 'f7711dd6f98dc16205a89813b6ac37fd', 1);

-- --------------------------------------------------------

--
-- Table structure for table `completed_order_of_products`
--

CREATE TABLE `completed_order_of_products` (
  `id` int(11) NOT NULL,
  `date_ordered_at` datetime NOT NULL,
  `status` int(11) NOT NULL,
  `customer_data_id` varchar(32) NOT NULL,
  `free_shipping` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `completed_order_of_products`
--

INSERT INTO `completed_order_of_products` (`id`, `date_ordered_at`, `status`, `customer_data_id`, `free_shipping`) VALUES
(35, '2020-05-02 15:19:51', 3, '5094749814d5f4b8311de4de7f4062d0', 1),
(43, '2020-05-04 11:44:55', 3, 'de7005d0b36832d1071d3972366fe1c3', 1),
(44, '2020-05-04 12:14:07', 3, '4aa256929e8b5a020a811dc8466a9dec', 1),
(45, '2020-05-04 12:15:29', 3, 'de7005d0b36832d1071d3972366fe1c3', 1),
(46, '2020-05-04 12:21:08', 3, 'e93c98d10a3307f13b2121a8be7637e3', 1),
(51, '2020-05-08 10:45:07', 3, 'f7711dd6f98dc16205a89813b6ac37fd', 1);

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
-- Table structure for table `customer_data`
--

CREATE TABLE `customer_data` (
  `id` varchar(32) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(64) NOT NULL,
  `first_name` varchar(128) NOT NULL,
  `last_name` varchar(128) NOT NULL,
  `street` varchar(128) NOT NULL,
  `postal_number` varchar(64) NOT NULL,
  `county` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer_data`
--

INSERT INTO `customer_data` (`id`, `email`, `phone`, `first_name`, `last_name`, `street`, `postal_number`, `county`) VALUES
('1e75e5a214e6c8516242c43cd0ffdf27', 'hello@gmail.com', '0734434305', 'Anna Maria', 'Ramirez', 'Storgatan 1', '332 12', 'Mora'),
('228c403b2aeba85d0c242d669beee48d', 'hello2@gmail.com', '0734434305', 'Anna Maria', 'Ramirez', 'Svea Vägen 16', '332 12', 'Stockholm'),
('3454b5836f09f76da144e5c72100d0cc', 'hello@gmail.com', '0734434305', 'Dzmitry', 'Velström', 'Svea Vägen 16', '332 12', 'Stockholm'),
('365ee95800b5884229c5c930d194d2cd', 'lala@gmail.com', '0742234534', 'Kider', 'Homster', 'Hellogatan 12', '254 44', 'Stockholm'),
('3ad5e1abfc0071a262ccdf4d1194550d', 'hello@gmail.com', '0734434305', 'Anna Maria', 'Ramirez', 'Storgatan 1', '168 43', 'Stockholm'),
('4a995b336c8ac19b6049972fd4d8d2be', 'hello2@gmail.com', '0734434305', 'Anna Maria', 'Ramirez', 'Storgatan 1', '332 12', 'Stockholm'),
('4aa256929e8b5a020a811dc8466a9dec', 'lala@gmail.com', '0742234534', 'Kider', 'Homster', 'Hellogatan 12', '154 44', 'Skåne'),
('4ed26ab9cf6dffce6e6019a39b61889f', 'hello@gmail.com', '0734434305', 'Mahmud', 'Al Hakim', 'Svea Vägen 16', '332 12', 'Stockholm'),
('5094749814d5f4b8311de4de7f4062d0', 'hello@gmail.com', '07344343054', 'Eric', 'Price', 'Dugatan 12', '332 12', 'Småland'),
('5ca3fd495fcd290573855f2a3417f3e1', 'hello@gmail.com', '0734434305', 'John', 'Doe', 'Svea Vägen 16', '332 12', 'Stockholm'),
('944cfba9624a1bc8ce6075f0e3eb153b', 'hello@gmail.com', '734434305', 'Dzmitry', 'Velström', 'Storgatan 1', '332 12', 'Mora'),
('9fa5f2daf1c3ecfc5e8cac1640ea994c', 'hello@gmail.com', '0734434305', 'John', 'Doe', 'Storgatan 1', '332 12', 'Mora'),
('bebc504d09417ac4b773c5dd790020f8', 'hello@gmail.com', '07344343054', 'John', 'Doe', 'Dugatan 12', '332 12', 'Stockholm'),
('cbbc8fd5c48b0ab9532e8b775175f745', 'hello2@gmail.com', '0734434305', 'John', 'Doe', 'Svea Vägen 16', '332 12', 'Stockholm'),
('de7005d0b36832d1071d3972366fe1c3', 'hello@gmail.com', '0734434305', 'Anna Maria', 'Ramirez', 'Svea Vägen 16', '332 12', 'Stockholm'),
('e5c61cfa480ca6ce8e99048c5df746d5', 'hello2@gmail.com', '0734434305', 'Anna Maria', 'Ramirez', 'SveaVägen 16', '332 12', 'Stockholm'),
('e875d112d9ac8071139bf1aee148e108', 'timber@gmail.com', '0742234534', 'Kider', 'Homster', 'Hellogatan 12', '154 44', 'Stockholm'),
('e93c98d10a3307f13b2121a8be7637e3', '234324@wadawd.com', '0734434305', 'Anna Maria', 'Ramirez', 'Storgatan 1', '332 12', 'Bogte'),
('f013129a2d14ab0eedbfe8b35f5bb436', 'hello@gmail.com', '0734434305', 'John', 'Doe', 'Storgatan 1', '332 12', 'Stockholm'),
('f7711dd6f98dc16205a89813b6ac37fd', 'hello@gmail.com', '0734434305', 'Anna Maria', 'Ramirez', 'Storgatan 1', '332 12', 'Stockholm'),
('f80c2a7db8b9d8b577a30dcd82f79f5c', 'hello@gmail.com', '07344343054', 'Dzmitry', 'Velström', 'Storgatan 1', '332 12', 'Stockholm');

-- --------------------------------------------------------

--
-- Table structure for table `delivered_product`
--

CREATE TABLE `delivered_product` (
  `product_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `price` double NOT NULL,
  `quantity` int(11) NOT NULL,
  `currency_id` char(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `delivered_product`
--

INSERT INTO `delivered_product` (`product_id`, `order_id`, `price`, `quantity`, `currency_id`) VALUES
(67, 35, 7000, 1, 'SEK'),
(65, 35, 400, 1, 'SEK'),
(59, 45, 5400, 1, 'SEK'),
(63, 45, 1000, 1, 'SEK'),
(67, 45, 7000, 1, 'SEK'),
(56, 46, 450, 1, 'SEK'),
(58, 46, 360, 1, 'SEK'),
(60, 44, 400, 1, 'SEK'),
(56, 44, 450, 1, 'SEK'),
(58, 44, 360, 3, 'SEK'),
(56, 43, 450, 1, 'SEK'),
(59, 43, 5400, 1, 'SEK'),
(64, 51, 500, 2, 'SEK'),
(61, 51, 700, 2, 'SEK');

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
('144506124-origpic-55cce0.jpg'),
('175443837-origpic-55ab17.jpg'),
('2-cover.jpg'),
('3-cover.jpg'),
('4-cover.jpg'),
('6-cover.jpg'),
('7-cover.jpg'),
('79b533fc94d08441a028c0b84ed90256.png'),
('8-cover.jpg'),
('ccl.jpg'),
('dance.jpg'),
('ddddddddd.jpg'),
('hera.jpg'),
('spike2.jpg'),
('spike3.jpg'),
('stairs.jpg'),
('tigre.jpg');

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
(56, '2-cover.jpg'),
(56, 'spike2.jpg'),
(56, 'spike3.jpg'),
(57, '175443837-origpic-55ab17.jpg'),
(59, 'ccl.jpg'),
(59, 'ddddddddd.jpg'),
(60, '144506124-origpic-55cce0.jpg'),
(60, 'tigre.jpg'),
(61, '79b533fc94d08441a028c0b84ed90256.png'),
(62, 'hera.jpg'),
(63, '8-cover.jpg'),
(64, '3-cover.jpg'),
(65, '4-cover.jpg'),
(66, '6-cover.jpg'),
(67, '7-cover.jpg'),
(68, 'dance.jpg'),
(69, 'stairs.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `ordered_product`
--

CREATE TABLE `ordered_product` (
  `product_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `price` double NOT NULL,
  `quantity` int(11) NOT NULL,
  `currency_id` char(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `ordered_product`
--

INSERT INTO `ordered_product` (`product_id`, `order_id`, `price`, `quantity`, `currency_id`) VALUES
(57, 30, 90, 1, 'SEK'),
(59, 30, 5400, 1, 'SEK'),
(59, 31, 5400, 1, 'SEK'),
(56, 31, 450, 1, 'SEK'),
(63, 31, 1000, 1, 'SEK'),
(56, 32, 450, 1, 'SEK'),
(63, 32, 1000, 1, 'SEK'),
(63, 33, 1000, 1, 'SEK'),
(64, 33, 500, 1, 'SEK'),
(64, 34, 500, 1, 'SEK'),
(58, 36, 360, 1, 'SEK'),
(64, 36, 500, 1, 'SEK'),
(58, 37, 360, 1, 'SEK'),
(58, 38, 360, 1, 'SEK'),
(58, 39, 360, 1, 'SEK'),
(59, 40, 5400, 1, 'SEK'),
(62, 41, 300, 1, 'SEK'),
(57, 42, 90, 1, 'SEK'),
(57, 47, 90, 1, 'SEK'),
(58, 47, 360, 1, 'SEK'),
(59, 47, 5400, 1, 'SEK'),
(61, 47, 700, 1, 'SEK'),
(56, 48, 450, 3, 'SEK'),
(60, 49, 400, 1, 'SEK'),
(57, 49, 90, 1, 'SEK'),
(57, 50, 90, 1, 'SEK'),
(56, 50, 450, 1, 'SEK'),
(61, 52, 700, 1, 'SEK'),
(68, 53, 500, 1, 'SEK');

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
(56, 'SEK', 500),
(57, 'SEK', 100),
(58, 'SEK', 400),
(59, 'SEK', 6000),
(60, 'SEK', 400),
(61, 'SEK', 700),
(62, 'SEK', 300),
(63, 'SEK', 1000),
(64, 'SEK', 500),
(65, 'SEK', 400),
(66, 'SEK', 700),
(67, 'SEK', 7000),
(68, 'SEK', 500),
(69, 'SEK', 750);

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
(56, 'Spike', 'In vitae ultricies turpis. Aliquam volutpat diam sapien, in sagittis risus porttitor quis. Aliquam eu risus vel nunc tristique euismod sit amet sed lectus. Aenean sollicitudin consequat leo in pretium. Donec interdum quis lacus non auctor. Phasellus non commodo nulla, quis feugiat ligula. Vivamus facilisis consequat lacus, ut elementum nisi malesuada ac. Etiam congue elit a venenatis bibendum. Quisque dolor lorem, tempor sit amet fermentum vel, vestibulum sed ligula. Suspendisse laoreet faucibus sem, fringilla rhoncus odio fermentum at. Aenean imperdiet egestas risus nec posuere. Vivamus fermentum dictum urna a ornare.', 4, 3),
(57, 'Palm', 'Aenean sollicitudin consequat leo in pretium. Donec interdum quis lacus non auctor. Phasellus non commodo nulla, quis feugiat ligula. Vivamus facilisis consequat lacus, ut elementum nisi malesuada ac. Etiam congue elit a venenatis bibendum. Quisque dolor lorem, tempor sit amet fermentum vel, vestibulum sed ligula. Suspendisse laoreet faucibus sem, fringilla rhoncus odio fermentum at. Aenean imperdiet egestas risus nec posuere. Vivamus fermentum dictum urna a ornare.', 4, 3),
(58, 'Nature', 'Quis feugiat ligula. Vivamus facilisis consequat lacus, ut elementum nisi malesuada ac. Etiam congue elit a venenatis bibendum. Quisque dolor lorem, tempor sit amet fermentum vel, vestibulum sed ligula. Suspendisse laoreet faucibus sem, fringilla rhoncus odio fermentum at. Aenean imperdiet egestas risus nec posuere. Vivamus fermentum dictum urna a ornare.', 1, 3),
(59, 'Battle', 'Volutpat diam sapien, in sagittis risus porttitor quis. Aliquam eu risus vel nunc tristique euismod sit amet sed lectus. Aenean sollicitudin consequat leo in pretium. Donec interdum quis lacus non auctor. Phasellus non commodo nulla, quis feugiat ligula. Vivamus facilisis consequat lacus, ut elementum nisi malesuada ac. Etiam congue elit a venenatis bibendum. Quisque dolor lorem, tempor sit amet fermentum vel, vestibulum sed ligula. Suspendisse laoreet faucibus sem, fringilla rhoncus odio fermentum at. Aenean imperdiet egestas risus nec posuere. Vivamus fermentum dictum urna a ornare.', 32, 4),
(60, 'Tiger', 'Feugiat ligula. Vivamus facilisis consequat lacus, ut elementum nisi malesuada ac. Etiam congue elit a venenatis bibendum. Quisque dolor lorem, tempor sit amet fermentum vel, vestibulum sed ligula. Suspendisse laoreet faucibus sem, fringilla rhoncus odio fermentum at. Aenean imperdiet egestas risus nec posuere. Vivamus fermentum dictum urna a ornare.', 32, 3),
(61, 'Oblivion', 'Quisque dolor lorem, tempor sit amet fermentum vel, vestibulum sed ligula. Suspendisse laoreet faucibus sem, fringilla rhoncus odio fermentum at. Aenean imperdiet egestas risus nec posuere. Vivamus fermentum dictum urna a ornare. In vitae ultricies turpis. Aliquam volutpat diam sapien, in sagittis risus porttitor quis. Aliquam eu risus vel nunc tristique euismod sit amet sed lectus. Aenean sollicitudin consequat leo in pretium. Donec interdum quis lacus non auctor. Phasellus non commodo nulla, quis feugiat ligula. Vivamus facilisis consequat lacus, ut elementum nisi malesuada ac. Etiam congue elit a venenatis bibendum.', 1, 9),
(62, 'Hera', 'Ultricies turpis. Aliquam volutpat diam sapien, in sagittis risus porttitor quis. Aliquam eu risus vel nunc tristique euismod sit amet sed lectus. Aenean sollicitudin consequat leo in pretium. Donec interdum quis lacus non auctor. Phasellus non commodo nulla, quis feugiat ligula. Vivamus facilisis consequat lacus, ut elementum nisi malesuada ac. Etiam congue elit a venenatis bibendum.', 36, 3),
(63, 'Horse', 'Sed lectus. Aenean sollicitudin consequat leo in pretium. Donec interdum quis lacus non auctor. Phasellus non commodo nulla, quis feugiat ligula. Vivamus facilisis consequat lacus, ut elementum nisi malesuada ac. Etiam congue elit a venenatis bibendum.', 32, 37),
(64, 'Elephant Love', 'Sed lectus. Aenean sollicitudin consequat leo in pretium. Donec interdum quis lacus non auctor. Phasellus non commodo nulla, quis feugiat ligula. Vivamus facilisis consequat lacus, ut elementum nisi malesuada ac. Etiam congue elit a venenatis bibendum. Sed lectus. Aenean sollicitudin consequat leo in pretium. Donec interdum quis lacus non auctor. Phasellus non commodo nulla, quis feugiat ligula. Vivamus facilisis consequat lacus, ut elementum nisi malesuada ac. Etiam congue elit a venenatis bibendum.', 32, 8),
(65, 'Statement', 'Sed lectus. Aenean sollicitudin consequat leo in pretium. Donec interdum quis lacus non auctor. Phasellus non commodo nulla, quis feugiat ligula. Vivamus facilisis consequat lacus, ut elementum nisi malesuada ac. Etiam congue elit a venenatis bibendum.', 34, 2),
(66, 'Sky', 'Sollicitudin consequat leo in pretium. Donec interdum quis lacus non auctor. Phasellus non commodo nulla, quis feugiat ligula. Vivamus facilisis consequat lacus, ut elementum nisi malesuada ac. Etiam congue elit a venenatis bibendum. Phasellus interdum quis lacus non auctor. Phasellus non commodo nullac.', 34, 3),
(67, 'Waves', 'Consequat leo in pretium. Donec interdum quis lacus non auctor. Phasellus non commodo nulla, quis feugiat ligula. Vivamus facilisis consequat lacus, ut elementum nisi malesuada ac. Etiam congue elit a venenatis bibendum. Phasellus interdum quis lacus non auctor. Phasellus non commodo nullac.', 1, 7),
(68, 'Dance', 'Sollicitudin consequat leo in pretium. Donec interdum quis lacus non auctor. Phasellus non commodo nulla, quis feugiat ligula. Vivamus facilisis consequat lacus, ut elementum nisi malesuada ac. Etiam congue elit a venenatis bibendum. Phasellus interdum quis lacus non auctor. Phasellus non commodo nullac.', 1, 2),
(69, 'Stairs', 'Tudin consequat leo in pretium. Donec interdum quis lacus non auctor. Phasellus non commodo nulla, quis feugiat ligula. Vivamus facilisis consequat lacus, ut elementum nisi malesuada ac. Etiam congue elit a venenatis bibendum. Phasellus interdum quis lacus non auctor. Phasellus non commodo nullac.', 1, 25);

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
(32, 'Djur'),
(34, 'Abstrakt'),
(36, 'Porträtt'),
(37, 'Travel');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `active_order_of_products`
--
ALTER TABLE `active_order_of_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status` (`status`),
  ADD KEY `customer_data` (`customer_data_id`);

--
-- Indexes for table `completed_order_of_products`
--
ALTER TABLE `completed_order_of_products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status` (`status`),
  ADD KEY `customer_data` (`customer_data_id`);

--
-- Indexes for table `currency`
--
ALTER TABLE `currency`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customer_data`
--
ALTER TABLE `customer_data`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `delivered_product`
--
ALTER TABLE `delivered_product`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `currency` (`currency_id`);

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
-- AUTO_INCREMENT for table `active_order_of_products`
--
ALTER TABLE `active_order_of_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT for table `completed_order_of_products`
--
ALTER TABLE `completed_order_of_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `order_status`
--
ALTER TABLE `order_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- AUTO_INCREMENT for table `product_category`
--
ALTER TABLE `product_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `active_order_of_products`
--
ALTER TABLE `active_order_of_products`
  ADD CONSTRAINT `active_order_of_products_ibfk_1` FOREIGN KEY (`customer_data_id`) REFERENCES `customer_data` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `ordstatusfkey` FOREIGN KEY (`status`) REFERENCES `order_status` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `completed_order_of_products`
--
ALTER TABLE `completed_order_of_products`
  ADD CONSTRAINT `completed_order_of_products_ibfk_1` FOREIGN KEY (`customer_data_id`) REFERENCES `customer_data` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `completed_order_of_products_ibfk_2` FOREIGN KEY (`status`) REFERENCES `order_status` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `delivered_product`
--
ALTER TABLE `delivered_product`
  ADD CONSTRAINT `delivered_product_ibfk_1` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `delivered_product_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `completed_order_of_products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `currencykey` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orderkey` FOREIGN KEY (`order_id`) REFERENCES `active_order_of_products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
