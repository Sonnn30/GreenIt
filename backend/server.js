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

// Allow requests from your frontend
app.use(cors({
  	origin: "http://localhost:5174" // TODO: change the local host accordingly eg. 5173, 5175, etc
}));

// Parse JSON payloads, limit 10 mb
app.use(bodyParser.json({ limit: "10mb" }));

// Upload route
app.post("/upload", async (req, res) => {
    try {
        const { image } = req.body;

        // remove the "data:image/png;base64," prefix
        const base64Data = image.replace(/^data:image\/png;base64,/, "");

        // save the image to disk

		// if we only want to store one image
        // fs.writeFileSync("captured_image.png", base64Data, "base64");

		// if we want to store multiple images
		const timestamp = Date.now(); // get current time in ms
		const filename = `photo_${timestamp}.png`;
		fs.mkdirSync(uploadDir, { recursive: true });
		fs.writeFileSync(path.join(uploadDir, filename), base64Data, "base64");

        console.log("Image saved successfully!");
        const result = await axios.post("http://localhost:8000/predict", {
            image_path: filePath
        });

        res.json({
            message: "Prediction complete",
            result: result.data
        });

    } catch (error) {
		console.error("Error saving image:", error);
		res.status(500).json({ error: "Failed to save image" });
    }
});

// Start server
app.listen(PORT, () => {
  	console.log(`Server running on http://localhost:${PORT}`);
});
