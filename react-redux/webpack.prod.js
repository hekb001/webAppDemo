const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');

function resolve (dir) {
    return path.join(__dirname, dir)
}

module.exports = merge(base, {
    output: {
        filename: 'static/js/[name].[hash:7].js', //
        path: resolve('dist'), // 输出的文件地址
        publicPath: './'
    },
    devtool: 'source-map',//打包出来的文件加上source-map
    module: {
    },
    plugins: [
	    new webpack.optimize.UglifyJsPlugin({ // 压缩JS
            compress: {
                warnings: false,
                comparisons: false,
            },
            mangle: {
                safari10: true,
            },
            output: {
                comments: false,
                ascii_only: true,
            },
            sourceMap: true,
        }),
    ]
});