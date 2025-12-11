import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function ScanResultPage() {
    // Hook to get the data passed during navigation
    const location = useLocation();
    const { prediction, capturedImage } = location.state || {}; // Get state data

    // Handle case where user navigates directly without prediction data
    if (!prediction) {
        return (
            <div className="result-container">
                <h1>Error: No Scan Data Found</h1>
                <p>Please go back to the camera page to initiate a scan.</p>
                <Link to="/camera">Go to Camera</Link>
            </div>
        );
    }

    return (
        <div className="result-container">
            <h1>Scan Result:</h1>
            
            {/* Display the Captured Image */}
            <div className="captured-image">
                <img 
                    src={capturedImage} 
                    alt="Captured Scan Item" 
                    style={{ maxWidth: '100%', border: '2px solid #333' }}
                />
            </div>
            
            {/* Simple Result Placeholder */}
            <div className="result-details">
                <h2>Predicted Class: {prediction.class_name}</h2>
                <p>Index: {prediction.class_index}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Natus dolore dolor nesciunt ullam iusto quidem magnam reprehenderit fuga nihil soluta illum est tempora, cumque, enim totam ratione modi, voluptate obcaecati.</p>
            </div>

            <Link to="/camera" className="scan-again-link">
                <button>Scan Another Item</button>
            </Link>
        </div>
    );
}

export default ScanResultPage;