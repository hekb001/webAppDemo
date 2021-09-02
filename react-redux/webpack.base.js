const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 生成html
const CleanWebpackPlugin = require('clean-webpack-plugin'); // 清除dist
const CopyWebpackPlugin = require('copy-webpack-plugin'); // copy
const theme =require('./theme.js');
const processEnv = require('./server/index');
console.log(processEnv,'processEnv....')
function resolve(dir) {
    return path.join(__dirname, dir);
}
console.log(process.env.NODE_ENV,'process.env.NODE_ENV')
let webpackPlugin = [
    new CopyWebpackPlugin([{
        from: "./public",
        to: "",
        force: true
    }]),
    // new HtmlWebpackPlugin({
    //     filename: 'index.html',//输出的html路径
    //     template: './public/index.html', //html模板路径
    //     minify: {
    //         removeComments: true,
    //         collapseWhitespace: true,
    //         removeRedundantAttributes: true,
    //         useShortDoctype: true,
    //         removeEmptyAttributes: true,
    //         removeStyleLinkTypeAttributes: true,
    //         keepClosingSlash: true,
    //         minifyCSS: true,
    //         minifyJS: true,
    //         minifyURLs: true,
    //     }
    // }),
    new webpack.DefinePlugin({
        'process.env': JSON.stringify(processEnv)
    }),
    new webpack.HashedModuleIdsPlugin(), // 修复vendor hash
]
//生产环境打包先清理dist
process.env.NODE_ENV == 'production' && webpackPlugin.unshift(new CleanWebpackPlugin(['dist']));
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
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                include: [resolve('src'), resolve('test')]
            },
            {
                test:/\.(css|less)$/,
                use:[
                    {
                        loader:'style-loader',
                    },
                    {
                        loader:'css-loader',
                    },
                    {
                        loader:'less-loader',
                        options: {
                            javascriptEnabled: true,
                            sourceMap: true, 
                            modifyVars: theme,
                        }
                    }
                ]
            }
        ]
    },
    plugins: webpackPlugin,
};
