import { KeyOutlined, UserOutlined } from '@ant-design/icons'
import { type AuthDto, queryKeys } from '@dacodes/lib'
import queryClient from '@dacodes/root/queryClient'
import { Button, Flex, Form, Input, Typography } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useAuth } from '../hooks/useAuth'
import classes from './AuthView.module.scss'

export default function AuthView(): React.ReactNode {
	const [form] = useForm<AuthDto>()

	const { authLogin } = useAuth()

	const { mutateAsync, isPending } = authLogin()

	return (
		<Flex vertical align="center" justify="center" className={classes.AuthView}>
			<Typography.Title level={3}>Login</Typography.Title>
			<Form
				onFinish={(v) =>
					mutateAsync(v).then(() => {
						queryClient.setQueryData([queryKeys.navigate], '/directory')
					})
				}
				labelCol={{ span: 4 }}
				wrapperCol={{ span: 20 }}
				autoComplete="off"
				form={form}
				disabled={isPending}
			>
				<Form.Item
					label={<UserOutlined />}
					name="username"
					rules={[{ required: true, message: 'Por favor ingrese su usuario' }]}
				>
					<Input placeholder="usuario" />
				</Form.Item>
				<Form.Item
					label={<KeyOutlined />}
					name={'password'}
					rules={[
						{ required: true, message: 'Por favor ingrese su contraseña' },
					]}
				>
					<Input.Password placeholder="contraseña" />
				</Form.Item>
				<Form.Item label={null}>
					<Button type="primary" htmlType="submit" loading={isPending}>
						SIGN IN
					</Button>
				</Form.Item>
			</Form>
		</Flex>
	)
}
