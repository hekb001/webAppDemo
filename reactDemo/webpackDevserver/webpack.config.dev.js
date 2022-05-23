// 端口
const port = 8082;
const base = require('./webpack.base.js');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = merge(base, {
    mode:'development',
    output: {
        filename: 'static/js/[name].js', //
        path: resolve('dist'), // 输出的文件地址
        publicPath: ''
    },
    // devtool: 'inline-source-map',
    module: {
        rules:[
            { enforce: 'pre', test: /\.js$/, use: ['source-map-loader'] },
        ]
    },
    devServer: {
        contentBase: './dist',
        compress: true,
        port: port,
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    plugins: [
        // new OpenBrowserPlugin({ url: 'http://localhost:'+port }),
        ],
});