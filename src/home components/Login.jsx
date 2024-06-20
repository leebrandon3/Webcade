import { useState } from "react"

export default function Login ({user, setCurrentUser}) {
    if(!user){

        const [signInData, setSignInData] = useState({
            "username": "",
            "password": ""
        })
    
        const [signUpData, setSignUpData] = useState({
            "username": "",
            "password": "",
            "age": ''
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
    
        function signInSubmit(event) {
            event.preventDefault()
    
            fetch('api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(signInData)
            })
            .then(res => {
                if (res.ok) {
                    res.json()
                    .then(user => setCurrentUser(user))
                }
                else {
                    alert('Invalid username or password')
                }
            })
        }
    
        function signUpSubmit(event) {
            event.preventDefault()
    
            fetch('api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(signUpData)
            })
            .then(res => {
                if (res.ok){
                    res.json()
                    .then(user => setCurrentUser(user))
                }
                else {
                    alert("Unsuccessful please try again. ")
                }
            })
        }

        return (
            <div className="loginContainer">
                <div className="form">
                    <h3>Login!</h3>
                    <form onSubmit={signInSubmit}>
                        {/* <label htmlFor="username">Username: </label> */}
                        <input 
                            type="text" 
                            name="username" 
                            value={signInData.username} 
                            onChange={handleSignIn}
                            placeholder="Enter your username"
                            className="userText"
                        />
                        {/* <label htmlFor="password">Password: </label> */}
                        <input 
                            type="password" 
                            name="password" 
                            value={signInData.password} 
                            onChange={handleSignIn} 
                            placeholder="Enter your password"
                            className="userText"
                        />
                        <div className="signinbutton">
                            <input 
                                type='submit' 
                                value='Sign in'
                                // className="signinbutton"
                            />
                        </div>
                    </form>
                </div>
                <div className="form">
                    <h3>New? Sign up here!</h3>
                    <form onSubmit={signUpSubmit}>
                        {/* <label htmlFor="username">Username: </label> */}
                        <input 
                            type="text" 
                            name="username" 
                            value={signUpData.username} 
                            onChange={handleSignUp}
                            placeholder="Create a username"
                            className="userText"
                        />
                        {/* <label htmlFor="password">Password: </label> */}
                        <input 
                            type="password" 
                            name="password" 
                            value={signUpData.password} 
                            onChange={handleSignUp} 
                            placeholder="Create a password"
                            className="userText"
                        />
                        <div className="age">
                            {/* <label htmlFor="age">Age: </label> */}
                            <input
                                type="number"
                                name="age"
                                value={signUpData.age}
                                onChange={handleSignUp} 
                                className="userAge"
                                placeholder="Age"
                                min='1'
                            />
                            <input 
                                type='submit' 
                                value='Sign up'
                            />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}