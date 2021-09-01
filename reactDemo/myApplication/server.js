const express = require('express');
const app = express();
const path = require('path');
const config = require('./webpack.config.dev.js');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
console.log(process.env.NODE_ENV,'process.env.NODE_ENV')
const isProduction = process.env.NODE_ENV == 'production';
if(!isProduction){
    const compiler = webpack(config)
    app.use(
      webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        noInfo: true
      })
    )
    app.use(webpackHotMiddleware(compiler))
    app.set('views', path.join(__dirname, 'public'))
    app.set('view engine', 'ejs')
}else{
    app.use(express.static(path.join(__dirname, 'dist'))); //读取public下默认的index.html
    app.set('views', path.resolve(__dirname, 'dist'))
    app.set('view engine', 'ejs')
}
app.get('/',(req,res)=>{
  res.render('index')
})
app.listen('8081', function() {
    console.log('服务器启动')
})