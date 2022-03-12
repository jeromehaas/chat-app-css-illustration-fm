const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/js/main.js',
	resolve: {
		extensios: ['.webpack.js', '.js']
	},
	mode: 'development',
	output: {
		publicPath: '/js/',
		path: path.join(__dirname, '/wwwroot/js/'),
		filename: '[name].build.js' 
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/env']
					}
				}
			}
		]
	}

}