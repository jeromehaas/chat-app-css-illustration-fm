const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/js/main.js',
	resolve: {
		extensions: ['.webpack.js', '.js']
	},
	mode: 'production',
	output: {
		filename: '[name].build.js',
		path: path.join(__dirname, 'js'),
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