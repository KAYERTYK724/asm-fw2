-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th4 04, 2026 lúc 04:15 PM
-- Phiên bản máy phục vụ: 8.0.44
-- Phiên bản PHP: 8.2.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `asm-fw2-reactjs`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `blogs`
--

CREATE TABLE `blogs` (
  `id` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Áo Sơ Mi Nam', '2026-04-04 15:31:05', '2026-04-04 15:31:05'),
(2, 'Quần Jean Nam', '2026-04-04 15:31:05', '2026-04-04 15:31:05'),
(3, 'Áo Thun & Polo', '2026-04-04 15:31:05', '2026-04-04 15:31:05'),
(4, 'Giày Tây & Sneakers', '2026-04-04 15:31:05', '2026-04-04 15:31:05'),
(5, 'Phụ Kiện (Thắt lưng, Ví)', '2026-04-04 15:31:05', '2026-04-04 15:31:05');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `comments`
--

CREATE TABLE `comments` (
  `id` int NOT NULL,
  `content` text COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `status` tinyint(1) DEFAULT '0' COMMENT '0: Chờ duyệt, 1: Hiển thị, 2: Đã ẩn',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `user_id` int NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL COMMENT 'Tên người nhận hàng',
  `phone` varchar(20) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `payments` varchar(50) COLLATE utf8mb4_unicode_520_ci DEFAULT 'cod' COMMENT 'cod, bank, momo, vnpay',
  `payment_status` tinyint(1) DEFAULT '0' COMMENT '0: Chưa thanh toán, 1: Đã thanh toán',
  `order_status` tinyint(1) DEFAULT '0' COMMENT '0: Chờ xác nhận, 1: Đang xử lý, 2: Đang giao, 3: Hoàn thành, 4: Đã hủy',
  `total_price` decimal(15,2) DEFAULT '0.00',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details` (
  `id` int NOT NULL,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `price` decimal(15,2) NOT NULL COMMENT 'Giá sản phẩm tại thời điểm mua',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `price` decimal(15,2) NOT NULL DEFAULT '0.00',
  `sale_price` decimal(15,2) DEFAULT '0.00',
  `image` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_520_ci,
  `category_id` int NOT NULL,
  `status` tinyint(1) DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `price`, `sale_price`, `image`, `description`, `category_id`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Áo Sơ Mi Trắng Oxford Slim-fit', 450000.00, 390000.00, 'so-mi-oxford.jpg', 'Chất liệu cotton Oxford bền bỉ, thấm hút mồ hôi tốt, phù hợp công sở.', 1, 1, '2026-04-04 15:32:41', '2026-04-04 15:32:41'),
(2, 'Áo Sơ Mi Flanel Kẻ Caro', 550000.00, NULL, 'so-mi-flanel.jpg', 'Phong cách streetstyle năng động, vải dày dặn giữ ấm tốt.', 1, 1, '2026-04-04 15:32:41', '2026-04-04 15:32:41'),
(3, 'Quần Jean Slim-fit Xanh Đậm', 620000.00, 550000.00, 'jean-slimfit-blue.jpg', 'Chất denim co giãn nhẹ, giữ form tốt sau nhiều lần giặt.', 2, 1, '2026-04-04 15:32:41', '2026-04-04 15:32:41'),
(4, 'Quần Jean Rách Gối Cá Tính', 750000.00, NULL, 'jean-distressed.jpg', 'Thiết kế rách gối nhẹ, phù hợp cho các buổi đi chơi, dã ngoại.', 2, 1, '2026-04-04 15:32:41', '2026-04-04 15:32:41'),
(5, 'Áo Thun Cotton Basic Đen', 250000.00, 199000.00, 'tshirt-basic-black.jpg', '100% Cotton co giãn 4 chiều, mềm mịn thoáng mát.', 3, 1, '2026-04-04 15:32:41', '2026-04-04 15:32:41'),
(6, 'Áo Polo Phối Cổ Lịch Sự', 380000.00, 320000.00, 'polo-shirt.jpg', 'Chất vải cá sấu cao cấp, form đứng, tôn dáng người mặc.', 3, 1, '2026-04-04 15:32:41', '2026-04-04 15:32:41'),
(7, 'Giày Sneaker Trắng Minimalist', 890000.00, 790000.00, 'sneaker-white.jpg', 'Kiểu dáng tối giản, dễ dàng phối với mọi loại trang phục.', 4, 1, '2026-04-04 15:32:41', '2026-04-04 15:32:41'),
(8, 'Giày Loafer Da Bò Thật', 120000.00, NULL, 'leather-loafer.jpg', 'Chế tác từ da bò thật nguyên tấm, sang trọng và êm chân.', 4, 1, '2026-04-04 15:32:41', '2026-04-04 15:32:41'),
(9, 'Thắt Lưng Da Khóa Kim Loại', 350000.00, NULL, 'belt-leather.jpg', 'Mặt khóa chống gỉ, dây da thật bền bỉ theo thời gian.', 5, 1, '2026-04-04 15:32:41', '2026-04-04 15:32:41'),
(10, 'Ví Da Cầm Tay Mini', 280000.00, 250000.00, 'wallet-mini.jpg', 'Thiết kế nhỏ gọn, nhiều ngăn tiện lợi cho thẻ và tiền mặt.', 5, 1, '2026-04-04 15:32:41', '2026-04-04 15:32:41');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `fullname` varchar(100) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `role` varchar(20) COLLATE utf8mb4_unicode_520_ci DEFAULT 'customer' COMMENT 'admin, editor, customer',
  `status` tinyint(1) DEFAULT '1' COMMENT '1: Active, 0: Banned',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_comments_product` (`product_id`),
  ADD KEY `fk_comments_user` (`user_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orders_user` (`user_id`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_details_order` (`order_id`),
  ADD KEY `fk_details_product` (`product_id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_products_categories` (`category_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Ràng buộc đối với các bảng kết xuất
--

--
-- Ràng buộc cho bảng `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `fk_comments_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_comments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_orders_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `fk_details_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_details_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fk_products_categories` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
