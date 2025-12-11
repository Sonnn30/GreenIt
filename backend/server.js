// backend/server.js
import express from "express";
import cors from "cors";
import axios from "axios"
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 5000;

//get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// use __dirname so it’s always relative to this file
const uploadDir = path.join(__dirname, "uploads");

// Allow requests from frontend
app.use(cors({
  	origin: "http://localhost:5173" // TODO: change the local host accordingly eg. 5173, 5175, etc
}));

// Parse JSON payloads, limit 10 mb
app.use(bodyParser.json({ limit: "10mb" }));

// Upload route
app.post("/upload", async (req, res) => {
    try {
        const { image } = req.body;
        const base64Data = image.replace(/^data:image\/png;base64,/, "");

        // if we want to store multiple images
        const timestamp = Date.now();
        const filename = `photo_${timestamp}.png`;
        fs.mkdirSync(uploadDir, { recursive: true });
        
        // --- FIX 1: Define filePath correctly ---
        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, base64Data, "base64");

        console.log("Image saved successfully!");
        
        // --- FIX 2: image_path needs to be the defined filePath ---
        const result = await axios.post("http://localhost:8000/predict", {
            image_path: filePath
        });

        // --- FIX 3: Return the base64 image data back to the frontend ---
        res.json({
            message: "Prediction complete",
            prediction: result.data,
            // Include image data so frontend can show the captured image on the result page
            capturedImageBase64: image 
        });

    } catch (error) {
        console.error("Error in /upload route:", error.message);
        const status = error.response ? error.response.status : 500;
        const errorMessage = error.response ? error.response.data.error : "Failed to process image in backend";
        
        res.status(status).json({ error: errorMessage });
    }
});

// Start server
app.listen(PORT, () => {
  	console.log(`Server running on http://localhost:${PORT}`);
});
