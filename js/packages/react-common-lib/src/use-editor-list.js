import { useCallback, useState } from 'react'

export const useEditorList = (initialValueFunc, init = true) => {
	const [list, setList] = useState(() => (init ? [initialValueFunc()] : []))

	const create = useCallback(
		() => setList(e => [...e, initialValueFunc()]),
		[setList],
	)

	const editByIndex = useCallback(
		(index, value) =>
			setList(e => {
				if (index < 0 || index > e.length - 1) return e
				const e2 = e.slice()
				e2[index] = value
				return e2
			}),
		[setList],
	)

	const editKeyValueByIndex = useCallback(
		(index, key, value) =>
			setList(e => {
				if (index < 0 || index > e.length - 1) return e
				const e2 = e.slice()
				e2[index][key] = value
				return e2
			}),
		[setList],
	)

	const removeByIndex = useCallback(
		(index, removeNum = 1) =>
			setList(e => {
				if (index < 0 || index > e.length - 1) return e
				const e2 = e.slice()
				e2.splice(index, removeNum)
				return e2
			}),
		[setList],
	)

	const removeByKeyValue = useCallback(
		(key, value, removeNum = 1) =>
			setList(e => {
				const removeIndex = e.findIndex(f => f[key] === value)
				if (removeIndex === -1) return e
				const e2 = e.slice()
				e2.splice(removeIndex, removeNum)
				return e2
			}),
		[setList],
	)

	return [
		list,
		setList,
		{
			create,
			editByIndex,
			editKeyValueByIndex,
			removeByIndex,
			removeByKeyValue,
		},
	]
}
