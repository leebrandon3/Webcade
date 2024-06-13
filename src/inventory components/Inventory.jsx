import { useEffect, useState } from "react";
import PurchasedCard from "./PurchasedCard";

function Inventory() {
    const [purchases, setPurchases] = useState([])

    useEffect(() => {
        fetch('/api/purchase')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setPurchases(data)
        })
    }, [])

    return (
        <>
            {purchases.map(purchasedItem => <PurchasedCard key={purchasedItem.id} purchasedItem={purchasedItem}/>)}
        </>
    )
}

export default Inventory