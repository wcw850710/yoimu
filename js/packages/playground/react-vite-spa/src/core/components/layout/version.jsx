import { useMemo } from 'react'
import { useVersion } from '@/core/hooks/use-version'
import { createClassName } from '@yoimu/web-lib'

export const Version = ({ className: pclassName }) => {
	const className = useMemo(
		() =>
			createClassName({
				'p-3 text-center': true,
				[pclassName]: pclassName != null,
			}),
		[pclassName],
	)

	const version = useVersion(e => e.version)

	return <div className={className}>{version}</div>
}
