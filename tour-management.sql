-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3309
-- Generation Time: Dec 31, 2023 at 08:35 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tour-management`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `fullName`, `email`, `password`, `phone`, `token`, `avatar`, `role_id`, `deleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Nguyễn Thị Mai Anh', 'nguyenmaianh@gmail.com', 'b4713efd7f2b66aa1070eee909870e06', '09228288866', 'PcTRsB9wZZRecZcJU0sG', 'http://res.cloudinary.com/debcojldf/image/upload/v1704006571/rcqdacbrkgxcwsf4r4da.jpg', 1, 0, NULL, '2023-12-29 08:22:33', '2023-12-31 07:26:56'),
(2, 'Nguyễn Hỗ Trợ', 'nguyenhotro@gmail.com', 'b4713efd7f2b66aa1070eee909870e06', NULL, '6LfQFstJ1EkbSVtWvqOw', NULL, 2, 0, NULL, '2023-12-31 05:21:36', '2023-12-31 07:14:28');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `image` varchar(500) DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `title`, `image`, `description`, `status`, `position`, `slug`, `deleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Du lịch trong nước', 'https://backend.daca.vn/assets/tour/images/du-lich-trong-nuoc.jpg', 'Các tour du lịch trong Việt Nam', 'active', 1, 'du-lich-trong-nuoc', 0, NULL, '2023-12-29 08:23:33', '2023-12-29 08:23:33'),
(2, 'Du lịch nước ngoài', 'https://backend.daca.vn/assets/tour/images/du-lich-nuoc-ngoai.jpg', 'Các tour du lịch quốc tế', 'active', 2, 'du-lich-nuoc-ngoai', 0, NULL, '2023-12-29 08:23:33', '2023-12-29 08:23:33'),
(3, 'Tour mùa hè', 'https://backend.daca.vn/assets/tour/images/tour-mua-he.jpeg', 'Các tour phù hợp cho mùa hè', 'active', 3, 'tour-mua-he', 0, NULL, '2023-12-29 08:23:33', '2023-12-29 08:23:33'),
(4, 'Tour mùa đông', 'https://backend.daca.vn/assets/tour/images/tour-mua-dong.jpg', 'Các tour phù hợp cho mùa đông', 'active', 4, 'tour-mua-dong', 0, NULL, '2023-12-29 08:23:33', '2023-12-29 08:23:33'),
(5, 'Tour thám hiểm', 'https://backend.daca.vn/assets/tour/images/tour-tham-hiem.jpg', 'Các tour khám phá và thám hiểm', 'active', 5, 'tour-tham-hiem', 0, NULL, '2023-12-29 08:23:33', '2023-12-29 08:23:33'),
(6, 'Tour nghỉ dưỡng', 'https://backend.daca.vn/assets/tour/images/tour-nghi-duong.jpg', 'Các tour nghỉ dưỡng tại các khu resort', 'active', 6, 'tour-nghi-duong', 0, NULL, '2023-12-29 08:23:33', '2023-12-29 08:23:33'),
(7, 'Tour ẩm thực', 'https://backend.daca.vn/assets/tour/images/tour-am-thuc.jpg', 'Các tour trải nghiệm ẩm thực độc đáo', 'active', 7, 'tour-am-thuc', 0, NULL, '2023-12-29 08:23:33', '2023-12-29 08:23:33'),
(8, 'Tour giáo dục', 'https://backend.daca.vn/assets/tour/images/tour-giao-duc.jpg', 'Các tour học thuật và giáo dục', 'active', 8, 'tour-giao-duc', 0, NULL, '2023-12-29 08:23:33', '2023-12-29 08:23:33'),
(9, 'Tour thể thao', 'https://backend.daca.vn/assets/tour/images/tour-the-thao.jpg', 'Các tour liên quan đến hoạt động thể thao', 'active', 9, 'tour-the-thao', 0, NULL, '2023-12-29 08:23:33', '2023-12-29 08:23:33'),
(10, 'Tour gia đình', 'https://backend.daca.vn/assets/tour/images/tour-gia-dinh.jpg', 'Các tour phù hợp cho cả gia đình', 'active', 10, 'tour-gia-dinh', 0, NULL, '2023-12-29 08:23:33', '2023-12-29 08:23:33');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `code` varchar(10) NOT NULL,
  `fullName` varchar(50) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `note` varchar(500) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders_item`
