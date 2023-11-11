from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
class Catalogo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    image = db.Column(db.String)
    
    def __repr__(self):
        return f'<Catalogo {self.name}>'
      
    def serialize(self):
        return {
            "name": self.name,
            "image": self.image
        }
    
class Procedimientos(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String)
    name = db.Column(db.String(80), unique=False, nullable=False)
    descripcion = db.Column(db.String(500), unique=False, nullable=False)
    articulos = db.Column(db.String(80), unique=False, nullable=False)
    video = db.Column(db.String)
    
    def __repr__(self):
        return f'<Procedimientos {self.name}>'
      
    def serialize(self):
        return {
            "name": self.name,
            "image": self.image,
            "descripcion": self.descripcion,
            "articulos": self.articulos,
            "video": self.video,
        }