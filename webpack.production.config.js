const webpack = require("webpack");
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const config = {
	context: `${__dirname}/`,
	entry: {
		app: path.resolve(__dirname, "./src/index.js")
	},
	output: {
		path: path.join(__dirname, "/dist"), // 파일이 저장될 경로
		filename: "[name].bundle.js",
		publicPath: "/dist/", // 서버상의 경로 (ex. express.static)
		libraryTarget: "umd"
	},
	module: {
		rules: [{
			test: [/(\.js)$/, /(\.jsx)$/],
			exclude: /(node_modules)/,
			include: path.join(__dirname, "src"),
			loader: "babel-loader",
			query: {
				presets: ["es2015", "react"]
			}
		}, {
			test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			loader: "url-loader?name=[name].[ext]&limit=10000&minetype=application/font-woff"
		}, {
			test: /\.svg$/,
			loader: "svg-url-loader?name=[name].[ext]"
		}, {
			test: /\.scss$/,
			use: ExtractTextPlugin.extract({
				use: [{
					loader: "css-loader"
				}, {
					loader: "sass-loader"
				}],
				fallback: "style-loader"
			})
		}, {
			test: /\.css$/,
			loader: ExtractTextPlugin.extract({ fallback: "style-loader", use: "css-loader" })
		}]
	},
	resolve: {
		modules: [
			"node_modules",
			path.resolve("./src")
		],
		extensions: [".js", ".jsx"]
	},
	externals: {
		"prop-types": {
			commonjs2: "prop-types",
			commonjs: "prop-types",
			amd: "prop-types",
			umd: "prop-types",
			root: "PropTypes"
		},
		lodash: {
			commonjs2: "lodash",
			commonjs: "lodash",
			amd: "lodash",
			umd: "lodash",
			root: "_"
		},
		d3: {
			root: "d3",
			commonjs2: "d3",
			commonjs: "d3",
			amd: "d3",
			umd: "d3"
		},
		"billboard.js": {
			root: "bb",
			commonjs2: "billboard.js",
			commonjs: "billboard.js",
			amd: "billboard.js",
			umd: "billboard.js"
		},
		react: {
			root: "React",
			commonjs2: "react",
			commonjs: "react",
			amd: "react",
			umd: "react"
		},
		redux: {
			root: "Redux",
			commonjs2: "redux",
			commonjs: "redux",
			amd: "redux",
			umd: "redux"
		},
		"react-redux": {
			root: "ReactRedux",
			commonjs2: "react-redux",
			commonjs: "react-redux",
			amd: "react-redux",
			umd: "react-redux"
		},
		"react-dom": {
			root: "ReactDOM",
			commonjs2: "react-dom",
			commonjs: "react-dom",
			amd: "react-dom",
			umd: "react-dom"
		}
	},
	devtool: "cheap-eval-source-map",
	devServer: {
		contentBase: `${__dirname}/`,
		hot: true,
		inline: true
	},
	plugins: [
		new webpack.ProvidePlugin({
			d3: "d3",
			$: "jquery",
			jQuery: "jquery"
		}),
		new ExtractTextPlugin("app.bundle.css"),
		new webpack.HotModuleReplacementPlugin(),
		new UglifyJsPlugin({
			drop_console: true,
			sourceMap: true
		})
	]
};

module.exports = config;
