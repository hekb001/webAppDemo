/**
 * Created by hekaibing on 2017/4/11.
 */
var router=require('./router');
var server=require('./serve');
server.start(router.route);
