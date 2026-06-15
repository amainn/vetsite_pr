from datetime import date, time
from db import db

class User(db.Model):
  __tablename__ = 'users'

  id = db.Column(db.String(16), primary_key=True, unique=True)
  username = db.Column(db.String(80), unique=True, nullable=False)
  password = db.Column(db.String(200), nullable=False)

  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "password": self.password,
    }
