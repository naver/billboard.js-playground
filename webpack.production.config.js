var webpack = require('webpack');
var path = require('path');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: [
		'./src/index.js'
	],
	output: {
		publicPath: './',
		path: path.join(__dirname, 'dist'),
		filename: '[chunkhash].js'
	},
	module: {

		rules : [
			{
				test: /\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			}
			,{
			test: [/(\.js)$/, /(\.jsx)$/],
			exclude: /(node_modules)/,
			include: path.join(__dirname, 'src'),
			loader: "babel-loader",
			query : {
				presets: ['es2015', 'react']
			}
		}]
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	plugins: [
		new WebpackCleanupPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				drop_console: true,
				drop_debugger: true
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new ExtractTextPlugin({
			filename: 'style.css',
			allChunks: true
		}),
		//new HtmlWebpackPlugin({
		//  template: './src/template.html',
		//  files: {
		//    css: ['style.css'],
		//    js: ['bundle.js'],
		//  }
		//})
	]
};