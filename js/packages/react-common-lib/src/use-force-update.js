import { useCallback, useState } from 'react'

export const useForceUpdate = () => {
	const [, setCount] = useState(0)
	return useCallback(() => setCount(e => e + 1), [])
}
