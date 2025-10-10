from flask import Flask, render_template, session, redirect, request, send_file, send_from_directory, jsonify
import os
import base64
from PIL import Image
import io
import numpy as np
import keras
import mediapipe as mp
import cv2
import tensorflow as tf
import os
import tempfile
from processVideos import processVideo
from collections import Counter
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

app = Flask(__name__, static_folder="dist", template_folder="dist")
app.secret_key = os.urandom(32)

# model = keras.models.load_model("model.keras")
model = keras.models.load_model("ASL.h5")

@app.route("/")
def home():
    session['stream'] = []
    session['text'] = []
    return send_from_directory("dist", "index.html")

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    # Serve static files if they exist
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    # Otherwise, serve index.html for React Router
    return send_from_directory(app.static_folder, "index.html")

@app.route("/videoTranslate", methods=["POST"])
def videoTranslate():
    if "video" not in request.files:
        return jsonify({"error": "No video uploaded"}), 400

    videoFile = request.files["video"]
    language = request.form.get("language", "en")

    tempDir = tempfile.gettempdir()
    tempPath = os.path.join(tempDir, videoFile.filename)
    videoFile.save(tempPath)
    
    processedVideoText = processVideo(videoPath=tempPath)
    return {"text":processedVideoText}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=False)