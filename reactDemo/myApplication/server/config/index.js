'use strict';
//服务端调用 api地址 以及相关配置
var path = require('path');
var _ = require('lodash');

var all = {
	env: process.env.NODE_ENV,
	root: path.normalize(__dirname + '/../../..'),
	port: process.env.PORT || 3001,
	//redis 配置
	redis: {
		host: '192.168.1.80',
		port: 6379
	},
	//数据缓存时间保持和milasession过期时间一致
	MAXAGE: 1 * 60 * 60 * 1000,
	//用户角色种类
	userRoles: ['user', 'admin'],
	//七牛配置
	qiniu: {
		app_key: process.env.QINIU_APP_KEY || '',
		app_secret: process.env.QINIU_APP_SECRET || '',
		domain: process.env.QINIU_APP_DOMAIN || '',
		bucket: process.env.QINIU_APP_BUCKET || ''
	},
	//api数据缓存时间
	APICACHEEXPIRE: 8 * 60 * 60,
	//默认首页图片.
	defaultIndexImage: '',
	//开启第三方登录
	snsLogins: ['github', 'qq'],

	session: {
		name: 'mila_user',
		secret: 'hqhrmsecretcqp1234578908', // 建议使用 128 个字符的随机字符串
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 60 * 60 * 1000 }
	}
};

var config = _.merge(all, require('./' + (process.env.NODE_ENV) + '.js'), {});
module.exports = config;
