import { createContext, useContext, useMemo } from 'react'
import { createHttp } from '@/core/hooks/http/create-http'
import { AxiosInstance } from 'axios'
import { message } from 'antd'

export { HttpProvider, useHttp }

const context = createContext(null)

function HttpProvider({ children }) {
	const service = useMemo(() => {
		const _service = createHttp()

		_service.http.interceptors.response.use(
			response => {
				return response
			},
			error => {
				// 統一 try/catch
				const res = error.response
				if (res) {
					if (!res.config.headers.NoErrorMessage) {
						if (res.data && res.data.message) {
							message.error(res.data.message)
						}
					}
				}
				return Promise.resolve(res)
			},
		)

		return _service
	}, [])

	return <context.Provider value={service}>{children}</context.Provider>
}

/**
 * @return {{http: AxiosInstance}}
 */
function useHttp() {
	return useContext(context)
}
