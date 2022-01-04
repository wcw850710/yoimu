import { defineConfig, loadEnv } from 'vite'
import { minifyHtml, injectHtml } from 'vite-plugin-html'
import react from '@vitejs/plugin-react'
import styleImport, { AntdResolve } from 'vite-plugin-style-import'
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
			styleImport({
				resolves: [AntdResolve()],
				// antd-mobile 樣式按需引入(未測過)
				// libs: [
				// 	{
				// 		libraryName: 'antd-mobile',
				// 		esModule: true,
				// 		resolveStyle: (name) => {
				// 			return `antd-mobile/es/${name}/style`
				// 		},
				// 	},
				// ],
			}),
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
				scss: {
					additionalData: `@import "./src/core/style/variables";`,
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
