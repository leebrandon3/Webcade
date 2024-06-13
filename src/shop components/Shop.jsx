import { useEffect,useState } from "react"
import ItemCard from "./ItemCard"

function Shop() {

    const [items, setItems] = useState([])

    useEffect(() => {
        fetch('api/items')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setItems(data)
        })
    }, [])

    return (
        <>
            {items.map(item => <ItemCard key={item.id} item={item}/>)}
        </>
    )
}

export default Shop