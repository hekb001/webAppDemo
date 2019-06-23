var path = require('path');
module.exports = {
    entry: './index.js',
    output: {
        path: __dirname + '/dist',
        filename: "bundle.js"
    },
    module: {
        loaders: [{
            test: /\.js$/, // 匹配.js文件，如果通过则使用下面的loader
            exclude: /node_modules/, // 排除node_modules文件夹
            loader: 'babel' // 使用babel（babel-loader的简写）作为loader
        }]
    }
}