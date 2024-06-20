import { useEffect,useState } from "react"
import { useOutletContext, Navigate } from "react-router-dom"
import SetCard from "./SetCard"

function Shop() {

    const [sets, setSets] = useState([])
    const [currentUser, setCurrentUser] = useOutletContext()
    function ReRoute () {
        if(currentUser == null) {
            alert('Please sign in!')
            return (<Navigate to='/' />)
            
        }
    }

    useEffect(() => {
        fetch('api/sets')
        .then(res => res.json())
        .then(data => {
            setSets(data)
        })
        fetch('/api/check-session')
        .then(res => res.json())
        .then(data => {
            setCurrentUser(data)
        })
    }, [])

    return (
        <div className="set-container">
            <ReRoute />
            {sets.map(set => <SetCard key={set.id} set={set} user={currentUser}/>)}
        </div>
    )
}

export default Shop