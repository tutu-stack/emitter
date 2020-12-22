const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: './src/index.js',
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src')
		}
	},
	devServer: {
		hot: true,
		inline: true,
		clientLogLevel: 'warning'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: 'public/index.html'
		})
	]
}
