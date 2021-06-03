const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const base = require('./webpack.base.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
function resolve (dir) {
    return path.join(__dirname, dir)
}
// 端口
const port = 8081;

module.exports = merge(base, {
    mode:'development',
    output: {
        filename: 'static/js/[name].js', //
        path: resolve('dist'), // 输出的文件地址
        publicPath: '/'
    },
    // devtool: 'inline-source-map',
    module: {
    },
    resolve:{
        extensions:['.js','.jsx'],
        modules:[path.resolve(__dirname,'src'),'node_modules']
    },
    devServer: {
        contentBase: './dist',
        compress: true,
        port: port,
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    plugins: [
        new webpack.DllReferencePlugin({
            manifest:path.resolve(__dirname,'./public','manifest.json')
        }),
        new BundleAnalyzerPlugin({ analyzerPort: 9999 }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:'+port }),
        ],
});