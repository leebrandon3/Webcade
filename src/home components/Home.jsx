import { useEffect, useState } from "react"
import { useOutletContext } from "react-router-dom"
import Login from "./Login";
import SignedIn from "./SignedIn";

function Home(){

    const [currentUser, setCurrentUser] = useOutletContext();

    // useEffect(() => {

    // }, [currentUser.points])

    return (
        <>
            <h1>Welcome {currentUser ? `${currentUser.username}!` : 'to WEBCADE!'}</h1>
            <SignedIn user={currentUser} setCurrentUser={setCurrentUser}/>
            <Login user={currentUser} setCurrentUser={setCurrentUser}/>
        </>
    )
}

export default Home