-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th4 05, 2026 lúc 09:31 AM
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
  `image` varchar(255) COLLATE utf8mb4_unicode_520_ci DEFAULT NULL,
  `content` longtext COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Đang đổ dữ liệu cho bảng `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `image`, `content`, `createdAt`, `updatedAt`) VALUES
(1, 'Bí quyết chọn bộ Suit hoàn hảo cho quý ông công sở', 'https://i.pinimg.com/1200x/00/e3/8c/00e38ce5983b4bd58b872f51220bcd8c.jpg', 'Một bộ suit đẹp không chỉ nằm ở thương hiệu mà quan trọng nhất là sự vừa vặn (fit). \n- Vai áo: Phải nằm vừa vặn với xương vai tự nhiên.\n- Độ dài tay áo: Nên để hở khoảng 1-2cm ống tay sơ mi bên trong.\n- Quần: Độ dài vừa chạm mu bàn chân để tránh bị gãy ống.', '2026-04-05 07:32:52', '2026-04-05 07:33:48'),
(2, '5 Đôi Sneakers trắng không bao giờ lỗi mốt', 'https://i.pinimg.com/736x/97/a7/10/97a7109c6168fa995a7dbd38e5814c71.jpg', 'Sneakers trắng là \"vũ khí\" tối thượng trong tủ đồ nam giới vì khả năng phối hợp cực linh hoạt. \nTừ phong cách tối giản với Common Projects đến sự năng động của Adidas Stan Smith hay Nike Air Force 1. Bài viết này sẽ phân tích ưu nhược điểm của từng dòng giày dựa trên chất liệu da và độ bền đế.', '2026-04-05 07:32:52', '2026-04-05 07:34:19'),
(3, 'Cách phối đồ Layering cho mùa thu đông miền Bắc', 'https://i.pinimg.com/1200x/7b/2a/2c/7b2a2c0e9e9061e189714c7e4e88e94e.jpg', 'Phối đồ nhiều lớp (Layering) không chỉ giúp giữ ấm mà còn tạo chiều sâu cho trang phục. \nQuy tắc cơ bản: Mỏng bên trong, dày bên ngoài. Bắt đầu với một chiếc áo thun cotton, thêm một lớp sơ mi flannel và kết thúc bằng một chiếc áo khoác Denim hoặc măng tô dáng dài.', '2026-04-05 07:32:52', '2026-04-05 07:35:08');

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

--
-- Đang đổ dữ liệu cho bảng `comments`
--

INSERT INTO `comments` (`id`, `content`, `product_id`, `user_id`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'Áo sơ mi vải rất mát, ít nhăn sau khi giặt. Form slim-fit mặc cực tôn dáng, rất đáng tiền!', 1, 3, 1, '2026-04-05 08:59:13', '2026-04-05 08:59:13'),
(2, 'Quần Jean đẹp nhưng size hơi chật một chút so với mô tả, mọi người nên cân nhắc tăng 1 size khi mua.', 3, 3, 1, '2026-04-05 08:59:13', '2026-04-05 08:59:13'),
(3, 'Giày đi êm chân, da thật sờ rất sướng tay. Giao hàng nhanh và đóng gói cẩn thận.', 8, 2, 1, '2026-04-05 08:59:13', '2026-04-05 08:59:13'),
(4, 'Sản phẩm có vết ố nhỏ ở cổ áo, shop hỗ trợ đổi trả giúp mình nhé.', 5, 3, 0, '2026-04-05 08:59:13', '2026-04-05 08:59:13');

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

--
-- Đang đổ dữ liệu cho bảng `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `name`, `phone`, `email`, `address`, `payments`, `payment_status`, `order_status`, `total_price`, `createdAt`, `updatedAt`) VALUES
(1, 3, 'Lê Anh Tuấn', '0987778889', 'tuan.nguyen@gmail.com', 'Số 15, Ngõ 20, Đường Xuân Thủy, Cầu Giấy, Hà Nội', 'cod', 0, 0, 1250000.00, '2026-04-05 08:50:12', '2026-04-05 08:50:12'),
(2, 3, 'Lê Anh Tuấn', '0987778889', 'tuan.nguyen@gmail.com', 'Số 15, Ngõ 20, Đường Xuân Thủy, Cầu Giấy, Hà Nội', 'vnpay', 1, 2, 890000.00, '2026-04-05 08:50:12', '2026-04-05 08:50:12'),
(3, 2, 'Nguyễn Minh Hoàng', '0914445556', 'hoang.editor@mensfashion.com', 'Tòa nhà Landmark 81, Quận Bình Thạnh, TP.HCM', 'momo', 1, 3, 2150000.00, '2026-04-05 08:50:12', '2026-04-05 08:50:12');

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

--
-- Đang đổ dữ liệu cho bảng `order_details`
--

