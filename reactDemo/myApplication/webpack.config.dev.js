const webpack = require('webpack')
const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: {
    bundle: ['react-hot-loader/patch', './src/index']
  },
  output: {
    path: path.join(__dirname, '/'),
    filename: '[name].js',
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new HtmlWebPackPlugin({
      favicon: path.join(__dirname, 'public/favicon.ico'),
      template: 'public/index.html',
      filename: 'index.ejs',
      config: 'window.config = <%- __CONFIG__ %>',
      inject: true,
    })
  ],
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
