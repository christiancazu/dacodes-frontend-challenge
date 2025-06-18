import { Button, Flex, Typography } from 'antd'
import { useNavigate } from 'react-router'

const NotFoundView: React.FC = () => {
	const navigate = useNavigate()

	return (
		<Flex
			vertical
			align="center"
			justify="center"
			style={{ minHeight: '80vh' }}
		>
			<section style={{ width: '300px' }}>
				<Typography.Title level={3} className="mb-5 text-center">
					Esta página no existe
				</Typography.Title>
				<Button block type="primary" onClick={() => navigate('/')}>
					Volver
				</Button>
			</section>
		</Flex>
	)
}

export default NotFoundView
