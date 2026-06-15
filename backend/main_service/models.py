from db import db

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.String(16), primary_key=True, unique=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

    appointments = db.relationship('Appointment', backref='user', lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "password": self.password,
            "appointments": self.appointments,
        }


class Appointment(db.Model):
    __tablename__ = 'appointments'

    id = db.Column(db.String(16), primary_key=True)
    procedure = db.Column(db.String(80), nullable=False)
    user_id = db.Column(db.String(16), db.ForeignKey('users.id'))
    appointment_date = db.Column(db.Date)
    appointment_time = db.Column(db.Time)

    def to_dict(self):
        return {
            "id": self.id,
            "procedure": self.procedure,
            "user_id": self.user_id,
            "appointment_date": self.appointment_date,
            "appointment_time": self.appointment_time
        }
