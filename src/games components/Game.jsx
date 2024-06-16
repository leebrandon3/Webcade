import { useRef, useState } from 'react';
import { Link, useOutletContext, Navigate } from "react-router-dom"

function Game()
{
    const [currentUser, setCurrentUser] = useOutletContext()
    function ReRoute () {
        if(currentUser == null) {
            alert('Please sign in!')
            return (<Navigate to='/' />)
            
        }
    }

    return (
        <>
            <ReRoute />
            <h3>Select a Game!</h3>
            <div id="game">
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