INSERT INTO `order_details` (`id`, `order_id`, `product_id`, `quantity`, `price`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 1, 390000.00, '2026-04-05 08:56:49', '2026-04-05 08:56:49'),
(2, 1, 3, 1, 550000.00, '2026-04-05 08:56:49', '2026-04-05 08:56:49'),
(3, 1, 5, 1, 310000.00, '2026-04-05 08:56:49', '2026-04-05 08:56:49'),
(4, 2, 7, 1, 790000.00, '2026-04-05 08:56:49', '2026-04-05 08:56:49'),
(5, 2, 9, 1, 100000.00, '2026-04-05 08:56:49', '2026-04-05 08:56:49'),
(6, 3, 8, 1, 1200000.00, '2026-04-05 08:56:49', '2026-04-05 08:56:49'),
(7, 3, 4, 1, 750000.00, '2026-04-05 08:56:49', '2026-04-05 08:56:49'),
(8, 3, 6, 1, 200000.00, '2026-04-05 08:56:49', '2026-04-05 08:56:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_520_ci NOT NULL,
  `price` decimal(15,0) NOT NULL DEFAULT '0',
  `sale_price` decimal(15,0) DEFAULT '0',
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
(1, 'Áo Sơ Mi Trắng Oxford Slim-fit', 450000, 390000, 'https://i.pinimg.com/1200x/5c/a8/36/5ca8364d8f41417cc24bd597c4375c54.jpg', 'Chất liệu cotton Oxford bền bỉ, thấm hút mồ hôi tốt, phù hợp công sở.', 1, 1, '2026-04-04 15:32:41', '2026-04-04 16:42:48'),
(2, 'Áo Sơ Mi Flanel Kẻ Caro', 550000, NULL, 'https://i.pinimg.com/736x/6b/66/4f/6b664f190d71f818e58b6b179fd02703.jpg', 'Phong cách streetstyle năng động, vải dày dặn giữ ấm tốt.', 1, 1, '2026-04-04 15:32:41', '2026-04-04 16:44:16'),
(3, 'Quần Jean Slim-fit Xanh Đậm', 620000, 550000, 'https://i.pinimg.com/1200x/89/1c/4c/891c4ce5fcce9689cf3c27b2d5578393.jpg', 'Chất denim co giãn nhẹ, giữ form tốt sau nhiều lần giặt.', 2, 1, '2026-04-04 15:32:41', '2026-04-04 16:46:57'),
(4, 'Quần Jean Rách Gối Cá Tính', 750000, NULL, 'https://i.pinimg.com/736x/c0/6f/6f/c06f6f51980f808ef30ed22bd645f12f.jpg', 'Thiết kế rách gối nhẹ, phù hợp cho các buổi đi chơi, dã ngoại.', 2, 1, '2026-04-04 15:32:41', '2026-04-04 16:48:44'),
(5, 'Áo Thun Cotton Basic Đen', 250000, 199000, 'https://i.pinimg.com/1200x/45/88/41/458841be664d0963420f26ea94a70510.jpg', '100% Cotton co giãn 4 chiều, mềm mịn thoáng mát.', 3, 1, '2026-04-04 15:32:41', '2026-04-04 16:49:23'),
(6, 'Áo Polo Phối Cổ Lịch Sự', 380000, 320000, 'https://i.pinimg.com/736x/82/73/05/82730580641997ce039ffd60eeae1b02.jpg', 'Chất vải cá sấu cao cấp, form đứng, tôn dáng người mặc.', 3, 1, '2026-04-04 15:32:41', '2026-04-04 16:50:19'),
(7, 'Giày Sneaker Trắng Minimalist', 890000, 790000, 'https://i.pinimg.com/1200x/77/6f/5d/776f5db81803121042f5f0f0e1c9fa95.jpg', 'Kiểu dáng tối giản, dễ dàng phối với mọi loại trang phục.', 4, 1, '2026-04-04 15:32:41', '2026-04-04 16:50:41'),
(8, 'Giày Loafer Da Bò Thật', 120000, NULL, 'https://i.pinimg.com/1200x/8a/11/5f/8a115f38e4d401002b45c844cbf184a7.jpg', 'Chế tác từ da bò thật nguyên tấm, sang trọng và êm chân.', 4, 1, '2026-04-04 15:32:41', '2026-04-04 16:50:56'),
(9, 'Thắt Lưng Da Khóa Kim Loại', 350000, NULL, 'https://i.pinimg.com/736x/ee/3c/c0/ee3cc032330dbeb9a42606910774c6e9.jpg', 'Mặt khóa chống gỉ, dây da thật bền bỉ theo thời gian.', 5, 1, '2026-04-04 15:32:41', '2026-04-04 16:51:23'),
(10, 'Ví Da Cầm Tay Mini', 280000, 250000, 'https://i.pinimg.com/736x/9b/43/67/9b43677cf78287f2185b2a48bd5a5e30.jpg', 'Thiết kế nhỏ gọn, nhiều ngăn tiện lợi cho thẻ và tiền mặt.', 5, 1, '2026-04-04 15:32:41', '2026-04-04 16:51:42');

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
  `role` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci DEFAULT 'customer' COMMENT 'admin,customer',
  `status` tinyint(1) DEFAULT '1' COMMENT '1: Active, 0: Banned',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_520_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `fullname`, `phone`, `role`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'admin_fashion', '$2b$10$eImiTXuWV5j7pRF.y6.8SuE2vV6F5/B5I.D/mI3yI.L/L.L.L.L', 'admin@mensfashion.com', 'Quản Trị Viên Thời Trang', '0901112223', 'admin', 1, '2026-04-05 08:47:47', '2026-04-05 08:47:47'),
(2, 'editor_hoang', '$2b$10$eImiTXuWV5j7pRF.y6.8SuE2vV6F5/B5I.D/mI3yI.L/L.L.L.L', 'hoang.editor@mensfashion.com', 'Nguyễn Minh Hoàng', '0914445556', 'customer', 1, '2026-04-05 08:47:47', '2026-04-05 08:47:47'),
(3, 'khach_hang_tuan', '$2b$10$eImiTXuWV5j7pRF.y6.8SuE2vV6F5/B5I.D/mI3yI.L/L.L.L.L', 'tuan.nguyen@gmail.com', 'Lê Anh Tuấn', '0987778889', 'customer', 1, '2026-04-05 08:47:47', '2026-04-05 08:47:47');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
