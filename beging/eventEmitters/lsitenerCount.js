/**
 * Created by hekaibing on 2017/4/10.
 */
var events=require('events');//引入events事件模块
var eventEmitter=new events.EventEmitter();//创建eventsEmitter对象；
//监听器1的函数
var listener1=function(){
    console.log('监听器listener1执行');
};
//监听器2的函数
var listener2=function(){
    console.log('监听器listener2执行')
};
//绑定事件名为listener1的函数；监听函数listener1
eventEmitter.on('connection',listener1);
//绑定事件名为listener2的函数，监听函数listener2
eventEmitter.addListener('connection',listener2);
//事件名为connection的数量
var eventListens=events.EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListens);
eventEmitter.emit('connection');//处理connection事件
//移出监听函数listener1；
eventEmitter.removeListener('connection',listener1);
console.log('事件listener1不再监听');
eventEmitter.emit('connection');//处理connection事件
//输出移出事件listener1过后的，监听函数为connection的数量
eventListens=events.EventEmitter.listenerCount(eventEmitter,'connection');
console.log(eventListens);



