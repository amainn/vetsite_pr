from flask import Blueprint

from flask import request
from flask import session
from flask import jsonify

from db import db
from models import User
import uuid

from flask_jwt_extended import create_access_token

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route('/api/auth/login', methods=['POST'])
def login_u():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.password == password: 
        auth_token = create_access_token(identity=str(user.id))
        
        return jsonify({'token': auth_token}), 200
    
    return jsonify({'message': 'Неверный логин или пароль!'}), 401


@auth_bp.route('/api/auth/register',  methods=['POST'])
def register_u(): 
    data_db = User.query.all()
    users = [user.to_dict() for user in data_db]

    data_inp = request.get_json()
    u_username = data_inp.get('username').strip()
    u_password = data_inp.get('password').strip()

    for u in users:
        if u['username'] == u_username:
            return jsonify({'message': 'Этот пользователь уже существует!'}), 409

    u_id = str((uuid.uuid4()))[:10]
    session['u_id'] = u_id

    new_user = User(
        id = u_id,
        username = u_username,
        password = u_password
    )

    db.session.add(new_user)
    db.session.commit()

    auth_token = create_access_token(identity=u_id)

    return jsonify({'token': auth_token}), 201


@auth_bp.route('/api/auth/check_token', methods=['POST'])
def check_token():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'error': 'No token'}), 401
    
    from flask_jwt_extended import decode_token
    try:
        if token.startswith('Bearer '):
            token = token.split(' ')[1]
        
        decoded = decode_token(token)
        user_id = decoded.get('sub')
        
        return jsonify({'user_id': user_id}), 200
    except:
        return jsonify({'error': 'Invalid token'}), 401