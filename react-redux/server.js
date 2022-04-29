var path = require("path");
var webpack = require("webpack");
// var webpackDevServer = require("webpack-dev-server");
var webpackCfg = require("./webpack.dev.js");
var routes = require('./server/routes');
var compiler = webpack(webpackCfg);
var processEnv = process.env.NODE_ENV;
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
var express = require('express');
var app =express();
if(processEnv == 'dev'){
    app.use(
        webpackDevMiddleware(compiler, {
          publicPath: webpackCfg.output.publicPath,
          noInfo: true,
        })
      );
      app.use(webpackHotMiddleware(compiler));
      app.set("views", path.join(__dirname, "public"));
      app.set("view engine", "ejs");
}else{
    app.use(express.static(path.join(__dirname, "dist")));
    app.set("views", path.resolve(__dirname, "dist"));
    app.set("view engine", "ejs");
}

app.get('*',(req,res)=>{
    console.log('hello')
    res.render('index',{title:"hehe",test:"23"})
})
app.use('/api', routes);
app.listen(8081, "localhost", function (err) {
    if (err) {
        console.log(err);
    }
});

console.log("listen at http://localhost:8081");