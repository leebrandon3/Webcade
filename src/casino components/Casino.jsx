import { useRef, useState } from 'react'
import { Outlet } from "react-router-dom"

function Casino() {
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
                <div className='screen' id='casino'>

                    <Outlet className='screen-display'/>

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

export default Casino