# Sign-ify

Sign-ify is an app designed to translate American Sign Language (ASL) directly into multiple languages, bridging the gap between sign language and verbal communication across different languages. We submitted Sign-ify to the Congressional App Challenge and won for our district (AZ-05).

Quick highlights of Sign-ify:
- Powered by a Convolutional Neural Network (CNN)
- Backend Technologies: Flask, TensorFlow, MediaPipe, UNESCO free Translation API
- Frontend Built With: JavaScript, Google Text-to-Speech
- Users can record/upload videos to send to our server, have them processed for the final words, and then translated into both visual and auditory forms of communication
- Recognizes all letters of the alphabet, space, null sign (no sign), and deletion sign
-Most of the limitations we ran into when developing this project had to do with resource limitations when training the model, specifically computing power.
