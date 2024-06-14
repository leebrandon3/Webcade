import { useRef, useState } from 'react';
import { Link } from "react-router-dom"

function Game()
{

    return (
        <>
            <h3>Select a Game!</h3>
            <div id="game">
                {/* TODO Find a way to map through all the games rather than listing them all one at a time */}
                <Link to={'/testgame'}>
                    <div>
                        <h5>Test Game</h5>
                    </div>
                </Link>
                <Link to={'/flappybird'}>
                    <div>
                        <h5>Flappy Bird</h5>
                    </div>
                </Link>
                <Link to={'/testarcade'}>
                    <div>
                        <h5>Arcade</h5>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default Game
