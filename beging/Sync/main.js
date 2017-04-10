/**
 * Created by hekaibing on 2017/4/10.
 */
var fs=require('fs');
fs.readFile('input.txt',function(err,data){
   if(err){
       return;
   }
    console.log(data.toString());
});
console.log('程序执行结束');