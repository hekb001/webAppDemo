const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const base = require('./webpack.base.js');
const TerserPlugin = require("terser-webpack-plugin");
const plugins = new TerserPlugin({
    parallel: true,
    cache: true,
    terserOptions: {
        parse: {
            ecma: 8,
        },
        compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            pure_funcs: ["console.log"]
        },
    },
});
function resolve(dir) {
    return path.join(__dirname, dir)
}
const prodConfig = merge(base, {
    output: {
        filename: '[hash:8].[name].js',
		chunkFilename: '[hash:8].[name].js',
        path: resolve('dist'), // 输出的文件地址
        publicPath: './'
    },
    mode: 'production',
    devtool: 'none',
    module: {
        
    },
});
prodConfig['optimization'] = Object.assign(prodConfig['optimization'], {
    minimize: true,
    minimizer: [plugins],
})
module.exports = prodConfig