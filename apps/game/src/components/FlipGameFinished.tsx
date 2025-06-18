import React, { useEffect, useRef } from 'react'
import './FlipGameBoard.scss'

class Confettiful {
	el: HTMLElement
	containerEl: HTMLDivElement | null = null
	confettiFrequency = 3
	confettiColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E', '#EFFF1D']
	confettiAnimations = ['slow', 'medium', 'fast']
	confettiInterval?: number

	constructor(el: HTMLElement) {
		this.el = el
		this._setupElements()
		this._renderConfetti()
	}

	_setupElements() {
		const containerEl = document.createElement('div')
		const elPosition = this.el.style.position
		if (elPosition !== 'relative' && elPosition !== 'absolute') {
			this.el.style.position = 'relative'
		}
		containerEl.classList.add('confetti-container')
		this.el.appendChild(containerEl)
		this.containerEl = containerEl
	}

	_renderConfetti() {
		this.confettiInterval = window.setInterval(() => {
			if (!this.containerEl) return
			const confettiEl = document.createElement('div')
			const confettiSize = `${Math.floor(Math.random() * 3) + 7}px`
			const confettiBackground =
				this.confettiColors[
					Math.floor(Math.random() * this.confettiColors.length)
				]
			const confettiLeft = `${Math.floor(Math.random() * this.el.offsetWidth)}px`
			const confettiAnimation =
				this.confettiAnimations[
					Math.floor(Math.random() * this.confettiAnimations.length)
				]

			confettiEl.classList.add(
				'confetti',
				`confetti--animation-${confettiAnimation}`,
			)
			confettiEl.style.left = confettiLeft
			confettiEl.style.width = confettiSize
			confettiEl.style.height = confettiSize
			confettiEl.style.backgroundColor = confettiBackground

			const timeout = window.setTimeout(() => {
				if (confettiEl.parentNode) {
					confettiEl.parentNode.removeChild(confettiEl)
				}
			}, 3000)
			;(confettiEl as any).removeTimeout = timeout

			this.containerEl.appendChild(confettiEl)
		}, 25)
	}

	destroy() {
		if (this.confettiInterval) {
			clearInterval(this.confettiInterval)
		}
		if (this.containerEl?.parentNode) {
			this.containerEl.parentNode.removeChild(this.containerEl)
		}
	}
}

export default function FlipGameFinished(): React.ReactElement {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (containerRef.current) {
			const confetti = new Confettiful(containerRef.current)
			return () => confetti.destroy()
		}
	}, [])

	return (
		<>
			<div className="finished-text">
				<div>
					<span>J</span>
					<span>u</span>
					<span>e</span>
					<span>g</span>
					<span>o</span>
					<br />
					<span>t</span>
					<span>e</span>
					<span>r</span>
					<span>m</span>
					<span>i</span>
					<span>n</span>
					<span>a</span>
					<span>d</span>
					<span>o</span>
				</div>
			</div>

			<div className="container-wrapper">
				<div ref={containerRef} className="js-container container-main" />
			</div>
		</>
	)
}
