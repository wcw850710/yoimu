import { useMemo } from 'react'
import { useVersion } from '@/core/hooks/use-version'
import { mergeWords } from '@yoimu/common-lib'

export const Version = ({ className: pclassName }) => {
	const className = useMemo(
		() => mergeWords('p-3 text-center', pclassName && pclassName),
		[pclassName],
	)

	const version = useVersion(e => e.version)

	return <div className={className}>{version}</div>
}
