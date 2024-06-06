from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class User(db.Model, SerializerMixin):
    
    __tablename__ = 'users_table'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _hashed_password = db.Column(db.String)
    age = db.Column(db.Integer, nullable=False)
    points = db.Column(db.Integer, default=0)
    stickers = db.relationship('Sticker', back_populates='user')
    
    serialize_rules = ['-stickers.user']

class Sticker(db.Model, SerializerMixin):
    
    __tablename__ = 'stickers_table'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    img_url = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    user = db.relationship('User', back_populates='stickers')
    
    serialize_rules = ['-user.stickers']