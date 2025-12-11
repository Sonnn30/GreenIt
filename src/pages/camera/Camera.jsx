import { useRef, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './Camera.css'

function CameraPage() {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const cameraStreamRef = useRef(null); 

    const [hasPhoto, setHasPhoto] = useState(false);
    const navigate = useNavigate();
    
    // Setup camera stream on mount
    useEffect(() => {
        navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
            let video = videoRef.current;
            if (video) {
                video.srcObject = stream;
                video.play();
            }
        })
        .catch((err) => {
            console.error("Error accessing camera:", err);
        });
        
        // Cleanup function: stop the stream when the component unmounts
        return () => {
            const stream = videoRef.current?.srcObject;
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };
    }, []); 

    const takePhoto = () => {
        const width = 400;
        const height = 300;

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width;
        photo.height = height;

        let ctx = photo.getContext("2d");
        ctx.drawImage(video, 0, 0, width, height);

        setHasPhoto(true);
        // Hide the live camera stream wrapper
        if (cameraStreamRef.current) { 
            cameraStreamRef.current.style.display = "none";
        }
    };

    const closePhoto = () => {
        let photo = photoRef.current;
        let ctx = photo.getContext("2d");

        ctx.clearRect(0, 0, photo.width, photo.height);
        setHasPhoto(false);
        // Show the live camera stream wrapper again
        if (cameraStreamRef.current) { 
            cameraStreamRef.current.style.display = "flex";
        }
    };

    const sendPhoto = async () => {
        const photo = photoRef.current;
        const dataUrl = photo.toDataURL("image/png");

        try {
            const response = await fetch("http://localhost:5000/upload", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: dataUrl }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            
            //Navigate to the result page, passing the prediction data in the state
            navigate('/scan-result', { state: { prediction: data.prediction, capturedImage: dataUrl } });

        } catch (error) {
            console.error("Error sending or processing image:", error);
            alert(`Error during scan: ${error.message}`);
        }
    };

    return (
        // Main container uses Flexbox to organize content vertically
        <div className="camera-container">
            {/* The primary element that swaps content (camera vs. result) */}
            <div className="camera-content-area">
                
                {/*Camera Stream (Visible by default) */}
                <div ref={cameraStreamRef} className="camera-stream">
                    <div id="monitor">
                        <div className="screen">
                            <video ref={videoRef} id="cameraFeed" autoPlay playsInline></video>
                            <div className="scan"></div>
                        </div>
                    </div>
                </div>

                {/*Result Section (Visible when hasPhoto is true) */}
                <div className="result">
                    <canvas ref={photoRef}></canvas>
                </div>

            </div>

            {/* Fixed Button Bar at the bottom */}
            <div className="camera-footer">
                {!hasPhoto ? (
                    // Take Photo Button (default state)
                    <button onClick={takePhoto} className="take-photo-button">Scan</button>
                ) : (
                    // Retake/Process Buttons (photo captured state)
                    <div className="result-buttons">
                        <button onClick={closePhoto}>Retake</button>
                        <button onClick={sendPhoto} className="process-button">Process Image →</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CameraPage;