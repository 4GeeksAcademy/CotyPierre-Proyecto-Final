"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Catalogo, Procedimientos, Usuario
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import base64

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api, resources={r"/*": {"origins": "*"}})


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/register", methods=["POST"])
def post_register():
    body = request.json
    user = User.query.filter_by(email=body['email']).first()
    
    if user:
        return jsonify({"msg": "Usuario ya existe"}), 401

    if 'photo' in body: 
        try:
            photo_data = base64.b64decode(body['photo'])
        except:
            return jsonify({"msg": "Imagen inválida, intente nuevamente"}), 500

    new_user = User(
        email=body['email'],
        password=body["password"],
        name=body.get('name'),
        phone=body.get('phone'),
        adress=body.get('address'),
        country=body.get('country'),
        department=body.get('department'),
        photo=photo_data,
        rol=body.get('rol'),
        professional_grade=body.get('professionalGrade'),
        workplace=body.get('workplace'),
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()
 
    return jsonify({"msg": "Usuario creado"}), 200


@api.route("/login", methods=["POST"])
def post_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"msg": "Bad username or password"}), 401

    access_token = create_access_token(identity=user.id, additional_claims={"rol": user.rol})
    return jsonify({ "token": access_token, "user_id": user.id })


@api.route('/usuario', methods=['GET'])
def get_usuario():
    all_usuario = Usuario.query.all()
    Usuario_seriallize = list (map(lambda usuario: usuario.serialize(),all_usuario))

    return jsonify(Usuario_seriallize), 200

@api.route('/usuario/<int:id>', methods=['PUT'])
def put_usuario(id):
    usuario = Usuario.query.get(id)
    body = request.json

    if not usuario:
        return jsonify({"message": "Usuario no encontrado"}), 404
    
    usuario.name = body["name"]
    usuario.degree = body["degree"]
    usuario.description = body["description"]
    usuario.url_img = body["url_img"]
    usuario.idu_img = body["idu_img"]
    usuario.num_contact = body["num_contact"]
    
    db.session.commit()

    return jsonify({"message": "Usuario modificado con éxito"}), 200

@api.route('/usuario', methods=['POST'])
def post_usuario():
    body = request.json
    usuario = Usuario.query.filter_by(name = body['name']).first()
    
    if usuario:
        return jsonify({"msg": "Usuario ya existe"}), 401

    new_usuario = Usuario(
        id=body["id"],
        name=body["name"],
        password = body['password'],
        degree=body["degree"],
        description=body["description"],
        url_img=body["url_img"],
        idu_img=body["idu_img"],
        num_contact=body["num_contact"]
    )
    db.session.add(new_usuario)
    db.session.commit()

    return jsonify({"message": "Usuario creado con éxito"}), 200

@api.route('/usuario/<int:id>', methods=['DELETE'])
def delete_usuario(id):

    usuario = Usuario.query.get(id)

    if not usuario:
        return jsonify({"message": "Usuario no encontrado"}), 404

    db.session.delete(usuario)
    db.session.commit()
    
    return jsonify({"message": "Usuario eliminado con éxito"}), 200



@api.route('/catalogo', methods=['GET'])
def get_catalogo():

    all_catalogo = Catalogo.query.all()
    catalogo_seriallize = [catalogo.serialize() for catalogo in all_catalogo]

    return jsonify(catalogo_seriallize), 200

@api.route('/catalogo', methods=['POST'])
def post_catalogo():

    body = request.json
    new_catalogo = Catalogo(name=body['name'],image=body["image"])
    db.session.add(new_catalogo)
    db.session.commit()

    return jsonify({"message": "Catalogo creado con éxito"}), 200

@api.route('/catalogo/<int:id>', methods=['PUT'])
def put_catalogo(id):
    catalogo = Catalogo.query.get(id)
    body = request.json

    if not catalogo:
        return jsonify({"message": "Catalogo no encontrada"}), 404
    
    if "name" in body:
        catalogo.name = body['name']
    if "image" in body:
        catalogo.image = body['image']
    
    db.session.commit()

    return jsonify({"message": "Catalogo modificado con éxito"}), 200

@api.route('/catalogo/<int:id>', methods=['DELETE'])
def delete_catalogo(id):

    catalogo = Catalogo.query.get(id)

    if not catalogo:
        return jsonify({"message": "Catalogo no encontrado"}), 404

    db.session.delete(catalogo)
    db.session.commit()
    
    return jsonify({"message": "Catalogo eliminado con éxito"}), 200

@api.route('/procedimientos', methods=['GET'])
def get_procedimientos():

    all_procedimientos = Procedimientos.query.all()
    procedimientos_seriallize = [procedimientos.serialize() for procedimientos in all_procedimientos]

    return jsonify(procedimientos_seriallize), 200

@api.route('/procedimientos', methods=['POST'])
def post_procedimientos():

    body = request.json
    new_procedimientos = Procedimientos(name=body['name'],image=body["image"],descripcion=body["descripcion"],articulos=body["articulos"],video=body["video"],)
    db.session.add(new_procedimientos)
    db.session.commit()

    return jsonify({"message": "Procedimiento creado con éxito"}), 200

@api.route('/procedimientos/<int:id>', methods=['PUT'])
def put_procedimientos(id):
    procedimientos = Procedimientos.query.get(id)
    body = request.json

    if not procedimientos:
        return jsonify({"message": "Procedimientos no encontrado"}), 404
    
    if "name" in body:
        procedimientos.name = body['name']
    if "image" in body:
        procedimientos.image = body['image']
    if "descripcion" in body:
        procedimientos.descripcion = body['descripcion']
    if "articulos" in body:
        procedimientos.articulos = body['articulos']
    if "video" in body:
        procedimientos.video = body['video']
    
    db.session.commit()

    return jsonify({"message": "Procedimiento modificado con éxito"}), 200

@api.route('/procedimientos/<int:id>', methods=['DELETE'])
def delete_procedimientos(id):

    procedimientos = procedimientos.query.get(id)

    if not procedimientos:
        return jsonify({"message": "Procedimientos no encontrado"}), 404

    db.session.delete(procedimientos)
    db.session.commit()
    
    return jsonify({"message": "Procedimientos eliminado con éxito"}), 200
