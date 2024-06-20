export default function ItemCard ({item, user}) {

    async function handleClick() {
        try {
            console.log(`user points:${user} AND cost: ${item.price}`)
            if (user.points < item.price) {
                alert('Not enough coins in your account!')
            }
            else {
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
        }
        catch {
            alert('An error has occured sorry!')
        }
    }

    return (
        <div className="item">
            <img src={item.path} alt={item.title} className="itemImage grid-span-2"/>
            <h5>{item.title}</h5>
            <button onClick={handleClick} className="coin-button">
                <img className='coin' src="../public/assets/CSS/coin.png" alt="coin"/>
                {`x${item.price}`}
            </button>
        </div>
    )
}