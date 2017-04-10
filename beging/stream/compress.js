/**
 * Created by hekaibing on 2017/4/10.
 */
//压缩input.txt文件
var fs=require('fs');
var zlib=require('zlib');
//压缩input文件为input.txt.gz;
fs.createReadStream('input.txt')
.pipe(zlib.createGzip())
.pipe(fs.createWriteStream('input.txt.gz'));
console.log('执行完毕');