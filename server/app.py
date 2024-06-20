import os
from flask_bcrypt import Bcrypt
from flask import Flask, request, jsonify, session, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy import and_, func

from models import db, User, Item, Purchase, Score, Set

from dotenv import load_dotenv

load_dotenv()

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../dist',
    template_folder='../dist'
)
app.secret_key = os.environ.get('SECRET_KEY')
if os.environ.get('ENV') == 'prod':
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('POSTGRES_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)

bcrypt = Bcrypt(app)

migrate = Migrate(app, db)

db.init_app(app)

@app.errorhandler(404)
def not_found(e):
    return render_template("index.html")

######################### USER ############################

# Signup
@app.post('/api/users')
def create_user():
    print(User)
    try:
        new_user = User(
            username=request.json.get("username"),
            age=request.json.get('age')
            )
        new_user._hashed_password = bcrypt.generate_password_hash(request.json['password']).decode('utf=8')
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id
        return new_user.to_dict(), 201
    except Exception as e:
        return {'error': str(e)}, 406

# Check session
@app.get('/api/check-session')
def check_session():
    user = User.query.where(User.id == session['user_id']).first()
    if user:
        return user.to_dict(), 200
    else:
        return {}, 204

# Session login
@app.post('/api/login')
def login():
    print("attempted login")
    user = User.query.where(User.username == request.json.get('username')).first()
    if user and bcrypt.check_password_hash(user._hashed_password, request.json.get('password')):
        session['user_id'] = user.id
        return user.to_dict(), 201
    else:
        return {'error': 'Username or password was invalid'}, 401

# Session logout
@app.delete('/api/logout')
def logout():
    session.pop('user_id')
    return {}, 204

######################### POINTS ############################

# Update users points
@app.patch('/api/points')
def update_points():
    user = User.query.where(User.id == session.get('user_id')).first()
    if user:
        if request.json.get('points') != None:
            print("------------------------------------------------------------------")
            print(request.json.get('points'))
            print("------------------------------------------------------------------")
            setattr(user, 'points', request.json.get('points'))
            db.session.add(user)
            db.session.commit()
            return user.to_dict(), 201
    else:
        return {}, 204

######################### SCORES ############################

# Post new score
@app.post('/api/score')
def post_score():
    user = User.query.where(User.id == session.get('user_id')).first()
    if user:
        new_score = Score(
            game = request.json.get('game'),
            score = request.json.get('score'),
            user_id = user.id
        )
        if new_score:
            db.session.add(new_score)
            db.session.commit()
            return new_score.to_dict(), 201
        else:
            return {'error': 'Could not post new score'}, 404
    else:
        return {'error': 'User not found'}, 404

# Get all scores
@app.get('/api/score')
def get_all_scores():
    scores = Score.query.all()
    return [score.to_dict() for score in scores], 200

######################### ITEMS ############################

# Get Shop sets
@app.get('/api/sets')
def get_all_sets():
    all_sets = Set.query.all()
    return [set.to_dict() for set in all_sets], 200

# Purchase item
@app.post('/api/purchase')
def purchase_item():
    user = User.query.where(User.id == session.get('user_id')).first()
    if user:
        already_purchased = Purchase.query.where(
            and_(Purchase.user_id == session.get('user_id'),
                Purchase.item_id == request.json.get('item_id')
            )).first()
        print(already_purchased)
        
        if (already_purchased == None):
            print("creating purchase")
            purchased_item = Purchase(
                user_id=session.get('user_id'),
                item_id=request.json.get('item_id')
            )
            db.session.add(purchased_item)
            db.session.commit()
            
            user.points -= request.json.get('cost')
            db.session.add(user)
            db.session.commit()
            
            return purchased_item.to_dict(), 201
        else:
            return {'error': 'Already Purchased!'}, 400

######################### INVENTORY ############################

# Get all users items
@app.get('/api/purchase')
def get_all_users_items():
    user = User.query.where(User.id == session.get('user_id')).first()
    if user:
        itemList = [item.to_dict() for item in Purchase.query.where(Purchase.user_id == session.get('user_id'))]
        itemList.sort(key=lambda item: item['item']['set']['id'])
        orderedList = [[]]
        index = 0
        # print(itemList[0])
        for i in range(len(itemList)):
            if i == 0:
                # print('-----------------------------------------------')
                orderedList[0].append(itemList[0])
            else:
                # print(orderedList[index][0])
                if orderedList[index][0]['item']['set']['id'] == itemList[i]['item']['set']['id']:
                    orderedList[index].append(itemList[i])
                else:
                    index = index + 1
                    orderedList.append([itemList[i]])
        return orderedList, 200

if __name__ == '__main__':
    app.run(port=8080, debug=True)