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
		},{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
		}]
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
		new ExtractTextPlugin("app.bundle.css"),
		new webpack.HotModuleReplacementPlugin()
	]
};

const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

const portPromise = new Promise(function(resolve, reject){
	portscanner.findAPortNotInUse(port, port + 10, host, function(error, port) {
		// Status is 'open' if currently in use or 'closed' if available
		config.devServer.port = port;
		config.devServer.host = host;
		resolve(config);
	});
});

module.exports = portPromise;
