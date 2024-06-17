from app import app
from models import db, Item, Set


if __name__ == '__main__':
    with app.app_context():
        print("Loading items in database...")
        
        Set.query.delete()
        sets = []
        
        Item.query.delete()
        items = []
        
        s0 = Set(
            name = 'Gudetama'
        )
        sets.append(s0)
        
        s1 = Set(
            name = 'League of Legends'
        )
        sets.append(s1)
        
        db.session.add_all(sets)
        db.session.commit()
        
        # loads
        #-----------------------GUDETAMA----------------------
        i0 = Item(
            title = 'Gudetama Thinking',
            path = 'public/assets/Shop/GudetamaPack/gudetama-1.png',
            price = 10,
            set_id = 1
        )
        items.append(i0)
        i1 = Item(
            title = 'Gudetama Bye',
            path = 'public/assets/Shop/GudetamaPack/gudetama-2.png',
            price = 10,
            set_id = 1
        )
        items.append(i1)
        i2 = Item(
            title = 'Gudetama Sleeping',
            path = 'public/assets/Shop/GudetamaPack/gudetama-3.png',
            price = 10,
            set_id = 1
        )
        items.append(i2)
        
        #-----------------------LEAGUE OF LEGENDS----------------------
        i3 = Item(
            title = 'Ahri',
            path = 'public/assets/Shop/LeagueOfLegends/ahri.png',
            price = 10,
            set_id = 2
        )
        items.append(i3)
        i4 = Item(
            title = 'Amumu',
            path = 'public/assets/Shop/LeagueOfLegends/amumu.png',
            price = 10,
            set_id = 2
        )
        items.append(i4)
        i5 = Item(
            title = 'Fizz',
            path = 'public/assets/Shop/LeagueOfLegends/fizz.png',
            price = 10,
            set_id = 2
        )
        items.append(i5)
        i6 = Item(
            title = 'Sona',
            path = 'public/assets/Shop/LeagueOfLegends/sona.png',
            price = 10,
            set_id = 2
        )
        items.append(i6)
        i7 = Item(
            title = 'Soraka',
            path = 'public/assets/Shop/LeagueOfLegends/soraka.png',
            price = 10,
            set_id = 2
        )
        items.append(i7)
        i8 = Item(
            title = 'Yasuo',
            path = 'public/assets/Shop/LeagueOfLegends/yasuo.png',
            price = 10,
            set_id = 2
        )
        items.append(i8)
        
        db.session.add_all(items)
        db.session.commit()
        
        print("Loading complete!")