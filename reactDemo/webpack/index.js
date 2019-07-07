var express = require('express');
var app = require('express')();
var path = require('path');
var bodyParser = require('body-parser');
var open = require('open');
var fs = require('fs');
var io = require('socket.io');
// var vconsle = require('vconsole');

app.use(bodyParser.json());
app.use(express.static("public")); //读取public下默认的index.html
app.get('/', (req, res) => {
    var Path = path.resolve(__dirname + '/public/index.html')
    res.sendfile(listPath);
})
app.get('/list', (req, res) => {
    var listPath = path.resolve(__dirname + '/public/list.html')
    res.sendfile(listPath);
    fs.readFile(listPath, 'utf-8', function(err, res) {
        console.log(JSON.res) //获取文件的下的内容，爬虫；
    })
})
var server = app.listen('8080', function() {
    console.log('服务器启动')
})
open('http://localhost:8080/', "chrome");
var socket = io.listen(server);
socket.on('connection', function(client) {
    console.log('建立与服务端的连接')
    client.on('message', function(event) {
        console.log('来自客户端的请求' + event.name);
    })
    client.emit('sendDataToClient', { name: 'hekabing' })
    client.on('disconnect', function() {
        console.log('服务端已经关闭连接')
    })
})