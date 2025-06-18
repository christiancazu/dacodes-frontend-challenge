import { LeftCircleOutlined } from '@ant-design/icons'
import { Button, Flex, Typography } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import FlipCard from './FlipCard'
import FlipGameFinished from './FlipGameFinished'

type Props = {
	modality: GameGridModality
	handleRestartGame: () => void
}

export type GameGridModality = 3 | 4 | 5

type CardItem = {
	id: number
	flipped: boolean
	matched: boolean
	name: string
}
const domains = [
	'reactjs.org',
	'vuejs.org',
	'angular.io',
	'svelte.dev',
	'emberjs.com',
	'nuxtjs.org',
	'astro.build',
	'solidjs.com',
	'preactjs.com',
	'd3js.org',
	'socket.io',
	'tailwindcss.com',
	'vitejs.dev',
	'threejs.org',
	'nestjs.com',
	'graphql.org',
	'nextjs.org',
	'remix.run',
	'gatsbyjs.com',
	'quasar.dev',
	'ionicframework.com',
	'bulma.io',
	'getbootstrap.com',
	'jquery.com',
	'axios-http.com',
	'cypress.io',
	'jestjs.io',
	'mocha.org',
	'jasmine.github.io',
	'webpack.js.org',
	'rollupjs.org',
	'gulpjs.com',
	'gruntjs.com',
	'babeljs.io',
]

export function FlipGameBoard({
	modality,
	handleRestartGame,
}: Props): React.ReactElement {
	const shuffledCards = useMemo(() => {
		const isOdd = modality % 2 !== 0

		const ramdomDomains = domains
			.slice()
			.sort(() => Math.random() - 0.5)
			.slice(0, Math.floor(Number(modality * modality) / 2) + (isOdd ? 1 : 0))

		const cards = [...ramdomDomains, ...ramdomDomains]

		if (isOdd) {
			cards.pop()
		}

		let currentIndex = cards.length
		let temporaryValue: string
		let randomIndex: number

		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex -= 1
			temporaryValue = cards[currentIndex]
			cards[currentIndex] = cards[randomIndex]
			cards[randomIndex] = temporaryValue
		}
		return cards
	}, [modality])

	const [cardList, setCardList] = useState<CardItem[]>(
		shuffledCards.map((name, index) => {
			return {
				id: index,
				name: name,
				flipped: false,
				matched: false,
			}
		}),
	)

	const [flippedCards, setFlippedCards] = useState<
		{ name: string; index: number }[]
	>([])

	const [gameOver, setGameOver] = useState(false)
	const [tryCount, setTryCount] = useState(0)

	const handleClick = useCallback(
		(name: string, index: number) => {
			const currentCard = {
				name,
				index,
			}

			const updateCards = cardList.map((card) => {
				if (card.id === index) {
					card.flipped = true
				}
				return card
			})
			const updateFlipped = flippedCards
			updateFlipped.push(currentCard)
			setFlippedCards(updateFlipped)
			setCardList(updateCards)

			if (flippedCards.length === 2) {
				setTimeout(() => {
					check()
				}, 750)
			}
		},
		[cardList],
	)

	const check = () => {
		const updateCards = cardList
		if (
			flippedCards[0].name === flippedCards[1].name &&
			flippedCards[0].index !== flippedCards[1].index
		) {
			updateCards[flippedCards[0].index].matched = true
			updateCards[flippedCards[1].index].matched = true
			isGameOver()
		} else {
			updateCards[flippedCards[0].index].flipped = false
			updateCards[flippedCards[1].index].flipped = false
		}
		setCardList(updateCards)
		setFlippedCards([])

		setTryCount(tryCount + 1)
	}

	const isGameOver = () => {
		let done = true
		let count = 0
		let tmpCard: CardItem
		let index = 0

		cardList.forEach((card, i) => {
			if (!card.matched) {
				done = false

				count++
				tmpCard = card
				index = i
			}
		})

		if (count === 1 && tmpCard!) {
			tmpCard.matched = true
			handleClick(tmpCard.name, index)
			setTimeout(() => {
				setGameOver(true)
			}, 750)
		} else {
			setGameOver(done)
		}
	}

	return (
		<Flex vertical align="center">
			<div
				className="game-board"
				style={
					{
						width: modality === 3 ? '60%' : modality === 4 ? '80%' : '100%',
						['--modality' as any]: modality,
					} as React.CSSProperties
				}
			>
				{cardList.map((card, index) => (
					<FlipCard
						key={card.id}
						id={index}
						name={card.name}
						flipped={card.flipped}
						matched={card.matched}
						clicked={flippedCards.length === 2 ? () => {} : handleClick}
					/>
				))}
			</div>
			<Typography.Title className="mt-8 text-center" level={3}>
				intentos: {tryCount}
			</Typography.Title>

			{gameOver && <FlipGameFinished />}

			<Button className="mt-8" onClick={handleRestartGame}>
				<LeftCircleOutlined />
				Volver
			</Button>
		</Flex>
	)
}
