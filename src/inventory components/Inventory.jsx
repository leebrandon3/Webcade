import { useEffect, useState } from "react";
import PurchasedCard from "./PurchasedCard";
import { useOutletContext, Navigate } from "react-router-dom"

function Inventory() {
    const [purchases, setPurchases] = useState([])
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
            console.log(data)
            setPurchases(data)
        })
    }, [])

    return (
        <div className="set">
            <ReRoute />
            {purchases.map(purchasedItem => <PurchasedCard key={purchasedItem.id} purchasedItem={purchasedItem}/>)}
        </div>
    )
}

export default Inventory