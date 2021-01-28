var webpack = require('webpack');
var path = require('path');
const vendors = [
    'react',
    'react-dom',
    'react-router',
    'redux',
    'react-redux',
];

module.exports = {
    output: {
      path: path.join(__dirname, './public'),
	    filename: '[chunkhash].[name].js',
	    library: '[chunkhash]_[name]',
    },
    entry: {
        "vendor": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, './public/', '[name]-manifest.json'),
            name: '[chunkhash]_[name]',
            context: path.join(__dirname, './public/'),
        }),
    ],
};
