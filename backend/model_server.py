from flask import Flask, request, jsonify
import os
import numpy as np
import joblib # Library for loading Scikit-learn models/objects
import json
import cv2 # Computer Vision Library
from skimage.feature import graycomatrix, graycoprops, local_binary_pattern, hog
from skimage.color import rgb2hsv
from PIL import Image # For simple image path check and opening

# Feature Extraction Function TODO: Modify this if we change feature extraction model !!!!!!!!
def extract_traditional_features(image_path):
    img = cv2.imread(image_path)
    if img is None:
        return None

    img_resized = cv2.resize(img, (64, 64)) 
    hsv = rgb2hsv(img_resized)
    
    # 1. Color Features (HSV)
    h_hist = np.histogram(hsv[:, :, 0], bins=16, range=(0, 1))[0]
    s_hist = np.histogram(hsv[:, :, 1], bins=16, range=(0, 1))[0]
    v_hist = np.histogram(hsv[:, :, 2], bins=16, range=(0, 1))[0]
    color_features = np.concatenate([h_hist, s_hist, v_hist])

    # 2. Texture Features (GLCM)
    gray_img = cv2.cvtColor(img_resized, cv2.COLOR_BGR2GRAY)
    bins = np.linspace(0, 256, 9)
    quantized_img = np.digitize(gray_img, bins[:-1]) - 1

    glcm = graycomatrix(quantized_img, distances=[5], angles=[0], levels=8, symmetric=True, normed=True)
    contrast = graycoprops(glcm, 'contrast')[0, 0]
    energy = graycoprops(glcm, 'energy')[0, 0]
    homogeneity = graycoprops(glcm, 'homogeneity')[0, 0]
    correlation = graycoprops(glcm, 'correlation')[0, 0]
    texture_features = np.array([contrast, energy, homogeneity, correlation])

    # 3. Edge Features (Canny)
    edges = cv2.Canny(gray_img, 100, 200)
    edge_count = np.sum(edges > 0)
    edge_features = np.array([edge_count])

    # 4. HOG Feature
    hog_features = hog(gray_img,
                     orientations=8,
                     pixels_per_cell=(16, 16),
                     cells_per_block=(1, 1),
                     block_norm='L2-Hys',
                     visualize=False,
                     feature_vector=True)

    # 5. LBP Feature
    radius = 2
    n_points = 8 * radius
    lbp = local_binary_pattern(gray_img, n_points, radius, method='uniform')
    lbp_hist, _ = np.histogram(lbp, bins=np.arange(0, n_points + 3), range=(0, n_points + 2))
    lbp_hist = lbp_hist / np.sum(lbp_hist)

    # Concatenate all features
    feature_vector = np.concatenate([
        color_features,
        texture_features,
        edge_features,
        hog_features,
        lbp_hist
    ])
    
    return feature_vector.reshape(1, -1) # Return as (1, n_features) for pipeline

app = Flask(__name__)

# --- Load SVM Model and Pre-processors ONCE on startup ---
try:
    # Load model and pre-processing pipeline components using joblib
    svm_model = joblib.load('svm_model.joblib')
    scaler = joblib.load('scaler.joblib')
    pca_transformer = joblib.load('pca_transformer.joblib')
    
    # Load class labels for human-readable output
    with open("labels.json", "r") as f:
        CLASS_LABELS = json.load(f)
        
    print("All models and transformers loaded successfully!")
    print(f"Available classes: {CLASS_LABELS}")

except FileNotFoundError as e:
    print(f"ERROR: Could not load required file: {e}")
    print("Please ensure 'svm_model.joblib', 'scaler.joblib', 'pca_transformer.joblib', and 'labels.json' are in the same directory.")
    # Consider exiting or raising error here if models are essential
except Exception as e:
    print(f"An unexpected error occurred during model loading: {e}")


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    image_path = data.get("image_path") # Use .get() for safety

    if not image_path or not os.path.exists(image_path):
        return jsonify({"error": "Invalid or missing 'image_path'"}), 400
    
    try:
        # 1. Extract the raw feature vector (the 53-element vector)
        raw_features = extract_traditional_features(image_path)
        
        if raw_features is None:
            return jsonify({"error": "Failed to read or process image file."}), 500

        # 2. Scale the features using the saved StandardScaler
        scaled_features = scaler.transform(raw_features)

        # 3. Reduce dimensionality using the saved PCA transformer
        final_features = pca_transformer.transform(scaled_features)

        # 4. Predict using the SVM model
        # The result is the class index (e.g., 0, 1, 2, ...)
        predicted_index = svm_model.predict(final_features)[0]

        # Convert the index to the class name using the loaded labels
        predicted_class_name = CLASS_LABELS[int(predicted_index)]
        
        return jsonify({ 
            "class_index": int(predicted_index), 
            "class_name": predicted_class_name 
        })

    except Exception as e:
        return jsonify({"error": f"Prediction failed due to internal error: {e}"}), 500

if __name__ == "__main__":
    # Remove tf.keras.models.load_model and print(os.listdir())
    app.run(host="0.0.0.0", port=8000)



# from flask import Flask, request, jsonify
# import tensorflow as tf
# import os
# import numpy as np
# from PIL import Image

# app = Flask(__name__)

# #TODO: Fix load model, currently cant access the model, either the directory or model's format problem

# # Load model ONCE on startup (fast inference)
# # script_dir = os.path.dirname(os.path.abspath(__file__)) # ger current directory
# # model_path = os.path.join(script_dir, "model_terbaik_balanced.keras")
# # model = tf.keras.models.load_model(model_path)  # .h5 / .keras
# model = tf.keras.models.load_model("C:\\Users\\justi\\Desktop\\comvis\\GreenIt\\backend\\model.keras")
# print(os.listdir())

# @app.route("/predict", methods=["POST"])
# def predict():
#     data = request.get_json()
#     image_path = data["image_path"]

#     # Load and preprocess image
#     img = Image.open(image_path).resize((224, 224))  # adjust to model input
#     img = np.array(img) / 255.0
#     img = np.expand_dims(img, axis=0)

#     prediction = model.predict(img)
#     predicted_class = int(np.argmax(prediction))

#     return jsonify({ "class": predicted_class })

# if __name__ == "__main__":
#     app.run(host="0.0.0.0", port=8000)
