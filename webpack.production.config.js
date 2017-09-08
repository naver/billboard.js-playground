"use strict";

const webpack = require('webpack');
const path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const portscanner = require('portscanner');

const config = {
	context: __dirname + "/",
	entry: {
		"app" : path.resolve(__dirname, "./src/index.js")
	},
	output: {
		path: path.join(__dirname, "/dist"), // 파일이 저장될 경로
		filename: "[name].bundle.js",
		publicPath : "/dist/", // 서버상의 경로 (ex. express.static)
		libraryTarget: "umd"
	},
	module: {
		rules : [{
			test: [/(\.js)$/, /(\.jsx)$/],
			exclude: /(node_modules)/,
			include: path.join(__dirname, 'src'),
			loader: "babel-loader",
			query : {
				presets: ['es2015', 'react']
			}
		},
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?name=[name].[ext]&limit=10000&minetype=application/font-woff" },
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					use: [{
						loader: "css-loader"
					}, {
						loader: "sass-loader"
					}],
					// use style-loader in development
					fallback: "style-loader"
				})
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
			},
			//{
			//	test: /\.css$/,
			//	use: ExtractTextPlugin.extract({
			//		fallbackLoader: 'style-loader',
			//		use: [
			//			{
			//				loader: 'css-loader',
			//				options: {
			//					modules: true, // default is false
			//					sourceMap: true,
			//					importLoaders: 1,
			//					localIdentName: "[name]"
			//				}
			//			},
			//			'postcss-loader'
			//		]
			//	})
			//}
		]
	},
	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', '.jsx']
	},


	devtool: "cheap-module-source-map",
	devServer: {
		contentBase: __dirname + '/',
		hot: true,
		inline: true
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		}),
		new ExtractTextPlugin('app.bundle.css'),
		new webpack.HotModuleReplacementPlugin()
	]
};

module.exports = config;
