class Config(object):
    DEBUG = True
    SECRET_KEY = b'_5#y2L"F4Q8z\n\xec]/'
    SESSION_PERMANENT=False
    PERMANENT_SESSION_LIFETIME=3600

    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:postgres2508@localhost:5432/vetclinic_db'      #db для докера
    SQLALCHEMY_TRACK_MODIFICATIONS = False
