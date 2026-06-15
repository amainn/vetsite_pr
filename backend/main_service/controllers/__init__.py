from flask import Flask, request, jsonify
import os
from db import db
from flask_jwt_extended import JWTManager


def create_app():
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    app = Flask(__name__)


    app.config['SECRET_KEY'] = b'_5#y2L"F4Q8z\n\xec]/'
    app.config['DEBUG'] = True
    app.config['SESSION_PERMANENT'] = False
    app.config['PERMANENT_SESSION_LIFETIME'] = 3600
    
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 86400
    app.config['JWT_TOKEN_LOCATION'] = ['headers'] 
    app.config['JWT_HEADER_NAME'] = 'Authorization'
    app.config['JWT_HEADER_TYPE'] = 'Bearer'

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres2508@db:5432/vetclinic_db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    jwt = JWTManager(app)

    from controllers.appoint import appoint_bp
    app.register_blueprint(appoint_bp)

    with app.app_context():
        db.create_all()

    return app
