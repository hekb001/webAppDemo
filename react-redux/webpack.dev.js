const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const base = require('./webpack.base.js');

function resolve (dir) {
    return path.join(__dirname, dir)
}
// 端口
const port = 8080;

module.exports = merge(base, {
    output: {
        filename: 'static/js/[name].js', //
        path: resolve('dist'), // 输出的文件地址
        publicPath: ''
    },
    // devtool: 'inline-source-map',
    module: {
    },
    devServer: {
        contentBase: './dist',
        compress: true,
        port: port,
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    plugins: [
    new webpack.NamedModulesPlugin(),
	new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:'+port }),
    ],
});