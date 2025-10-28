import cv2
import numpy as np
import keras
import mediapipe as mp
import tensorflow as tf
from collections import Counter


model = keras.models.load_model("ASL_detector_CNN.h5")
mp_hands = mp.solutions.hands


def preprocessFrame(image):
    image = image[:, ::-1, :]
    mp_hands = mp.solutions.hands

    with mp_hands.Hands(static_image_mode=True, max_num_hands=1,
                        min_detection_confidence=0.001,
                        min_tracking_confidence=0.5) as hands:
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
            pad = 56 # 160
            x_min, y_min = max(x_min - pad, 0), max(y_min - pad, 0)
            x_max, y_max = min(x_max + pad, w), min(y_max + pad, h)
            cropped = image[y_min:y_max, x_min:x_max]
        else:
            # # no hand found, return black image
            # cropped = np.zeros((64, 64, 3), dtype=np.uint8)
            cropped = image[:64, :64]

        cropped_resized = cv2.resize(cropped, (64, 64))
        # cropped_resized = cv2.resize(image, (64, 64))

        image_batch = np.expand_dims(cropped_resized, axis=0).astype(np.float32)

        return image_batch



def processVideo(videoPath):
    # videoPath = "videoPlayback.mp4"
    # videoPath = "hello.mov"
    cap = cv2.VideoCapture(videoPath)
    # cap = cv2.VideoCapture(0)
    if not cap.isOpened():
        print("Error: could not open video file.")
        return

    labels = [
        'A','B','C','D','E','F','G','H','I','J','K','L','M','N',
        'O','P','Q','R','S','T','U','V','W','X','Y','Z','del','nothing','space'
    ]

    finalMessage = []
    letterStream = []
    # for i in range(600):
    #     cap.read()
    msg = []
    frameId = 0
    while True:
        # if frameId >= 1900:
        #     break
        ret, frame = cap.read() # gives BGR
        frameId += 1
        # skip some frames between
        # for i in range(10):
        #     cap.read()
        #     frameId+=1
        #     if not ret:
        #         print("End of video or read error.")
        #         break
        
        if not ret:
            print("End of video or read error.")
            break
        frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) # now its in RGB

        # preprocess and predict
        frame = preprocessFrame(frame)
        print(frame.shape)
        predictions = model.predict(frame, verbose=0)
        predLabel = labels[np.argmax(predictions[0])]
        msg.append(predLabel)
        print(predLabel, tf.argmax(predictions, axis=1).numpy())

        if len(letterStream) < 6:
            letterStream.append(predLabel)
        else:
            for i in range(len(letterStream)-1):
                letterStream = letterStream[i+1]
            letterStream[-1] = predLabel
        
        if len(letterStream) == 6:
            c = Counter(letterStream)
            mostFrequent = list(c.keys())[list(c.values()).index(max(c.values()))]

            finalMessage.append(mostFrequent)
            letterStream.clear()

        # show cropped + resized image (the model input)
        displayFrame = cv2.resize((frame.squeeze(0)).astype(np.uint8), (500, 500))

        # cv2.putText(displayFrame, f"Prediction: {[labels[i] for i in predictions[0].argsort()[-5:][::-1]]}", (5, 20),
                    # cv2.FONT_HERSHEY_SIMPLEX, 0.8, (255,0,0), 2)

        # cv2.imshow("Cropped Hand", cv2.cvtColor(displayFrame, cv2.COLOR_RGB2BGR))

        # quit early with 'q'
        # if cv2.waitKey(25) & 0xFF == ord('q'):
        #     break

    cap.release()
    # cv2.destroyAllWindows()
    print(msg)
    print("\n\n\n")
    print(finalMessage) 
    return ''.join(finalMessage)

if __name__ == "__main__":
    processVideo("hello.mov")
