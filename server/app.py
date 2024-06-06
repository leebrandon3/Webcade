import os
from flask_bcrypt import Bcrypt
from flask import Flask, request, jsonify, session, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

from models import db, User, Sticker

from dotenv import load_dotenv

load_dotenv()

app = Flask(
    __name__,
    static_url_path='',
    static_folder='../dist',
    template_folder='../dist'
)
app.secret_key = os.environ.get('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('POSTGRES_URL')
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
    try:
        new_user = User(
            username=request.json['username'],
            age=request.json['age']
            )
        new_user._hashed_password = bcrypt.generate_password_hash(request.json['password']).decode('utf=8')
        db.session.add(new_user)
        db.session.commit()
        session['user-id'] = new_user.id
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

if __name__ == '__main__':
    app.run(port=8080, debug=True)