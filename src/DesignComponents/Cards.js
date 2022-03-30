import React from "react"
import "./Card.css"

function Cards({onClick, card, index, isInactive, isFlipped}) {
	const handleClick = (index) => {
		!isFlipped && onClick(index)
	}

	return (
		<div
			key={index}
			className={`card-container ${isFlipped ? "rotated" : ""} ${
				isInactive ? "inactive" : ""
			}`}
			onClick={() => handleClick(index)}>
			{isFlipped ? (
				<div className="front">{card.title}</div>
			) : (
				<div className="back"></div>
			)}
		</div>
	)
}

export default Cards
