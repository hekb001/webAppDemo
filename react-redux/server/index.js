console.log('进来了。。。。。')
const env = require('./env/'+process.env.NODE_TEST+'.js');
module.exports = env;