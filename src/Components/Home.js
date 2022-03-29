import React from "react"
import Footer from "./Footer"
import Game from "./Game/Index"

function Home() {
	return (
		<div>
			<div className="title">Welcome to Memory Game</div>
			<Game />
			<Footer />
		</div>
	)
}

export default Home
