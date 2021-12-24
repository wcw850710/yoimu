import { Link, useHistory } from 'react-router-dom'
import { Breadcrumb, Typography } from 'antd'
import { ArrowLeftOutlined, HomeOutlined } from '@ant-design/icons'
import { createClassName } from '@yoimu/web-lib'

const { Item } = Breadcrumb
export const PageTitle = ({
	title,
	just = false,
	back = false,
	icon: Icon,
	className,
	children,
}) => {
	const history = useHistory()
	const _onGoBack = () => history.goBack()

	return (
		<Typography>
			<div className="flex items-center mb-2">
				{back ? (
					<ArrowLeftOutlined
						className="text-base mr-3 flex items-center"
						onClick={_onGoBack}
					/>
				) : null}
				<Typography.Title level={3} style={{ marginBottom: 0 }}>
					{title}
				</Typography.Title>
				<Breadcrumb
					className={createClassName({
						'flex-1 bg-gray-100 px-2 ml-2': true,
						[className]: className != null,
					})}
				>
					<Item>
						<Link to={'/'}>
							<HomeOutlined
								className={'inline-flex items-center fill-current text-primary'}
							/>
						</Link>
					</Item>
					{just ? (
						<Item>
							{Icon ? (
								<Icon className={'inline-flex items-center mr-1'} />
							) : null}
							{title}
						</Item>
					) : (
						children
					)}
				</Breadcrumb>
			</div>
		</Typography>
	)
}
