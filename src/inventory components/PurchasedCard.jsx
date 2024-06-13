export default function PurchasedCard ({purchasedItem}) {

    return (
        <div>
            <img src={purchasedItem.item.path} alt={purchasedItem.item.title}/>
            <h5>{purchasedItem.item.title}</h5>
            <a
            href={purchasedItem.item.path}
            download={purchasedItem.item.title}
            >
                <button>Download</button>
            </a>
        </div>
    )
}