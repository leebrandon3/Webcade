import { useEffect, useState } from "react";
import InvSetCard from "./InvSetCard";
import { useOutletContext, Navigate } from "react-router-dom"

function Inventory() {
    const [sets, setSets] = useState([])
    const [currentUser, setCurrentUser] = useOutletContext()
    function ReRoute () {
        if(currentUser == null) {
            alert('Please sign in!')
            return (<Navigate to='/' />)
            
        }
    }

    useEffect(() => {
        fetch('/api/purchase')
        .then(res => res.json())
        .then(data => {
            setSets(data)
        })
    }, [])

    return (
        <div className="set-container">
            <ReRoute />
            {sets.map(set => <InvSetCard key={set.id} set={set}/>)}
        </div>
    )
}

export default Inventory