const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清除dist
const CopyWebpackPlugin = require('copy-webpack-plugin'); // copy

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    entry: {
        app: './src/index.js',
        vendor: [
            'react',
            'react-dom'
          ]
    },
    resolve: {
        extensions: [' ', '.js', '.json', '.jsx', '.css', '.less','.json'],
        modules: [resolve( "src"), "node_modules"], //绝对路径;
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [resolve('src'), resolve('test')]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([{
            from: "./public",
            to: "",
            force: true
        }]),
        new HtmlWebpackPlugin({
            filename: 'index.html',//输出的html路径
            template: './public/index.html', //html模板路径
            chunks: ['app', 'vendor', 'manifest'],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
            }
        }),
        new webpack.HashedModuleIdsPlugin(), // 修复vendor hash
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest', // 指定公共 bundle 的名称。
            minChunks: Infinity
        })
    ]
};