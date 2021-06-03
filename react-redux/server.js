var path = require("path");
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var webpackCfg = require("./webpack.dev.js");
var routes = require('./server/routes');
var compiler = webpack(webpackCfg);
var processEnv = process.env.NODE_ENV;
var express = require('express');
var app =express();
if(processEnv == 'dev'){
     app=new webpackDevServer(compiler, {
        //注意此处publicPath必填
        publicPath: webpackCfg.output.publicPath
    });
}else{
    app.use(express.static(path.join(__dirname,'dist')))
}
//init server

app.use('/api', routes);
app.listen(8081, "localhost", function (err) {
    if (err) {
        console.log(err);
    }
});

console.log("listen at http://localhost:8081");