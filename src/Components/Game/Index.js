import React, {useState, useEffect, useRef} from "react"
import Cards from "../../DesignComponents/Cards"
import Score from "../Score"
import "./Game.css"

function Game() {
	let data = [
		{title: "A"},
		{title: "B"},
		{title: "C"},
		{title: "D"},
		{title: "E"},
		{title: "F"},
		{title: "G"},
		{title: "H"},
	]
	const shuffleCards = (array) => {
		// Durstenfeld shuffle
		const length = array.length
		for (let i = length; i > 0; i--) {
			const randomIndex = Math.floor(Math.random() * i)
			const currentIndex = i - 1
			const temp = array[currentIndex]
			array[currentIndex] = array[randomIndex]
			array[randomIndex] = temp
		}
		return array
	}

	const [cards, setCards] = useState(shuffleCards.bind(null, data.concat(data)))
	const [openCards, setOpenCards] = useState([])
	const [matchedCards, setMatchedCards] = useState({})
	const [moves, setMoves] = useState(0)
	const [matches, setMatches] = useState(0)
	const timeout = useRef(null)

	const evaluate = () => {
		const [first, second] = openCards
		if (cards[first].title === cards[second].title) {
			setMatchedCards((prev) => ({...prev, [cards[first].title]: true}))
			setOpenCards([])
			setMatches((prev) => prev + 1)
			return
		}
		timeout.current = setTimeout(() => {
			setOpenCards([])
		}, 500)
	}

	const handleCardClick = (index) => {
		if (openCards.length === 1) {
			setOpenCards((prev) => [...prev, index])
			setMoves((moves) => moves + 1)
		} else {
			clearTimeout(timeout.current)
			setOpenCards([index])
		}
	}

	const checkCompletion = () => {
		if (Object.keys(matchedCards).length === data.length) {
			setTimeout(() => {
				window.alert(`Game Complete. You took ${moves} moves to finish the game.`)
				handleRestart()
			}, 300)
		}
	}

	useEffect(() => {
		let timeout = null
		if (openCards.length === 2) {
			timeout = setTimeout(evaluate, 300)
		}
		return () => {
			clearTimeout(timeout)
		}
	}, [openCards])

	const checkIsFlipped = (index) => {
		return openCards.includes(index)
	}

	const checkIsInactive = (card) => {
		return Boolean(matchedCards[card.title])
	}

	const handleRestart = () => {
		if (window.confirm("You want to reset the game?")) {
			setMatchedCards({})
			setOpenCards([])
			setMoves(0)
			setMatches(0)
			setCards(shuffleCards(data.concat(data)))
		}
	}

	useEffect(() => {
		const unloadCallback = (event) => {
			event.preventDefault()
			event.returnValue = "are you sure you want to leave?"
			return ""
		}

		window.addEventListener("beforeunload", unloadCallback)
		return () => window.removeEventListener("beforeunload", unloadCallback)
	}, [openCards])

	useEffect(() => {
		checkCompletion()
	}, [matchedCards])

	return (
		<div>
			<div className="game-container">
				<Score moves={moves} matches={matches} />
				<div className="cards">
					{cards.map((card, index) => (
						<Cards
							key={index}
							card={card}
							index={index}
							isInactive={checkIsInactive(card)}
							isFlipped={checkIsFlipped(index)}
							onClick={handleCardClick}
						/>
					))}
				</div>
			</div>
			<div onClick={handleRestart}>
				<button className="button">RESET</button>
			</div>
		</div>
	)
}

export default Game
