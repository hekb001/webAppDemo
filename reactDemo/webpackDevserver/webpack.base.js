const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    entry: {
        app: './src/index.tsx',
        vendor: [
            'react', 'react-dom'
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                node_vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'async',
                    priority: 1
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', 'jsx', '.json', '.css', '.less', '.json', '.tsx', '.ts'],
        modules: [path.resolve(__dirname, 'src'), 'node_modules']
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [resolve('src')],

            },
            { test: /\.txt$/, use: 'raw-loader' },
            {
                test: /\.(css|less)$/,
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            sourceMap: true,
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',//输出的html路径
            template: './public/index.html', //html模板路径
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
    ]
}