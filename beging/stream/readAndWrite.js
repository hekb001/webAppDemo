/**
 * Created by hekaibing on 2017/4/10.
 */
//引入模块
var fs=require('fs');
//创建一个可读流；
var readStream=fs.createReadStream('readAndWrite.txt');
//创建一个可写流
var writeStream=fs.createWriteStream('input.txt');
//读取管道。读取readAndWrite里面的内容，将放入到input里面去；
readStream.pipe(writeStream);
console.log('执行完毕');