--

CREATE TABLE `orders_item` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `tourId` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `discount` int(11) DEFAULT NULL,
  `timeStart` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `permissions` varchar(500) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `title`, `description`, `permissions`, `deleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Quyền Admin', 'Admin có tất cả các quyền sử dụng trang web', '[\"category_view\",\"category_create\",\"category_edit\",\"category_delete\",\"tours_view\",\"tours_create\",\"tours_edit\",\"tours_delete\",\"roles_view\",\"roles_create\",\"roles_edit\",\"roles_delete\",\"roles_permissions\",\"account_view\",\"account_create\",\"account_edit\",\"account_delete\"]', 0, NULL, '2023-12-29 09:56:52', '2023-12-31 05:29:40'),
(2, 'Quyền hỗ trợ Admin', 'Có nhiều quyền để hỗ trợ Admin', '[\"category_view\",\"category_create\",\"category_delete\",\"tours_view\",\"tours_create\",\"tours_edit\",\"roles_view\",\"account_view\"]', 0, NULL, '2023-12-29 10:13:54', '2023-12-31 05:29:40');

-- --------------------------------------------------------

--
-- Table structure for table `tours`
--

CREATE TABLE `tours` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `code` varchar(10) DEFAULT NULL,
  `images` longtext DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `information` longtext DEFAULT NULL,
  `schedule` longtext DEFAULT NULL,
  `timeStart` timestamp NULL DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `position` int(11) DEFAULT NULL,
  `slug` varchar(255) NOT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `deletedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NULL DEFAULT NULL,
  `updatedAt` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tours`
--

INSERT INTO `tours` (`id`, `title`, `code`, `images`, `price`, `discount`, `information`, `schedule`, `timeStart`, `stock`, `status`, `position`, `slug`, `deleted`, `deletedAt`, `createdAt`, `updatedAt`) VALUES
(1, 'Tour Hạ Long', 'TOUR000001', '[\"https://backend.daca.vn/assets/tour/images/tour-ha-long.jpg\", \"https://backend.daca.vn/assets/tour/images/tour-ha-long-2.jpg\", \"https://backend.daca.vn/assets/tour/images/tour-ha-long-3.jpg\"]', 1500000, 10, 'Duyệt thác, thăm đảo', 'Ngày 1: Duyệt thác\nNgày 2: Thăm đảo', '2023-01-15 01:00:00', 50, 'active', 1, 'tour-ha-long', 0, NULL, '2023-12-29 08:23:15', '2023-12-29 08:23:15'),
(2, 'Tour Đà Nẵng', 'TOUR000002', '[\"https://backend.daca.vn/assets/tour/images/tour-da-nang.jpg\"]', 2000000, 15, 'Thăm cầu Rồng, bãi biển Mỹ Khê', 'Ngày 1: Cầu Rồng\nNgày 2: Bãi biển Mỹ Khê', '2023-02-10 02:30:00', 40, 'active', 2, 'chuyen-di-da-nang', 0, NULL, '2023-12-29 08:23:15', '2023-12-29 08:23:15'),
(3, 'Tour Nha Trang', 'TOUR000003', '[\"https://backend.daca.vn/assets/tour/images/tour-nha-trang.jpg\"]', 1800000, 12, 'Tham quan Vinpearl, tắm biển', 'Ngày 1: Vinpearl\nNgày 2: Tắm biển', '2023-03-05 03:45:00', 60, 'active', 3, 'du-lich-nha-trang', 0, NULL, '2023-12-29 08:23:15', '2023-12-29 08:23:15'),
(4, 'Tour Sài Gòn', 'TOUR000004', '[\"https://backend.daca.vn/assets/tour/images/tour-sai-gon.jpg\"]', 2200000, 18, 'Khám phá quận 1, thưởng thức ẩm thực', 'Ngày 1: Quận 1\nNgày 2: Thưởng thức ẩm thực', '2023-04-20 04:15:00', 30, 'active', 4, 'hanh-trinh-sai-gon', 0, NULL, '2023-12-29 08:23:15', '2023-12-29 08:23:15'),
(5, 'Tour Phú Quốc', 'TOUR000005', '[\"https://backend.daca.vn/assets/tour/images/tour-phu-quoc.jpeg\"]', 2800000, 20, 'Dạo chợ đêm, tham quan hòn Móng Tay', 'Ngày 1: Chợ đêm\nNgày 2: Hòn Móng Tay', '2023-05-12 05:30:00', 45, 'active', 5, 'hanh-trinh-phu-quoc', 0, NULL, '2023-12-29 08:23:15', '2023-12-29 08:23:15'),
(6, 'Tour Đảo Ngọc Cô Tô', 'TOUR000006', '[\"https://backend.daca.vn/assets/tour/images/tour-dao-ngoc-co-to.jpg\"]', 2500000, 15, 'Thăm làng chài, tắm biển', 'Ngày 1: Làng chài\nNgày 2: Tắm biển', '2023-06-08 06:45:00', 55, 'active', 6, 'dao-ngoc-co-to', 0, NULL, '2023-12-29 08:23:15', '2023-12-29 08:23:15'),
(7, 'Tour Khám Phá Huế', 'TOUR000007', '[\"https://backend.daca.vn/assets/tour/images/tour-hue.jpg\"]', 1900000, 12, 'Tham quan đại cung điện, ngắm cầu Trường Tiền', 'Ngày 1: Đại cung điện\nNgày 2: Cầu Trường Tiền', '2023-07-25 07:00:00', 50, 'active', 7, 'kham-pha-hue', 0, NULL, '2023-12-29 08:23:15', '2023-12-29 08:23:15'),
(8, 'Tour Sapa', 'TOUR000008', '[\"https://backend.daca.vn/assets/tour/images/tour-sapa.jpg\"]', 3000000, 25, 'Leo Fansipan, thăm thị trấn Sa Pa', 'Ngày 1: Leo Fansipan\nNgày 2: Thăm Sa Pa', '2023-08-18 08:30:00', 35, 'active', 8, 'doan-tham-hiem-sapa', 0, NULL, '2023-12-29 08:23:15', '2023-12-29 08:23:15'),
(9, 'Tour Vịnh Lan Hạ', 'TOUR000009', '[\"https://backend.daca.vn/assets/tour/images/tau-tour-vinh-lan-ha.jpg\"]', 2600000, 18, 'Thăm đảo Quan Lạn, tắm biển Vân Đồn', 'Ngày 1: Đảo Quan Lạn\nNgày 2: Tắm biển Vân Đồn', '2023-09-10 09:15:00', 48, 'active', 9, 'vinh-lan-ha', 0, NULL, '2023-12-29 08:23:15', '2023-12-29 08:23:15'),
(10, 'Tour Miền Tây', 'TOUR000010', '[\"https://backend.daca.vn/assets/tour/images/tour-mien-tay.jpg\"]', 1700000, 10, 'Thăm cánh đồng lúa, đi cồn', 'Ngày 1: Cánh đồng lúa\nNgày 2: Đi cồn', '2023-10-05 10:00:00', 42, 'active', 10, 'mien-tay-mat-nuoc', 0, NULL, '2023-12-29 08:23:15', '2023-12-29 08:23:15');

-- --------------------------------------------------------

--
-- Table structure for table `tours_categories`
--

CREATE TABLE `tours_categories` (
  `tour_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tours_categories`
--

INSERT INTO `tours_categories` (`tour_id`, `category_id`) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 3),
(8, 3),
(9, 3),
(10, 4);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders_item`
--
ALTER TABLE `orders_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`),
  ADD KEY `tourId` (`tourId`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tours`
--
ALTER TABLE `tours`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tours_categories`
--
ALTER TABLE `tours_categories`
  ADD PRIMARY KEY (`tour_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders_item`
--
ALTER TABLE `orders_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tours`
--
ALTER TABLE `tours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders_item`
--
ALTER TABLE `orders_item`
  ADD CONSTRAINT `orders_item_ibfk_1` FOREIGN KEY (`orderId`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `orders_item_ibfk_2` FOREIGN KEY (`tourId`) REFERENCES `tours` (`id`);

--
-- Constraints for table `tours_categories`
--
ALTER TABLE `tours_categories`
  ADD CONSTRAINT `tours_categories_ibfk_1` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`),
  ADD CONSTRAINT `tours_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
