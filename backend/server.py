from flask import Flask, request, send_from_directory, send_file
from json import dumps
from flask_cors import CORS
import config
import signal

def quit_gracefully(*args):
    '''For coverage'''
    exit(0)

def defaultHandler(err):
    response = err.get_response()
    print('response', err, err.get_response())
    response.data = dumps({
        "code": err.code,
        "name": "System Error",
        "message": err.get_description(),
    })
    response.content_type = 'application/json'
    return response

APP = Flask(__name__)
CORS(APP)
APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, defaultHandler)

# Routes
# Example
@APP.route("/echo", methods=['GET'])
def echo():
    data = request.args.get('data')
    return dumps({
        'data': data
    })

if __name__ == "__main__":
    APP.debug = True
    signal.signal(signal.SIGINT, quit_gracefully) # For coverage
    APP.run(port=config.port) # Do not edit this port
