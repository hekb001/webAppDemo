const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const base = require('./webpack.base.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
function resolve(dir) {
  return path.join(__dirname, dir)
}
// 端口
const port = 8081;

module.exports = merge(base, {
  mode: 'development',
  output: {
    filename: 'bundle.js', //
    path: resolve('public'), // 输出的文件地址
    publicPath: '/'
  },
  devtool: 'eval',
  module: {
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  //devServer配置项不能与htmlwebpackPlugin共存，只能配置其中一种
  // devServer: {
  //   contentBase: path.resolve(__dirname, 'public'),
  //   index: 'index.html',
  //   compress: true,
  //   port: port,
  //   historyApiFallback: true,//不跳转
  //   inline: true,//实时刷新
  //   disableHostCheck: true,
  //   host:'http://saasadmin.react.mila66.com',
  //   // proxy: {
  //   //   "/": {
  //   //     target: "http://localhost:8081",
  //   //     bypass: function (req, res, proxyOptions) {
  //   //       if (req.headers.accept.indexOf("html") !== -1) {
  //   //         console.log("Skipping proxy for browser request.");
  //   //         return "/index.html";
  //   //       }
  //   //     }
  //   //   }
  //   // }
  // },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, './public', 'manifest.json')
    }),
    // new BundleAnalyzerPlugin({ analyzerPort: 9999 }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new OpenBrowserPlugin({ url: 'http://localhost:' + port }),
  ],
});