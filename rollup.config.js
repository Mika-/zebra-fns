import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';
import pkg from './package.json';

export default {
	input: 'src/index.js',
	external: [],
	output: [
		{
			name: 'zebra',
			file: pkg.browser,
			format: 'umd'
		},
		{
			file: pkg.main,
			format: 'cjs'
		},
		{
			file: pkg.module,
			format: 'es'
		},
	],
	plugins: [
		babel({
			presets: [
				['env', {
					modules: false,
				}]
			],
			exclude: 'node_modules/**',
			babelrc: false
		}),
	    minify({
			comments: false
	    })
	]
};
