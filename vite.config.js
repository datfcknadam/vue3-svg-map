import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
	build: {
		lib: {
			// the entry file that is loaded whenever someone imports
			// your plugin in their app
			entry: path.resolve(__dirname, 'src/wrapper.js'),

			// the exposed global variable
			// is required when formats includes 'umd' or 'iife'
			name: 'VueSvgMap',

			// the proper extensions will be added, ie:
			// name.js (es module)
			// name.umd.cjs) (common js module)
			// default fileName is the name option of package.json
			fileName: 'vue3-svg-map',
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
	plugins: [
		vue({
			compileTemplate: true,
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},
})
