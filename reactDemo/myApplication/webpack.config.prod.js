/*
 * @Author: kevin.he 
 * @Date: 2021-09-01 16:56:05 
 * @Last Modified by: kevin.he
 * @Last Modified time: 2021-09-02 17:48:05
 */
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const TerserPluginer = new TerserPlugin({
    extractComments: false,//不将注释提取到单独的文件中,去掉.LICENSE.txt文件
    parallel: true,
    terserOptions: {
      compress: {
        ecma: 5,
        warnings: false,
        comparisons: false,
        inline: 2,
        pure_funcs: ['console.log']
      }
    }
  })
module.exports = {
  mode: 'production',
  entry: './src/index',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[hash:8].[name].js',
    chunkFilename: '[hash:8].[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      favicon: path.join(__dirname, 'public/favicon.ico'),
      template: 'public/index.html',
      filename: 'index.ejs',
      inject: true,
    }),
    new MiniCssExtractPlugin({
        filename: '[hash:8].[name].css',
        chunkFilename: '[id].css'
      })
  ],
  optimization: {
    minimize: true,
    minimizer: [TerserPluginer, new CssMinimizerPlugin()]
  },
  module: {
    rules: [
      { enforce: 'pre', test: /\.js$/, use: ['source-map-loader'] },
      {
        test: /\.jsx?$/, // jsx/js文件的正则
        exclude: /node_modules/, // 排除 node_modules 文件夹
        use: {
          loader: 'babel-loader',
          options: {
            // babel 转义的配置选项
            cacheDirectory: true,
            babelrc: false,
            plugins: ['@babel/plugin-proposal-class-properties'],
            presets: [
              // 添加 preset-react
              [require.resolve('@babel/preset-react')],
              [require.resolve('@babel/preset-env'), { modules: false }]
            ],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.((woff2?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|ttf|eot|svg|jpe?g|png|gif|ico)$/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'fonts/[hash:8].[name].[ext]'
        }
      }
    ]
  }
}
