from flask import session
from flask import url_for
from flask import render_template
from controllers.__init__ import create_app


app = create_app()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)