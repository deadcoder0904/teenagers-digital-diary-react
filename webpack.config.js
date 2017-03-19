var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: __dirname + '/app/index.html',
	filename: 'index.html',
	inject: 'body'
});
module.exports = {
	entry: [
		"./app/index.js"
	],
	output: {
		path: __dirname,
		filename: "index_bundle.js"
	},
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
		    { test: /\.css$/, loader: "style!css" },
		    { test: /\.(png|jpg|jpeg|gif|woff)$/, loader: 'url?limit=8192' },
		    { test: /\.(otf|eot|ttf)$/, loader: "file?prefix=fonts/" },
		    { test: /\.svg$/, loader: "file" },
		    { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx']
	},
	plugins: [
		HtmlWebpackPluginConfig,
		new webpack.DefinePlugin({
		  'process.env': {
		    NODE_ENV: JSON.stringify('production')
		  }
		}),
		new webpack.optimize.UglifyJsPlugin()
	]
}
