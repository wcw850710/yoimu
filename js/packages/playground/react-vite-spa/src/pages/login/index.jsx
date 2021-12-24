import { useState } from 'react'
import { Button, Form, Input, message } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '@/core/hooks/use-auth'
import { useHttp } from '@/core/hooks/http/use-http'

const initialUsername = import.meta.env.VITE_USERNAME
const initialPassword = import.meta.env.VITE_PASSWORD

export default () => {
	const history = useHistory()
	const { http } = useHttp()
	const { setAuth, setToken } = useAuth(e => ({
		setAuth: e.setAuth,
		setToken: e.setToken,
	}))
	const [submitLoading, setSubmitLoading] = useState(false)

	const onLogin = async _data => {
		setSubmitLoading(true)
		const { success } = await { success: false }
		setSubmitLoading(false)

		if (success) {
			setAuth(undefined)
			setToken(undefined)
			message.success('登入成功')
			history.replace('/')
		}
	}

	return (
		<>
			<div className="text-lg font-bold mb-4 text-center">登入</div>
			<Form name={'login-form'} onFinish={onLogin}>
				<Form.Item
					label={'帳號'}
					name={'username'}
					initialValue={initialUsername}
					rules={[{ required: true }]}
					validateTrigger={['onChange', 'onBlur']}
				>
					<Input />
				</Form.Item>
				<Form.Item
					label={'密碼'}
					name={'password'}
					initialValue={initialPassword}
					rules={[{ required: true }]}
					validateTrigger={['onChange', 'onBlur']}
				>
					<Input.Password
						iconRender={visible =>
							visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
						}
					/>
				</Form.Item>
				<div className="text-right">
					<Link to={'/register'}>
						<Button className="mr-2">註冊</Button>
					</Link>
					<Button type="primary" htmlType="submit" loading={submitLoading}>
						登入
					</Button>
				</div>
			</Form>
		</>
	)
}
