from flask import Flask, request, send_from_directory, send_file
from json import dumps
from flask_cors import CORS

cors = CORS()
def create_app():
    app = Flask(__name__)
    cors.init_app(app)

    return app
