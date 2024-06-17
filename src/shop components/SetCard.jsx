import { useEffect,useState } from "react"
import ItemCard from "./ItemCard"

function SetCard({set}) {

    return (
        <div>
            <h3 className="white">{`The ${set.name} Set`}</h3>
            <div className="set">
                {set.items.map(item => <ItemCard key={item.id} item={item}/>)}
            </div>
        </div>
    )
}

export default SetCard