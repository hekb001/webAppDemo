const webpack = require('webpack');
const webpackCfg = require('./webpack.config.dev');
const webpackDevServer = require('webpack-dev-server');
const compiler = webpack(webpackCfg);
const port = '8082'
const app = new webpackDevServer(compiler, {
    publicPath:webpackCfg.output.publicPath
})
app.listen(port,'localhost',function(err){
    if(err){
        console.log(err,'err')
    }
})
console.log('server listen at http://localhost:8082')