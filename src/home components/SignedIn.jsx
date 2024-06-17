import { useEffect, useState } from "react"

export default function SignedIn ({user, setCurrentUser}) {

    const [points, setPoints] = useState(-10000)

    useEffect(() => {
        fetch('/api/check-session')
        .then(res => {
            if (res.ok){
                res.json()
                .then(data => {
                    console.log(data)
                    setPoints(data.points)
                })
            }
        })

    })

    function handleLogOut () {
        setCurrentUser(null)
        fetch('/api/logout', 
            {method: 'DELETE'}
        )
    }

    if(user) {
        return (
            <>
                <h4 className="white">You have {points} coins!</h4>
                <button onClick={handleLogOut}>Log out</button>
            </>
        )
    }
}