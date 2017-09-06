var webpack = require('webpack');
var path = require('path');
var WebpackCleanupPlugin = require('webpack-cleanup-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
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
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		}),
		new ExtractTextPlugin("app.bundle.css"),
		new webpack.HotModuleReplacementPlugin()
	]

};