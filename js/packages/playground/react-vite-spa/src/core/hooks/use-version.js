import { useState } from 'react'
import { createProvider } from '@yoimu/react-common-lib'

const useService = () => {
	const [version, setVersion] = useState(
		`WEB: ${import.meta.env.VITE_APP_VERSION}`,
	)
	// const bootstrap = useCallback(() => {}, [setVersion])
	//
	// useEffect(bootstrap, [])

	return {
		version,
	}
}

export const { Provider: VersionProvider, inject: useVersion } =
	createProvider(useService)
