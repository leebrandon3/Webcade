import { useRef, useState } from 'react';
import { Link } from "react-router-dom"

function Game()
{
    

    return (
        <>
            <h3>Select a Game!</h3>
            <div id="game">
                {/* TODO Find a way to mad through all the games rather than listing them all one at a time */}
                <Link to={'/testgame'}>
                    <div>
                        <h5>Test Game</h5>
                        <image href='' />
                    </div>
                </Link>
            </div>
        </>
    )
}

export default Game
