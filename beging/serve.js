/**
 * Created by hekaibing on 2017/3/30.
 */
const http=require('http');
const hostname='127.0.0.1';
const port=3000;
const server=http.createServer(function(req,res){
    res.statuscode=200;
    res.setHeader('content-Type','text/plain');
    res.end('hello world')
});
server.listen(port,hostname,function(){
    console.log('running at http://${hostname}:${port}/');
})
