import { defineConfig, loadEnv } from 'vite'
import { minifyHtml, injectHtml } from 'vite-plugin-html'
import react from '@vitejs/plugin-react'
import vitePluginImport from 'vite-plugin-babel-import'
import reactSvgPlugin from 'vite-plugin-react-svg'
const path = require('path')

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

	return defineConfig({
		plugins: [
			react(),
			reactSvgPlugin({
				defaultExport: 'component',
				expandProps: 'end',
			}),
			vitePluginImport([
				{
					libraryName: 'antd',
					libraryDirectory: 'es',
					style(name) {
						return `antd/es/${name}/style`
					},
				},
				// {
				// 	libraryName: 'antd-mobile',
				// 	libraryDirectory: 'es',
				// 	style(name) {
				// 		return `antd-mobile/es/${name}/style`
				// 	},
				// },
			]),
			minifyHtml(),
			injectHtml({
				data: {
					title: process.env.VITE_COMMON_APP_TITLE,
				},
			}),
		],
		css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true,
				},
			},
		},
		// ant-mobile bundle 錯誤修復用
		// build: { commonjsOptions: { transformMixedEsModules: true } },
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@i18n': path.resolve(__dirname, 'src/core/i18n'),
			},
		},
		server: {
			port: process.env.VITE_PORT,
			proxy: {
				[process.env.VITE_API_BASE_URL]: {
					target: process.env.VITE_API_URL,
					changeOrigin: true,
				},
				// [process.env.VITE_WS_BASE_URL]: {
				// 	target: process.env.VITE_API_URL,
				// 	changeOrigin: true,
				// 	// rewrite: path => path.replace(/^\/ws/, '')
				// }
			},
		},
	})
}
