from flask import Flask
import os
from db import db
from flask_jwt_extended import JWTManager


def create_app():
  project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

  app = Flask(__name__)

  app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key')
  app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key')
  app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 86400
  app.config['JWT_TOKEN_LOCATION'] = ['headers']
  app.config['JWT_HEADER_NAME'] = 'Authorization'
  app.config['JWT_HEADER_TYPE'] = 'Bearer'

  app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get(
    'DATABASE_URL', 
    'postgresql://postgres:postgres2508@localhost:5432/vetclinic_db'
  )
  app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

  db.init_app(app)
  jwt = JWTManager(app)

  from controllers.auth import auth_bp
  app.register_blueprint(auth_bp)

  with app.app_context():
    db.create_all()

  return app