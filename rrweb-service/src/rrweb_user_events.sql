SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for rrweb_user_events
-- ----------------------------
DROP TABLE IF EXISTS `rrweb_user_events`;
CREATE TABLE `rrweb_user_events` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_name` text,
  `timestamp` text,
  `events` longtext COLLATE utf8mb4_unicode_ci COMMENT '用户操作数据',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
