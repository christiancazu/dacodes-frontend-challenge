interface FlipCardProps {
	id: number
	name: string
	flipped: boolean
	matched: boolean
	clicked: (name: string, id: number) => void
}

export default function FlipCard({
	id,
	name,
	flipped,
	matched,
	clicked,
}: FlipCardProps): React.ReactElement {
	return (
		<div
			onClick={() => (flipped ? undefined : clicked(name, id))}
			className={`card${flipped ? ' flipped' : ''}${matched ? ' matched' : ''}`}
		>
			<div className="back">
				<img
					src="https://23746804.fs1.hubspotusercontent-na1.net/hub/23746804/hubfs/logo-dacodes-01.png?width=167&height=70&name=logo-dacodes-01.png"
					alt="dacodes"
				/>
			</div>
			<div className="front">
				<img
					alt={name}
					src={`https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${name}&size=128`}
				/>
			</div>
		</div>
	)
}
