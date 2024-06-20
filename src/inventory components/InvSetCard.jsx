import PurchasedCard from "./PurchasedCard"

function InvSetCard({set}) {

    return (
        <div>
            <h3 className="white">{`The ${set[0]['item']['set']['name']} Set`}</h3>
            <div className="set">
                {set.map(purchasedItem => <PurchasedCard key={purchasedItem.id} purchasedItem={purchasedItem}/>)}
            </div>
        </div>
    )
}

export default InvSetCard