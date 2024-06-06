from app import app
from models import db, User, Sticker
from faker import Faker
from random import randint, choice

faker = Faker()

if __name__ == '__main__':
    with app.app_context():
        print("Seeding database...")
        
        User.query.delete()
        Sticker.query.delete()
        
        users = []
        
        for _ in range(0, 5):
            user = User(
                username = faker.name(),
                _hashed_password = "password123",
                age = randint(1, 50)
            )
            users.append(user)
        
        db.session.add_all(users)
        db.session.commit()
        
        print("Seeding complete!")