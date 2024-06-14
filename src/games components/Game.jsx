import { useRef, useState } from 'react';
import { Link } from "react-router-dom"

function Game()
{

    return (
        <div className='arcade-machine'>
            <div className='shadow'>
            </div>
            <div className='top'>
                <div className='stripes'>
                </div>
            </div>
            <div className='screen-container'>
                <div className='shadow'>
                </div>
                <div className='screen'>

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

                </div>
                <div className='joystick'>
                    <div className='stick'>
                    </div>
                </div>
            </div>
            <div className='board'>
                <div className='button button-a'>
                </div>
                <div className='button button-b'>
                </div>
                <div className='button button-c'>
                </div>
            </div>
            <div className='bottom'>
                <div className='stripes'>
                </div>
            </div>
        </div>
    )
}

export default Game
