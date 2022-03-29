import React from "react"
import "./Card.css"

function Cards({onClick, card, index, isInactive, isFlipped}) {
	const handleClick = (index) => {
		!isFlipped && onClick(index)
	}

	return (
		<div>
			{!isInactive && (
				<div
					key={index}
					className={`card-container ${isFlipped ? "rotated" : ""}`}
					onClick={() => handleClick(index)}>
					{isFlipped ? (
						<div className="front">{card.title}</div>
					) : (
						<div className="back"></div>
					)}
				</div>
			)}
		</div>
	)
}

export default Cards
