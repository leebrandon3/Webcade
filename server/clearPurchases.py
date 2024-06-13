from app import app
from models import db,Purchase

if __name__ == '__main__':
    with app.app_context():
        
        Purchase.query.delete()
        db.session.commit()
        
        print("Deleted purchases")