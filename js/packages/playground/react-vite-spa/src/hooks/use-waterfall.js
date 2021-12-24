import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * 瀑布流獲取數據
 * @type {
 *   (getList: (params: { size: number, number: number }) => Promise<void>, options: { createdRun?: boolean, size?: number, range?: number, el?: window | HTMLElement }) => {
 *     list: any[],
 *     setList: (getter: (e: any[]) => any[] | any[]) => void,
 *     loading: boolean,
 *     start: () => void,
 *     end: () => void,
 *     run: (reset: boolean) => Promise<void>,
 *   }
 * }
 */
export const useWaterfall = (
	getList,
	options = {}
) => {
	const { createdRun = true, size = 10, range = 0.95, el = window } = options
	const [isEnd, setIsEnd] = useState(false)
	const [list, setList] = useState([])
	const [loading, setLoading] = useState(false)
	const pagination = useRef({
		total: 0,
		size,
		number: 1,
	})
	const start = () => setIsEnd(false)
	const end = () => setIsEnd(true)

	const run = useCallback(
		async (reset = false) => {
			setLoading(true)
			setIsEnd(true)
			if (reset) pagination.current.number = 1
			const { data } = await getList({
				size,
				number: pagination.current.number,
			})
			pagination.current.total = data.data.totalElements ?? 0
			if (data.success) {
				if (reset) {
					setList(data.data.content)
				} else {
					setList(e => [...e, ...data.data.content])
				}
				if (
					!(
						pagination.current.number * pagination.current.size >=
						pagination.current.total
					)
				) {
					pagination.current.number = pagination.current.number + 1
					setIsEnd(false)
				}
			} else {
				pagination.current.number = 1
			}
			setLoading(false)
		},
		[getList],
	)

	const _onScroll = useCallback(async () => {
		const { pageYOffset, innerHeight, scrollTop, clientHeight } = el
		const { scrollHeight } = el instanceof Window ? document.body : el
		const yOffset = pageYOffset ?? scrollTop
		const elHeight = innerHeight ?? clientHeight
		const st = yOffset + elHeight
		const r = st / scrollHeight
		if (!loading && r > range) {
			run()
		}
	}, [getList, loading, range])

	useEffect(() => {
		if (createdRun) run()
	}, [])

	useEffect(() => {
		if (getList != null && !isEnd && el != null) {
			el.addEventListener('scroll', _onScroll)
			return () => el.removeEventListener('scroll', _onScroll)
		}
	}, [getList, _onScroll, isEnd, el])

	return { list, setList, loading, start, end, run }
}
