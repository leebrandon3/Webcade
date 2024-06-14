import { Link } from 'react-router-dom'
import { useRef } from 'react'

export default function CasinoNav () {
    return (
        <>
            <h3>Casino!</h3>
            <Link to={'/casino/blackjack'}>
                <div>
                    <h5>Blackjack</h5>
                </div>
            </Link>
        </>
    )
}