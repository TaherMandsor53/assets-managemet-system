const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './main.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: 'bundle.js',
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.(png|jpe?g|gif|woff|woff2|eot|ttf|svg)$/,
				loader: 'file-loader',
				options: {
					name: '[path][name].[ext]',
					plugins: ['lodash'],
					presets: [['env', { modules: false, targets: { node: 4 } }]],
				},
			},
			{
				test: /\.(less)$/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
					},
					{
						loader: 'less-loader',
					},
				],
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './dist/index.html',
			filename: './index.html',
		}),
	],
	devServer: {
		port: 9191,
		inline: true,
		host: 'localhost',
		historyApiFallback: true,
		disableHostCheck: true,
		headers: { 'Access-Control-Allow-Origin': '*' },
	},
	optimization: {
		minimize: false,
	},
};
