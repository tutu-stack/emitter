const path = require('path')

module.exports = function (config) {
	const configuration = {
		basePath: './test/',
		browsers: ['ChromeHeadless'],
		frameworks: ['mocha', 'sinon-chai'],
		reporters: ['spec', 'coverage'],
		coverageReporter: {
			dir: '../coverage'
		},
		files: ['**/*.spec.js'],
		color: true,
		preprocessors: {
			'src/**/*.js': ['webpack', 'sourcemap', 'coverage'],
			'**/*.spec.js': ['webpack', 'sourcemap']
		},
		webpack: {
			resolve: {
				alias: {
					src: path.resolve(process.cwd(), 'src')
				}
			},
			module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						use: ['babel-loader']
					}
				]
			}
		},
		exclude: [
			'node_modules'
		],
		webpackMiddleware: {
			stats: 'errors-only'
		},
		logLevel: config.LOG_INFO,
		singleRun: false,
		concurrency: Infinity
	}

	config.set(configuration)
}
