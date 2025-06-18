import { LeftCircleOutlined } from '@ant-design/icons'
import { queryKeys } from '@dacodes/lib'
import queryClient from '@dacodes/root/queryClient'
import { Alert, Button, Descriptions, Spin } from 'antd'
import type { DescriptionsProps } from 'antd/lib'
import { useMemo } from 'react'
import { useProfiles } from '../hooks/useProfiles'

export default function ProfileView(): React.ReactNode {
	const profileId = window.location.pathname.split('/')[2]
	const { profilesGetById } = useProfiles()
	const { data, isLoading, isFetched } = profilesGetById(+profileId)

	const items: DescriptionsProps['items'] = useMemo(
		() =>
			!data
				? []
				: [
						{
							key: 'id',
							label: 'id',
							children: data.id,
						},
						{
							key: 'firstName',
							label: 'Nombre',
							children: data.firstName,
						},
						{
							key: 'lastName',
							label: 'Apellido',
							children: data.lastName,
						},
						{
							key: 'maidenName',
							label: 'Apellido de soltera',
							children: data.maidenName,
						},
						{
							key: 'age',
							label: 'Edad',
							children: data.age,
						},
						{
							key: 'gender',
							label: 'Género',
							children: data.gender,
						},
						{
							key: 'email',
							label: 'Correo electrónico',
							children: data.email,
						},
						{
							key: 'phone',
							label: 'Teléfono',
							children: data.phone,
						},
						{
							key: 'username',
							label: 'Nombre de usuario',
							children: data.username,
						},
						{
							key: 'birthDate',
							label: 'Fecha de nacimiento',
							children: data.birthDate,
						},
						{
							key: 'image',
							label: 'Imagen',
							children: (
								<img
									src={data.image}
									alt="User"
									style={{ width: 100, height: 100 }}
								/>
							),
						},
						{
							key: 'bloodGroup',
							label: 'Grupo sanguíneo',
							children: data.bloodGroup,
						},
						{
							key: 'height',
							label: 'Altura (cm)',
							children: data.height,
						},
						{
							key: 'weight',
							label: 'Peso (kg)',
							children: data.weight,
						},
						{
							key: 'eyeColor',
							label: 'Color de ojos',
							children: data.eyeColor,
						},
						{
							key: 'hairColor',
							label: 'Color de cabello',
							children: data.hair.color,
						},
						{
							key: 'hairType',
							label: 'Tipo de cabello',
							children: data.hair.type,
						},
						{
							key: 'ip',
							label: 'IP Address',
							children: data.ip,
						},
						{
							key: 'address',
							label: 'Dirección',
							children: `${data.address.address}, ${data.address.city}, ${data.address.state}, ${data.address.postalCode}, ${data.address.country}`,
						},
						{
							key: 'macAddress',
							label: 'Dirección MAC',
							children: data.macAddress,
						},
						{
							key: 'university',
							label: 'Universidad',
							children: data.university,
						},
						{
							key: 'bankCardExpire',
							label: 'Tarjeta Expira',
							children: data.bank.cardExpire,
						},
						{
							key: 'bankCardNumber',
							label: 'Número de tarjeta bancaria',
							children: data.bank.cardNumber,
						},
						{
							key: 'bankCardType',
							label: 'Tipo de tarjeta bancaria',
							children: data.bank.cardType,
						},
						{
							key: 'bankCurrency',
							label: 'Moneda bancaria',
							children: data.bank.currency,
						},
						{
							key: 'bankIban',
							label: 'IBAN bancario',
							children: data.bank.iban,
						},
						{
							key: 'companyDepartment',
							label: 'Departamento de la empresa',
							children: data.company.department,
						},
						{
							key: 'companyName',
							label: 'Nombre de la empresa',
							children: data.company.name,
						},
						{
							key: 'companyTitle',
							label: 'Título de la empresa',
							children: data.company.title,
						},
						{
							key: 'companyAddress',
							label: 'Dirección de la empresa',
							children: `${data.company.address.address}, ${data.company.address.city}, ${data.company.address.state}, ${data.company.address.postalCode}, ${data.company.address.country}`,
						},
						{
							key: 'ein',
							label: 'EIN',
							children: data.ein,
						},
						{
							key: 'ssn',
							label: 'SSN',
							children: data.ssn,
						},
						{
							key: 'userAgent',
							label: 'User Agent',
							children: data.userAgent,
						},
						{
							key: 'cryptoCoin',
							label: 'Moneda de criptomonedas',
							children: data.crypto.coin,
						},
						{
							key: 'cryptoWallet',
							label: 'Billetera de criptomonedas',
							children: data.crypto.wallet,
						},
						{
							key: 'cryptoNetwork',
							label: 'Red de criptomonedas',
							children: data.crypto.network,
						},
						{
							key: 'role',
							label: 'Rol del usuario',
							children: data.role,
						},
					],
		[data],
	)

	const handleBack = () => {
		queryClient.setQueryData([queryKeys.navigate], '/directory')
	}

	return (
		<>
			<Button className="my-8" onClick={handleBack}>
				<LeftCircleOutlined />
				Volver
			</Button>

			{data && isLoading && <Spin spinning={true} size="large" />}

			{!data && isFetched && (
				<Alert
					showIcon
					className="w-fit"
					message="No se encontró el usuario"
					type="error"
				/>
			)}

			{data && (
				<Descriptions title="Información de usuario" bordered items={items} />
			)}
		</>
	)
}
