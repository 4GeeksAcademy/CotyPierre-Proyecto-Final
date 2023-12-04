from flask_sqlalchemy import SQLAlchemy
import base64

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), unique=False, nullable=False)
    phone = db.Column(db.String(15), unique=True, nullable=False)
    adress = db.Column(db.String(120), unique=False, nullable=False)
    country = db.Column(db.String(50), unique=False, nullable=False)
    department = db.Column(db.String(50), unique=False, nullable=False)
    photo = db.Column(db.Text, unique=False, nullable=True)
    rol = db.Column(db.String(13), unique=False, nullable=False)
    professional_grade = db.Column(db.String(30), unique=False, nullable=False)
    workplace = db.Column(db.String(50), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
   

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        serialized_data = {
            "id": self.id,
            "name": self.name,
            "phone": self.phone,
            "adress": self.adress,
            "country": self.country,
            "department": self.department,
            "rol": self.rol,
            "photo": self.photo,
            "professional_grade": self.professional_grade,
            "workplace": self.workplace,
            "email": self.email,
            "is_active": self.is_active
        }

        return serialized_data

    
class Usuario (db.Model):
    __tablename__ = 'usuario'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    password = db.Column(db.String(20), unique=False, nullable=False)
    degree = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(500), unique=False, nullable=False)
    url_img = db.Column(db.String(250), unique=False, nullable=False)
    idu_img = db.Column(db.String(250), unique=False, nullable=False)
    num_contact = db.Column(db.String(250), unique=False, nullable=False)


    def __repr__(self):
        return f'<Restaurant {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "degree": self.degree,
            "url_img": self.url_img,
            "idu_img": self.idu_img,
            "num_contact": self.num_contact
        }
    
class Catalogo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    image = db.Column(db.String)
    
    def __repr__(self):
        return f'<Catalogo {self.name}>'
      
    def serialize(self):
        return {
            "id": self.id,
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
            "id": self.id,
            "name": self.name,
            "image": self.image,
            "descripcion": self.descripcion,
            "articulos": self.articulos,
            "video": self.video,
        }
    
#test