import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import '../public/arcadeCabinet.scss'

function App(){

    const [currentUser, setCurrentUser] = useState(null)

    return (
        <div className='container'>
            {/* <h1 className="grid-col-span-3 title">WEBCADE</h1> */}
            <Navbar className='nav-component' currentUser={currentUser}/>
            <div className='arcade-machine'>
                <div className='shadow'>
                </div>
                <div className='top'>
                    <div className='stripes'>
                    </div>
                    <h1 className="title halo">webcade</h1>
                </div>
                <div className='screen-container'>
                    <div className='shadow'>
                    </div>
                    <div className='screen'>
                        <div className="screen-display">
                        </div>
                        <div className="content">
                            <Outlet context={[currentUser, setCurrentUser]}/>
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
        </div>
    )
}

export default App