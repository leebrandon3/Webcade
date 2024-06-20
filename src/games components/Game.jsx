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
                    if (currentUserScore < score.score) {
                        currentUserScore = score.score
                    }
                }
                if (currentGlobalScore < score.score) {
                    currentGlobalScore = score.score
                    currentGlobalUsername = score.user.username
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
                <Link to={'/flappybird'} className='game'>
                    <img className='gameImage' src='../public/assets/gameImages/flappybird.jpg' />
                    <div className='game-info'>
                        <h3>Flappy Bird</h3>
                        <div className='score-div'>
                            <p>Global High Score</p>
                            <p>{`${globalScore.username}: ${globalScore.score}`}</p>
                        </div>
                        <div className='divider'/>
                        <div className='score-div'>
                            <p>Your High Score</p>
                            <p>{userScore}</p>
                        </div>
                    </div>
                </Link>
                <Link to={'/testgame'} className='game'>
                    <h5>Test Game</h5>
                </Link>
            </div>
        </>
    )
}

export default Game
