"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, send_file, make_response, Blueprint
from sqlalchemy.exc import IntegrityError
from api.models import db, User, Catalogo, Procedimientos, Usuario
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import io
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

    new_user = User(
        email=body['email'],
        password=body["password"],
        name=body.get('name'),
        phone=body.get('phone'),
        adress=body.get('address'),
        country=body.get('country'),
        department=body.get('department'),
        photo=body['photo'],
        rol=body.get('rol'),
        professional_grade=body.get('professionalGrade'),
        workplace=body.get('workplace'),
        is_active=True
    )

    try: 
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"msg": "Usuario creado"}), 200  
    except IntegrityError as e:
        db.session.rollback() 
        return jsonify({"msg": "Error: Violación de unicidad en la base de datos"}), 500

 
    return jsonify({"msg": "Usuario creado"}), 200


@api.route("/login", methods=["POST"])
def post_login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email, password=password).first()

    if user is None:
        return jsonify({"msg": "Usuario o contraseña incorrecta"}), 404
    
    if user.rol != "Administrador" and user.is_active == False:
        return jsonify({"msg": "Usuario inactivado por Administrador"}), 401

    access_token = create_access_token(identity=user.id, additional_claims={"rol": user.rol})
    return jsonify({ "token": access_token, "user_id": user.id })


@api.route('/usuario', methods=['GET'])
def get_usuario():
    all_usuario = User.query.all()
    Usuario_seriallize = list (map(lambda user: user.serialize(),all_usuario))

    return jsonify(Usuario_seriallize), 200

@api.route('/usuario/<int:id>', methods=['PUT'])
def put_usuario(id):
    usuario = User.query.get(id)
    body = request.json

    if not usuario:
        return jsonify({"message": "Usuario no encontrado"}), 404
    
    usuario.name = body.get('name')
    usuario.phone = body.get('phone')
    usuario.adress = body.get('adress')
    usuario.country = body.get('country')
    usuario.department = body.get('department')
    usuario.photo = body['photo']
    usuario.professional_grade = body.get('professional_grade')
    usuario.workplace = body.get('workplace')
    usuario.is_active = body.get('is_active')
    
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

    usuario = User.query.get(id)

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
@jwt_required()
def post_procedimientos():
    body = request.form
    print(body)

    new_procedimientos = Procedimientos(
        name=body['name'],
        photo=body["photo"],
        descripcion=body["descripcion"],
        video=body["video"],
        link=body["enlace"],
        is_active=True,
        category=body["category"],
        subCategory=body["subCategory"],
        idUser=body["idUser"]
    )

    if 'archivo' in request.files:
        archivo = request.files['archivo']
        
        if archivo:
            new_procedimientos.archive = archivo.read()

    db.session.add(new_procedimientos)
    db.session.commit()

    return jsonify({"message": "Procedimiento creado con éxito"}), 200

@api.route('/procedimientos/<int:procedimiento_id>/descargar', methods=['GET'])
def descargar_archivo(procedimiento_id):
    procedimiento = Procedimientos.query.get(procedimiento_id)
    if procedimiento and procedimiento.archive:
        archivo = io.BytesIO(procedimiento.archive)
        response = make_response(archivo.getvalue())
        response.headers['Content-Type'] = 'application/octet-stream'
        response.headers['Content-Disposition'] = f'attachment; filename={procedimiento.name}.pdf'
        return response
    return jsonify({"message": "Procedimiento o archivo no encontrado"}), 404


@api.route('/procedimientos/<int:id>', methods=['PUT'])
@jwt_required()
def put_procedimientos(id):
    procedimientos = Procedimientos.query.get(id)
    body = request.json

    if not procedimientos:
        return jsonify({"message": "Procedimientos no encontrado"}), 404
    
    if "name" in body:
        procedimientos.name = body['name']
    if "photo" in body:
        procedimientos.photo = body['photo']
    if "descripcion" in body:
        procedimientos.descripcion = body['descripcion']
    if "enlace" in body:
        procedimientos.link = body['enlace']
    if "video" in body:
        procedimientos.video = body['video']
    if "category" in body:
        procedimientos.category = body['category']
    if "subCategory" in body:
        procedimientos.subCategory = body['subCategory']
    
    db.session.commit()

    return jsonify({"message": "Procedimiento modificado con éxito"}), 200

@api.route('/procedimientos/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_procedimientos(id):

    procedimientos = Procedimientos.query.get(id)

    if not procedimientos:
        return jsonify({"message": "Procedimientos no encontrado"}), 404

    db.session.delete(procedimientos)
    db.session.commit()
    
    return jsonify({"message": "Procedimientos eliminado con éxito"}), 200
