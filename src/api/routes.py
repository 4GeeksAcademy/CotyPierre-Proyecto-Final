"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Catalogo, Procedimientos
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

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
