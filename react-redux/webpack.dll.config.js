let path=require('path');
let webpack=require('webpack');
module.exports={
	mode:'production',
	entry:{
		react:[ 'react',
		'react-dom',
		'react-router',
		'redux',
		'lodash',
		'react-redux',] // 打包 react 和react-dom 在一个 代码块 react中
	},
	output:{
		filename:'_dll_[name].js',   //  产生的文件名字
		path:path.resolve(__dirname,'./public'),
		library:'_dll_[name]',  //  导出的js文件  库名字叫做 ab
		libraryTarget:'var'  // comomjs 规范
	},
	plugins:[
		new webpack.DllPlugin({
			name:'_dll_[name]',  // 要和output输出文件名字同名
			path:path.resolve(__dirname,'./public','manifest.json')
		})
	]
}