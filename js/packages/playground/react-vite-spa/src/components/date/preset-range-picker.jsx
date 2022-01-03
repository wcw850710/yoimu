import { DatePicker } from 'antd'
import { mergeWords, mtime } from '@yoimu/common-lib'
import { useCommonSelectState } from '@/hooks/use-common-select-state'
import { useMemo } from 'react'

const { RangePicker } = DatePicker
export const PresetRangePicker = ({
	className: pclassName,
	defaultValue,
	value,
	onChange,
	...args
}) => {
	const className = useMemo(() => pclassName || undefined, [pclassName])
	const [v, _onChange] = useCommonSelectState({
		value,
		onChange,
		defaultValue,
	})
	const ranges = {
		今天: mtime.today(),
		昨天: mtime.yesterday(),
		過去七天: mtime.pastWeek(),
		過去一個月: mtime.pastMonth(),
	}

	return (
		<RangePicker
			className={className}
			ranges={ranges}
			value={v}
			onChange={_onChange}
			{...args}
		/>
	)
}
