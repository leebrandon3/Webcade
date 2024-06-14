import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";
import '../public/arcadeCabinet.scss'

function App(){

    const [currentUser, setCurrentUser] = useState(null)

    return (
        <div className='container'>
            <h1 className="grid-col-span-3 title">WEBCADE</h1>
            <Navbar className='nav-component'/>
            <Outlet context={[currentUser, setCurrentUser]} className='screen-display'/>
        </div>
    )
}

export default App