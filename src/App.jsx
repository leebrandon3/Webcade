import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useState } from "react";

function App(){

    const [currentUser, setCurrentUser] = useState(null)

    return (
        <>
            <Navbar />
            <Outlet context={[currentUser, setCurrentUser]}/>
        </>
    )
}

export default App