import React from "react"
import "./Score.css"

function Score({moves, matches}) {
	return (
		<div className="score-container">
			<h3>{`Matches : ${matches}`}</h3>
			<h3>{`Moves: ${moves}`}</h3>
		</div>
	)
}

export default Score
