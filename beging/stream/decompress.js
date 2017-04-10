/**
 * Created by hekaibing on 2017/4/10.
 */
//准备解压input.txt.gz文件
var fs=require('fs');
var zlib=require('zlib');
fs.createReadStream('input.txt.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('deinput.txt'));
console.log('执行完毕');
