-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2015-10-22 08:24:01
-- 服务器版本： 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `andi`
--

-- --------------------------------------------------------

--
-- 表的结构 `data`
--

CREATE TABLE IF NOT EXISTS `data` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `action` varchar(45) DEFAULT NULL,
  `invite_openid` varchar(255) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text NOT NULL,
  `browser` varchar(255) DEFAULT NULL,
  `browser_version` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `platform` varchar(255) DEFAULT NULL,
  `date_add` timestamp NOT NULL,
  `session_id` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `history`
--

CREATE TABLE IF NOT EXISTS `history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `openid` varchar(200) NOT NULL COMMENT 'Wechat openid',
  `name` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `pid` int(10) unsigned NOT NULL,
  `describe` varchar(50) DEFAULT NULL,
  `created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `sessionid` varchar(100) NOT NULL,
  `ip_address` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `prize`
--

CREATE TABLE IF NOT EXISTS `prize` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '0:优惠券;1:2条10g鸡汁;2:238g鸡汁;3:408g鸡汁',
  `name` varchar(200) NOT NULL,
  `num` int(10) unsigned NOT NULL COMMENT '999 means infinite',
  `total` int(11) NOT NULL,
  `daily_limit` int(11) NOT NULL,
  `describe` varchar(30) NOT NULL,
  `remain` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- 转存表中的数据 `prize`
--

INSERT INTO `prize` (`id`, `name`, `num`, `total`, `daily_limit`, `describe`, `remain`) VALUES
(1, '1', 999, 1, 1, '超级VIP', 1),
(2, '2', 999, 2, 1, '后台专利', 2),
(3, '3', 999, 20, 10, '蓝鸟大礼', 20),
(4, '4', 999, 70, 30, '观众专席', 70),
(5, '5', 999, 200, 80, '参与有礼', 200);

-- --------------------------------------------------------

--
-- 表的结构 `prize_memory`
--

CREATE TABLE IF NOT EXISTS `prize_memory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  `remain` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MEMORY DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- 表的结构 `prize_pool`
--

CREATE TABLE IF NOT EXISTS `prize_pool` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) NOT NULL,
  `release_time` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MEMORY DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
