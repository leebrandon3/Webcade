from app import app
from models import db, Item


if __name__ == '__main__':
    with app.app_context():
        print("Loading items in database...")
        
        Item.query.delete()
        items = []
        
        # loads
        i0 = Item(
            title = 'Gudetama Thinking',
            path = 'public/assets/Shop/GudetamaPack/gudetama-1.jpeg',
            price = 10
        )
        items.append(i0)
        i1 = Item(
            title = 'Gudetama Cheering',
            path = 'public/assets/Shop/GudetamaPack/gudetama-2.jpeg',
            price = 10
        )
        items.append(i1)
        i2 = Item(
            title = 'Gudetama Laying',
            path = 'public/assets/Shop/GudetamaPack/gudetama-3.png',
            price = 10
        )
        items.append(i2)
        
        
        db.session.add_all(items)
        db.session.commit()
        
        print("Loading complete!")