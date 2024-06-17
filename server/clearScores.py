from app import app
from models import db, Score

if __name__ == '__main__':
    with app.app_context():
        
        Score.query.delete()
        db.session.commit()
        
        print("Deleted all scores")