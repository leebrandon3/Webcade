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
            console.log(data)
            setSets(data)
        })
    }, [])

    return (
        <>
            <ReRoute />
            {sets.map(set => <SetCard key={set.id} set={set}/>)}
        </>
    )
}

export default Shop