import { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useOutletContext } from 'react-router-dom'

function Casino() {
    const [currentUser, setCurrentUser] = useOutletContext()
    function ReRoute () {
        if(currentUser == null) {
            alert('Please sign in!')
            return (<Navigate to='/' />)
            
        }
        else if (currentUser.age < 18){
            alert('Must be 18 years or older to play!')
            return (<Navigate to='/' />)
        }
    }

    return (
        <>
            <ReRoute />
            <h3 className='white'>Welcome to the Casino!</h3>
            <div className='selectGame'>
                <Link to={'/blackjack'} className='game'>
                    <div>
                        <img className='gameImage' src='../public/assets/gameImages/blackjackimg.png' />
                        <h5>Blackjack</h5>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default Casino