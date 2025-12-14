from flask import Flask, request, jsonify
import os
import numpy as np
import joblib
import json
import cv2
from skimage.feature import graycomatrix, graycoprops, local_binary_pattern, hog
from skimage.color import rgb2hsv
from PIL import Image # For simple image path check and opening

# Feature Extraction Function TODO: Modify this if we change pipeline!!!!!!!!
def extract_traditional_features(image_path):
    img = cv2.imread(image_path)
    if img is None:
        return None

    img_resized = cv2.resize(img, (150, 150))
    hsv = rgb2hsv(img_resized)

    # HSV histograms (normalized)
    h_hist = np.histogram(hsv[:, :, 0], bins=16, range=(0, 1))[0]
    s_hist = np.histogram(hsv[:, :, 1], bins=16, range=(0, 1))[0]
    v_hist = np.histogram(hsv[:, :, 2], bins=16, range=(0, 1))[0]

    h_hist = h_hist.astype(np.float32)
    s_hist = s_hist.astype(np.float32)
    v_hist = v_hist.astype(np.float32)

    h_hist /= np.sum(h_hist)
    s_hist /= np.sum(s_hist)
    v_hist /= np.sum(v_hist)


    color_features = np.concatenate([h_hist, s_hist, v_hist])

    gray_img = cv2.cvtColor(img_resized, cv2.COLOR_BGR2GRAY)

    # GLCM
    bins = np.linspace(0, 256, 9)
    quantized_img = np.digitize(gray_img, bins[:-1]) - 1

    glcm = graycomatrix(
        quantized_img,
        distances=[3, 5],
        angles=[0, np.pi/4, np.pi/2, 3*np.pi/4],
        levels=8,
        symmetric=True,
        normed=True
    )

    texture_features = np.array([
        graycoprops(glcm, 'contrast').mean(),
        graycoprops(glcm, 'energy').mean(),
        graycoprops(glcm, 'homogeneity').mean(),
        graycoprops(glcm, 'correlation').mean()
    ])

    # Edge density
    edges = cv2.Canny(gray_img, 100, 200)
    edge_density = np.sum(edges > 0) / (gray_img.size)
    edge_features = np.array([edge_density])

    # HOG
    hog_features = hog(
        gray_img,
        orientations=8,
        pixels_per_cell=(10, 10),
        cells_per_block=(2, 2),
        block_norm='L2-Hys',
        visualize=False,
        feature_vector=True
    )

    # LBP
    radius = 2
    n_points = 8 * radius
    lbp = local_binary_pattern(gray_img, n_points, radius, method='uniform')
    lbp_hist, _ = np.histogram(
        lbp,
        bins=np.arange(0, n_points + 3),
        range=(0, n_points + 2)
    )
    lbp_hist = lbp_hist.astype(np.float32)
    lbp_hist /= np.sum(lbp_hist)

    feature_vector = np.concatenate([
        color_features,
        texture_features,
        edge_features,
        hog_features,
        lbp_hist
    ])

    return feature_vector.reshape(1, -1)

app = Flask(__name__)

# Load SVM Model and Pre-processors ONCE on startup 
MODEL_DIR = 'model'
try:
    # Load model and pre-processing pipeline components using joblib
    svm_model = joblib.load(os.path.join(MODEL_DIR, 'svm_model.joblib'))
    scaler = joblib.load(os.path.join(MODEL_DIR, 'scaler.joblib'))
    pca_transformer = joblib.load(os.path.join(MODEL_DIR, 'pca_transformer.joblib'))
    
    # Load class labels for human-readable output
    with open(os.path.join(MODEL_DIR, "labels.json"), "r") as f:
        CLASS_LABELS = json.load(f)
        
    print("All models and transformers loaded successfully!")
    print(f"Available classes: {CLASS_LABELS}")

except FileNotFoundError as e:
    print(f"ERROR: Could not load required file: {e}")
    print(f"Please ensure all model and label files are in the '{MODEL_DIR}' directory.")
except Exception as e:
    print(f"An unexpected error occurred during model loading: {e}")


@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    image_path = data.get("image_path")

    if not image_path or not os.path.exists(image_path):
        return jsonify({"error": "Invalid or missing 'image_path'"}), 400
    
    try:
        raw_features = extract_traditional_features(image_path)
        
        if raw_features is None:
            return jsonify({"error": "Failed to read or process image file."}), 500

        #Scale the features using the saved StandardScaler
        scaled_features = scaler.transform(raw_features)

        #Reduce dimensionality using the saved PCA transformer
        final_features = pca_transformer.transform(scaled_features)

        #Predict using the SVM model
        #The result is the class index (e.g., 0, 1, 2, ...)
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
    app.run(host="0.0.0.0", port=8000)
