import { useEffect,useState } from "react"
import ItemCard from "./ItemCard"
import { useOutletContext, Navigate } from "react-router-dom"

function Shop() {

    const [items, setItems] = useState([])
    const [currentUser, setCurrentUser] = useOutletContext()
    function ReRoute () {
        if(currentUser == null) {
            alert('Please sign in!')
            return (<Navigate to='/' />)
            
        }
    }

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
            <ReRoute />
            {items.map(item => <ItemCard key={item.id} item={item}/>)}
        </>
    )
}

export default Shop