from flask import Flask, render_template, session, redirect, request, send_file
from flask_socketio import SocketIO, emit
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
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

app = Flask(__name__)
app.secret_key = os.urandom(32)
socketio = SocketIO(app, cors_allowed_origins='*')

# model = keras.models.load_model("model.keras")
model = keras.models.load_model("ASL.h5")

@app.route("/")
def home():
    return send_file("home.html")

@socketio.on("videoFrame")
def handleVideoFrame(data):
    raw = base64.b64decode(data['encoded'].split(',')[1])
    img = Image.open(io.BytesIO(raw)).convert('L').resize((224, 224))
    img = np.array(img)

    origImg = img.copy()
    
    mp_hands = mp.solutions.hands


    def cropHand(image):
        cropped = image[0:100, 0:100]
        cropped = cropped[:, ::-1]
        # cropped = cv2.imread("S_test.jpg")

        cropped = cv2.resize(cropped, (64,64))
        return cropped

        with mp_hands.Hands(static_image_mode=True, max_num_hands=1, min_detection_confidence=0.001, min_tracking_confidence=0.001) as hands:
            results = hands.process(image)
            h, w, _ = image.shape
            if results.multi_hand_landmarks:
                x_min, y_min = w, h
                x_max, y_max = 0, 0
                for hand_landmarks in results.multi_hand_landmarks:
                    for lm in hand_landmarks.landmark:
                        x, y = int(lm.x * w), int(lm.y * h)
                        x_min, y_min = min(x_min, x), min(y_min, y)
                        x_max, y_max = max(x_max, x), max(y_max, y)
                pad = 20
                x_min, y_min = max(x_min-pad, 0), max(y_min-pad, 0)
                x_max, y_max = min(x_max+pad, w), min(y_max+pad, h)
                cropped = image[y_min:y_max, x_min:x_max]

                print("modded", y_min, y_max, x_min, x_max)
                cropped_resized = cv2.resize(cropped, (224,224))
                return cropped_resized
            else:
                image *= 0 
                # return image
                return cv2.resize(image, (224,224))

    def preprocessWithMediapipe(x):
        img = x.astype(np.uint8)

        if img.ndim == 2:
            img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
        elif img.shape[2] == 1:
            img = cv2.cvtColor(img, cv2.COLOR_GRAY2RGB)
        elif img.shape[2] == 4:
            img = cv2.cvtColor(img, cv2.COLOR_RGBA2RGB)
        # img = img.squeeze(0)
        imgMod = cropHand(img)  # cropHand expects RGB input

        # imgMod = cv2.cvtColor(imgCropped, cv2.COLOR_RGB2GRAY)
        imgMod = (imgMod / 255.0).astype(np.float32)
        # imgMod = np.expand_dims(imgMod, axis=-1).astype(np.float32)
        imgMod = np.expand_dims(imgMod, 0)
        return imgMod



    img = preprocessWithMediapipe(img)
    predictions = model.predict(img, verbose=0)[0]
    # print(predictions)
    # predicted_labels = predictions.argmax(axis=1)
    labels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'del', 'nothing', 'space']

    print([labels[i] for i in predictions.argsort()[-5:][::-1]])
    
    img = img.squeeze(0)
    modifiedImage = Image.fromarray((img*255).astype(np.uint8))
    buffered = io.BytesIO()
    modifiedImage.save(buffered, format="JPEG")
    imgBase64 = base64.b64encode(buffered.getvalue()).decode('utf-8')
    base64String = f"data:image/jpeg;base64,{imgBase64}"

    response = {"frame":base64String, "pred":[labels[i] for i in predictions.argsort()[-5:][::-1]]}
    socketio.emit("modifiedFrame", response)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8000, debug=False, allow_unsafe_werkzeug=True)