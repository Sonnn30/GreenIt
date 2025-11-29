from flask import Flask, request, jsonify
import tensorflow as tf
import os
import numpy as np
from PIL import Image

app = Flask(__name__)

#TODO: Fix load model, currently cant access the model, either the directory or model's format problem

# Load model ONCE on startup (fast inference)
# script_dir = os.path.dirname(os.path.abspath(__file__)) # ger current directory
# model_path = os.path.join(script_dir, "model_terbaik_balanced.keras")
# model = tf.keras.models.load_model(model_path)  # .h5 / .keras
model = tf.keras.models.load_model("C:\\Users\\justi\\Desktop\\comvis\\GreenIt\\backend\\model.keras")
print(os.listdir())

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    image_path = data["image_path"]

    # Load and preprocess image
    img = Image.open(image_path).resize((224, 224))  # adjust to model input
    img = np.array(img) / 255.0
    img = np.expand_dims(img, axis=0)

    prediction = model.predict(img)
    predicted_class = int(np.argmax(prediction))

    return jsonify({ "class": predicted_class })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000)
