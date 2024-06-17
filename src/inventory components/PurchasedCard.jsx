export default function PurchasedCard ({purchasedItem}) {

    return (
        <div className='item'>
            <img src={purchasedItem.item.path} alt={purchasedItem.item.title} className="itemImage grid-span-2"/>
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