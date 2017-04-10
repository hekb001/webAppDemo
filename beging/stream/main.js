/**
 * Created by hekaibing on 2017/4/10.
 */
var fs=require('fs');
var data='这里面的东西能写到output里面去吗，请拭目以待';
var writeStream=fs.createWriteStream('output.txt');
writeStream.write(data,'UTF8');//使用utf8写入数据
writeStream.end();//标记结尾
//处理事件流--》data-end error
writeStream.on('finish',function(){
    console.log('写入完成');
});
writeStream.on('error',function(err){
   console.log(err.stack);
});
