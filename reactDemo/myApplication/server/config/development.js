'use strict';
var _ = require('lodash');
// 测试环境配置
// ==================================
const CLIENT_ID = '3';
const REDIRECT_URI = 'http://process-engine.x2.mila66.com';
const config = {
  //redis 配置
  redis: {
    // host: process.env.ONLINE !== '1' ? '117.48.196.139' : '192.168.1.22',
    host: '192.168.2.56',
    port: '6379',
    auth_pass: 'Happybird360#saas'
  },
  CLIENT_ID,
  CLIENT_SECRET:'3aQVWOurAMpdtWGoKDmmjscqz1hqDtnIaDsMGg3F',
  KEY: 'P5B4DQdsKGVjczjdnTTiJBzj90ZJBh2F',
  //api配置
  domain:'engine-api.x2.mila66.com',
  baseUrl:'http://engine-api.x2.mila66.com/api/1.0',
  REDIRECT_URI,
  OAUTH_URL:'http://oauth.x2.mila66.com/oauth/oauth/authorize?grant_type=authorization_code&client_id=' +
    CLIENT_ID +
    '&response_type=code&state=member&redirect_uri=' +
    REDIRECT_URI,
};
console.log('hello development!', config);

const configTest = _.assign({}, config);

module.exports = configTest;
