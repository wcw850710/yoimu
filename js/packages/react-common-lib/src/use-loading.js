import { useCallback, useEffect, useRef } from 'react'
import { useForceUpdate } from './use-force-update'
import { useInitialRef } from './use-initial-ref'

const callFunc =
	(callback, loadingCall, res, propName, forceUpdate) =>
	async (...args) => {
		if (!loadingCall && res[propName]) return

		res[propName] = true
		forceUpdate()
		try {
			const data = await callback(...args)
			res[propName] = false
			forceUpdate()
			return { success: false, data }
		} catch (error) {
			console.error(error)
			res[propName] = false
			forceUpdate()
			return { success: false, data: error }
		}
	}

const initialPropRef = { num: 1, loadingCall: false }

export const useLoading = props => {
	const {
		current: { num = 1, loadingCall = false },
	} = useRef(props || initialPropRef)
	const forceUpdate = useForceUpdate()

	const stateRef = useInitialRef(() => {
		const res = {}

		for (let i = 0; i < num; i++) {
			const suffix = i === 0 ? '' : i + 1

			res['loading' + suffix] = false
			res['useLoadingCall' + suffix] = callback =>
				callFunc(callback, loadingCall, res, name, forceUpdate)
			res['useLoadingCallback' + suffix] = (callback, deps = []) =>
				useCallback(
					callFunc(callback, loadingCall, res, name, forceUpdate),
					[callFunc].concat(deps),
				)
			res['useLoadingEffect' + suffix] = (callback, deps = []) =>
				useEffect(callFunc(callback, loadingCall, res, name, forceUpdate), deps)
		}

		return res
	})

	return stateRef.current
}
