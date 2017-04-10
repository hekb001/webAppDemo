/**
 * Created by hekaibing on 2017/4/10.
 */
//node中的事件驱动
    //引入events事件驱动模块
var events=require('events');
//创建events.eventeEmitters事件对象
var eventEmitter=new events.EventEmitter();
//创建事件处理程序
var firstFunction=function(){
    console.log('这是第一步');
    eventEmitter.emit('second');
};
var secondFunction=function(){
    console.log('这是第二步');
    eventEmitter.emit('last');
};
eventEmitter.on('last',function(){
   console.log('这是最后一步');
});
eventEmitter.on('second',secondFunction);
eventEmitter.on('first',firstFunction);
eventEmitter.emit('first');
