import { useEffect, useRef, useState } from 'react';
import { Link, useOutletContext, Navigate } from "react-router-dom"

function Game()
{
    const [currentUser, setCurrentUser] = useOutletContext()

    const [globalScore, setGlobalScore] = useState({
        username: '',
        score: 0
    })
    const [userScore, setUserScore] = useState(0)

    function ReRoute () {
        if(currentUser == null) {
            alert('Please sign in!')
            return (<Navigate to='/' />)
            
        }
    }

    useEffect(() => {
        fetch('/api/score')
        .then(res => res.json())
        .then(data => {
            let flappyBirdScores = data.filter(score => score.game == 'flappybird')
            let currentUserScore = 0 
            let currentGlobalScore = 0
            let currentGlobalUsername
            flappyBirdScores.forEach(score => {
                if (score.user_id == currentUser.id){
                    console.log(currentUserScore, score.score)
                    if (currentUserScore < score.score) {
                        currentUserScore = score.score
                    }
                }
                if (currentGlobalScore < score.score) {
                    currentGlobalScore = score.score
                    currentGlobalUsername = score.user.username
                    console.log(score.user.username)
                }
            })
            setUserScore(currentUserScore)
            setGlobalScore({
                username: currentGlobalUsername,
                score: currentGlobalScore
            })
        })
    }, [])


    return (
        <>
            <ReRoute />
            <h3 className='white'>Select a Game!</h3>
            <div className='selectGame'>
                <Link to={'/testgame'} className='game'>
                    <div>
                        <h5>Test Game</h5>
                    </div>
                </Link>
                <Link to={'/flappybird'} className='game'>
                    <div>
                        <h5>Flappy Bird</h5>
                        {/* TODO add image of game 
                        TODO Display high score & users high score*/}
                        <img className='gameImage' src='../public/assets/gameImages/flappybird.jpg' />
                        <p>--Global High Score--</p>
                        <p>{`${globalScore.username}: ${globalScore.score}`}</p>
                        <p>--Your High Score--</p>
                        <p>{userScore}</p>
                    </div>
                </Link>
                <Link to={'/testarcade'} className='game'>
                    <div>
                        <h5>Arcade</h5>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default Game
