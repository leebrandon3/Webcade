import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

function Casino() {
    return (
        <>
            <h3>Casino!</h3>
            <div id="casino">
                <Link to={'/blackjack'}>
                    <div>
                        <h5>Blackjack</h5>
                    </div>
                </Link>
            </div>
        </>
    )
}

export default Casino