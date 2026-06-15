from flask import Blueprint
from datetime import datetime
from flask import request
from flask import jsonify
import requests
from db import db
from models import Appointment, User
import uuid

appoint_bp = Blueprint('appoint_bp', __name__)


def check_token():
    auth_header = request.headers.get('Authorization')
    
    if not auth_header:
        return None, 'Token missing'
    
    if auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
    else:
        token = auth_header
    
    try:
        resp = requests.post(
            'http://auth1:5001/api/auth/check_token',
            headers={'Authorization': f'Bearer {token}'},
            timeout=3
        )
        
        if resp.status_code == 200:
            return resp.json(), None
        else:
            return None, 'Invalid token'
    except Exception as e:
        print(f"Auth service error: {e}")
        return None, 'Auth service unavailable'


@appoint_bp.route("/api/appointments", methods=['GET'])
def getApp():
    user_data, error = check_token()
    if error:
        return jsonify({'error': error}), 401

    serv_id = user_data.get('user_id')       
    if not serv_id:
        return jsonify({'error': 'unauthorized'}), 401

    user = User.query.filter_by(id=serv_id).first()
    if not user:
        user = User(
            id=serv_id,
            username=user_data.get('username', 'unknown'),
            password=''
        )
        db.session.add(user)
        db.session.commit()
        return jsonify([]) 

    today_date = datetime.now().date()
    filtered = []

    for ticket in user.appointments:
        t_date = ticket.appointment_date
        ticket_date_str = t_date.strftime('%Y-%m-%d') if hasattr(t_date, 'strftime') else str(t_date)
        
        t_time = ticket.appointment_time
        ticket_time_str = t_time.strftime('%H:%M') if hasattr(t_time, 'strftime') else str(t_time)[:5]

        temp_ticket = {
            "id": ticket.id,
            "procedure": ticket.procedure,
            "user_id": ticket.user_id,
            "appointment_date": ticket_date_str,
            "appointment_time": ticket_time_str
        }

        current_ticket_date = datetime.strptime(ticket_date_str, '%Y-%m-%d').date()
        
        if current_ticket_date >= today_date:
            filtered.append(temp_ticket) 
    
    filtered.sort(key=lambda x: datetime.strptime(
        f"{x['appointment_date']} {x['appointment_time']}", 
        '%Y-%m-%d %H:%M'
    ))

    return jsonify(filtered)


@appoint_bp.route("/api/appointments", methods=['POST'])
def addApp():
    user_data, error = check_token()
    if error:
        return jsonify({'error': error}), 401

    serv_id = user_data.get('user_id')         
    if not serv_id:
        return jsonify({'error': 'unauthorized'}), 401

    # Получаем или создаем пользователя
    user = User.query.filter_by(id=serv_id).first()
    if not user:
        user = User(
            id=serv_id,
            username=user_data.get('username', 'unknown'),
            password=''
        )
        db.session.add(user)
        db.session.commit()

    if request.is_json:
        data = request.get_json()
    else:
        data = {
            'procedure': request.form.get('procedure'),
            'appointment_date': request.form.get('appointment_date'),
            'appointment_time': request.form.get('appointment_time')
        }

    if not all([data.get('procedure'), data.get('appointment_date'), data.get('appointment_time')]):
        return jsonify({'success': False, 'error': 'Missing required fields'}), 400
    
    new_ticket = Appointment(
        id=str(uuid.uuid4())[:10],
        procedure=data['procedure'],
        user_id=str(serv_id),
        appointment_date=data['appointment_date'],
        appointment_time=data['appointment_time']
    ) 

    db.session.add(new_ticket)
    db.session.commit()

    return jsonify({'success': True, 'message': 'Запись добавлена'})