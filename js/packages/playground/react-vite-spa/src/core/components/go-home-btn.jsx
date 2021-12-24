import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useToHomePathname } from '@/core/hooks/use-to-home-pathname'

export const GoHomeBtn = () => {
	const toHomePathname = useToHomePathname()

	return (
		<Link to={toHomePathname}>
			<Button type="primary">回首頁</Button>
		</Link>
	)
}
