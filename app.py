from flask import Flask, render_template, session, redirect, request, send_file
from flask_socketio import SocketIO, emit
import os
import base64
from PIL import Image
import io
import numpy as np

app = Flask(__name__)
app.secret_key = os.urandom(32)
socketio = SocketIO(app, cors_allowed_origins='*')

@app.route("/")
def home():
    return send_file("home.html")

@socketio.on("videoFrame")
def handleVideoFrame(data):
    raw = base64.b64decode(data['encoded'].split(',')[1])
    img = Image.open(io.BytesIO(raw)).convert('L')
    img = np.array(img)
  
    

    modifiedImage = Image.fromarray(img)
    buffered = io.BytesIO()
    modifiedImage.save(buffered, format="JPEG")
    imgBase64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
    base64String = f"data:image/jpeg;base64,{imgBase64}"

    response = {"frame":base64String}
    socketio.emit("modifiedFrame", response)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8000, debug=False, allow_unsafe_werkzeug=True)