# Waste Classification Web App

A web-based waste classification application built with **React + Vite** on the frontend and a **Flask + SVM with traditional feature extraction** model on the backend.

The app allows users to scan images and receive waste category predictions.


# How to use
Download the trained model here :
-------------------------------------
https://drive.google.com/drive/folders/1_nEomzP1LT0Sz8gOyqymog9PUSeikJ7h?usp=sharing


after that, copy the model into backend/model/ folder along with the labels.json file


### Run the server
```
cd backend
node server.js
```

### Run model's server
```
cd backend
python model_server.py
```

### Run the app
```
npm run dev
```


## Tech Stack we use on this project

### Frontend
- React
- Vite
- JavaScript

### Backend
- Node.js (API / server)
- Python (Flask)
- OpenCV, scikit-image, scikit-learn
- SVM with traditional features (HSV, GLCM, HOG, LBP)

---

