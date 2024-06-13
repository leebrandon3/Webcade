export default function ItemCard ({item}) {

    async function handleClick() {
        try {
            const res = await fetch('api/purchase', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    'item_id': item.id,
                    'cost': item.price
                })
            })
            const data = await res.json()
            alert (`${data.item.title} purchased!`)
        }
        catch {
            alert('An error has occured sorry!')
        }
    }

    return (
        <div>
            <img src={item.path} alt={item.title}/>
            <h5>{item.title}</h5>
            <p>{item.price}</p>
            <button onClick={handleClick}>Buy</button>
        </div>
    )
}