import { useState } from "react"
import { useOutletContext } from "react-router-dom"

function Home(){

    const [currentUser, setCurrentUser] = useOutletContext();

    const [signInData, setSignInData] = useState({
        "username": "",
        "password": ""
    })

    const [signUpData, setSignUpData] = useState({
        "username": "",
        "password": "",
        "age": 0
    })

    function handleSignIn(event) {
        setSignInData({...signInData, 
            [event.target.name]: event.target.value
        })
    }

    function handleSignUp(event) {
        setSignUpData({...signUpData, 
            [event.target.name]: event.target.value
        })
    }

    function handleSubmit(event) {
        event.preventDefault()

        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => {
            if (res.ok){
                res.json()
                .then( user => setCurrentUser(user))
            }
            else {
                alert("Unsuccessful please try again. ")
            }
        })
    }

    return (
        <>
            <h1>Welcome to WEBCADE!</h1>
            <div>
                <h3>Login!</h3>
                <form onSubmit={handleSubmit}>
                    <label for="username">Username: </label>
                    <input 
                        type="text" 
                        name="username" 
                        value={signInData.username} 
                        onChange={handleSignIn}
                    />
                    <br />
                    <label for="password">Password: </label>
                    <input 
                        type="password" 
                        name="password" 
                        value={signInData.password} 
                        onChange={handleSignIn} 
                    />
                    <input 
                        type='submit' 
                        value='Signup'
                    />
                </form>
            </div>
            <br />
            <div>
                <h3>New? Sign up here!</h3>
                <form onSubmit={handleSubmit}>
                    <label for="username">Username: </label>
                    <input 
                        type="text" 
                        name="username" 
                        value={signUpData.username} 
                        onChange={handleSignUp}
                    />
                    <br />
                    <label for="password">Password: </label>
                    <input 
                        type="password" 
                        name="password" 
                        value={signUpData.password} 
                        onChange={handleSignUp} 
                    />
                    <label for="age">Age: </label>
                    <input
                        type="number"
                        name="age"
                        value={signUpData.age}
                        onChange={handleSignUp} 
                    />
                    <input 
                        type='submit' 
                        value='Signup'
                    />
                </form>
            </div>
        </>
    )
}

export default Home