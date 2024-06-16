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
                <div className="login">
                    <h3>Login!</h3>
                    <form onSubmit={signInSubmit}>
                        <label htmlFor="username">Username: </label>
                        <input 
                            type="text" 
                            name="username" 
                            value={signInData.username} 
                            onChange={handleSignIn}
                        />
                        <br />
                        <label htmlFor="password">Password: </label>
                        <input 
                            type="password" 
                            name="password" 
                            value={signInData.password} 
                            onChange={handleSignIn} 
                        />
                        <input 
                            type='submit' 
                            value='Sign in'
                        />
                    </form>
                </div>
                <div className="signup">
                    <h3>New? Sign up here!</h3>
                    <form onSubmit={signUpSubmit}>
                        <label htmlFor="username">Username: </label>
                        <input 
                            type="text" 
                            name="username" 
                            value={signUpData.username} 
                            onChange={handleSignUp}
                        />
                        <br />
                        <label htmlFor="password">Password: </label>
                        <input 
                            type="password" 
                            name="password" 
                            value={signUpData.password} 
                            onChange={handleSignUp} 
                        />
                        <br />
                        <label htmlFor="age">Age: </label>
                        <input
                            type="number"
                            name="age"
                            value={signUpData.age}
                            onChange={handleSignUp} 
                        />
                        <input 
                            type='submit' 
                            value='Sign up'
                        />
                    </form>
                </div>
            </div>
        )
    }
}