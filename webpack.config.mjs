import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
	mode: 'production',
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'umd'),
		filename: 'index.mjs',
		library: '@academy/logger',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'ts-loader',
					options: {
						configFile: 'tsconfig.umd.json'
					}
				}
			}
		]
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js']
	}
};
