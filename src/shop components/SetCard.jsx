import { useEffect,useState } from "react"
import ItemCard from "./ItemCard"

function SetCard({set, user}) {

    return (
        <div>
            <h3 className="white">{`The ${set.name} Set`}</h3>
            <div className="set">
                {set.items.map(item => <ItemCard key={item.id} item={item} user={user}/>)}
            </div>
        </div>
    )
}

export default SetCard