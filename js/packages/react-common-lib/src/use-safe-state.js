import { useCallback, useEffect, useRef, useState } from 'react'

export const useSafeState = initialState => {
	const _isMounted = useRef(true)
	const [state, setState] = useState(initialState)
	const updateState = useCallback(update => {
		if (_isMounted.current) {
			setState(update)
		}
	}, [])
	useEffect(() => {
		return () => {
			_isMounted.current = false
		}
	}, [])
	return [state, updateState]
}
