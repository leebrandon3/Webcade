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
    purchases = db.relationship('Purchase', back_populates='user')
    scores = db.relationship('Score', back_populates='user')
    
    serialize_rules = ['-purchases.user', '-scores.user']

class Item(db.Model, SerializerMixin):
    
    __tablename__ = 'items_table'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    path = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer)
    
    purchases = db.relationship('Purchase', back_populates='item')
    set_id = db.Column(db.Integer, db.ForeignKey('set_table.id'))
    set = db.relationship('Set', back_populates='items')
    
    serialize_rules = ['-purchases.item']

class Purchase(db.Model, SerializerMixin):
    
    __tablename__ = 'purchase_table'
    
    id = db.Column(db.Integer, primary_key=True)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    user = db.relationship('User', back_populates='purchases')
    item_id = db.Column(db.Integer, db.ForeignKey('items_table.id'))
    item = db.relationship('Item', back_populates='purchases')
    
    serialize_rules = ['-user.purchases', '-item.purchases']

class Set(db.Model, SerializerMixin):
    
    __tablename__ = 'set_table'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    items = db.relationship('Item', back_populates='set')
    
    serialize_rules = ['-items.set']
    

class Score(db.Model, SerializerMixin):
    
    __tablename__ = 'score_table'
    
    id = db.Column(db.Integer, primary_key=True)
    game = db.Column(db.String)
    score = db.Column(db.Integer)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users_table.id'))
    user = db.relationship('User', back_populates='scores')
    
    serialize_rules = ['-user.scores']