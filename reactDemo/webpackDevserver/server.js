const webpack = require('webpack');
const express = require("express");
const path = require("path");
const webpackCfg = require('./webpack.config.dev');
const webpackDevServer = require('webpack-dev-server');
const compiler = webpack(webpackCfg);
const port = '8082'
const isProduction = process.env.NODE_ENV == "production";
let app = '';
if (!isProduction) {
    app = new webpackDevServer(compiler, {
        publicPath: webpackCfg.output.publicPath
    })
} else {
    app = express();
    app.use(express.static(path.join(__dirname, "dist")));
}
app.listen(port, 'localhost', function (err) {
    if (err) {
        console.log(err, 'err')
    }
})
console.log('server listen at http://localhost:8082')